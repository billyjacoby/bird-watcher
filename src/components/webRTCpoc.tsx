import React from 'react';

import {MediaStream, RTCPeerConnection, RTCView} from 'react-native-webrtc';

import {API_BASE} from '@env';

const webRTCconfig = {
  iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
};

interface WebRTCPocProps {
  cameraName: string;
}

export const WebRTCPOC = ({cameraName}: WebRTCPocProps) => {
  const url =
    API_BASE.replace('http', 'ws') + '/live/webrtc/api/ws?src=' + cameraName;

  const [remoteStream, setRemoteStream] = React.useState<MediaStream | null>(
    null,
  );

  const pcRef = React.useRef(new RTCPeerConnection(webRTCconfig));
  const wsRef = React.useRef(new WebSocket(url));

  pcRef.current.addTransceiver('video', {
    direction: 'recvonly',
    // codecs: ['H264'],
  }).receiver.track;
  pcRef.current.addTransceiver('audio', {
    direction: 'recvonly',
  }).receiver.track;

  React.useEffect(() => {
    const connect = async () => {
      const pc = pcRef.current;
      const ws = wsRef.current;

      pc.addEventListener('track', (event: any) => {
        // Grab the remote track from the connected participant.
        const track = event?.track;
        if (track) {
          const remoteMediaStream = new MediaStream(undefined);
          console.log(
            '🪵 | file: webRTCpoc.tsx:58 | ws.addEventListener | track:',
            track,
          );
          remoteMediaStream.addTrack(event.track);
          setRemoteStream(remoteMediaStream);
        }
      });

      ws.addEventListener('open', async () => {
        pc.addEventListener('icecandidate', (ev: any) => {
          //? This is where we send the new icecandidate info to the server
          if (!ev.candidate) {
            return;
          }
          const msg = {
            type: 'webrtc/candidate',
            value: ev.candidate.candidate,
          };

          ws.send(JSON.stringify(msg));
        });

        const offer = await pc.createOffer({});
        await pc.setLocalDescription(offer);

        if (pc.localDescription) {
          //? Sending our offer to the server
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
    };
    connect();
  }, []);

  if (remoteStream) {
    return (
      <RTCView
        style={{position: 'absolute', width: '100%', height: '100%'}}
        objectFit={'contain'}
        streamURL={remoteStream.toURL()}
      />
    );
  }
  return null;
};
