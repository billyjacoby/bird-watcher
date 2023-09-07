import React from 'react';

import {MediaStream, RTCPeerConnection, RTCView} from 'react-native-webrtc';

import {API_BASE} from '@env';

export const WebRTCPOC = () => {
  const url =
    API_BASE.replace('http', 'ws') + '/live/webrtc/api/ws?src=frigate_garage';
  const config = {
    iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
  };

  const [localTracks, setLocalTracks] = React.useState<MediaStream | null>(
    null,
  );

  const pcRef = React.useRef(new RTCPeerConnection(config));
  const wsRef = React.useRef(new WebSocket(url));

  const PeerConnection = React.useCallback(async (media: string) => {
    //? This is how peerConnections are being handled in the Frigate Web UI, not totally
    //? sure if we need to implement the same way here, but this was the only way to get
    //? any track data.
    const pc = pcRef.current;
    const newLocalTracks = [];

    if (/video|audio/.test(media)) {
      const tracks = ['video', 'audio']
        .filter(kind => media.indexOf(kind) >= 0)
        .map(
          kind =>
            pc.addTransceiver(kind as 'video' | 'audio', {
              direction: 'recvonly',
            }).receiver.track,
        );
      newLocalTracks.push(...tracks);
    }
    setLocalTracks(new MediaStream(newLocalTracks));
  }, []);

  const connect = React.useCallback(async () => {
    await PeerConnection('video+audio');
    const pc = pcRef.current;
    const ws = wsRef.current;

    ws.addEventListener('open', async () => {
      pc.addEventListener('icecandidate', ev => {
        if (!ev.candidate) {
          return;
        }
        const msg = {type: 'webrtc/candidate', value: ev.candidate.candidate};

        ws.send(JSON.stringify(msg));
      });

      const offer = await pc.createOffer({});
      await pc.setLocalDescription(offer);

      if (pc.localDescription) {
        // console.log('SENDING OFFER: ', pc.localDescription.sdp);
        const msg = {type: 'webrtc/offer', value: pc.localDescription.sdp};
        ws.send(JSON.stringify(msg));
      }
    });

    ws.addEventListener('message', async ev => {
      const msg = JSON.parse(ev.data);
      if (msg.type === 'webrtc/candidate') {
        pc.addIceCandidate(msg.value);
      } else if (msg.type === 'webrtc/answer') {
        pc.setRemoteDescription({type: 'answer', sdp: msg.value});
      }
    });
  }, [url]);

  React.useEffect(() => {
    (async () => {
      connect();
    })();
  }, [connect]);

  if (localTracks) {
    return (
      <RTCView objectFit={'cover'} zOrder={0} streamURL={localTracks.toURL()} />
    );
  }

  return null;
};
