import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import {MediaStream, RTCPeerConnection, RTCView} from 'react-native-webrtc';

import {BaseText, BaseView} from '@components';
import {API_BASE} from '@env';

const webRTCconfig = {
  iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
};

interface WebRTCPocProps {
  cameraName?: string;
}

const MAX_RETRIES = 10;

export const WebRTCView = ({cameraName}: WebRTCPocProps) => {
  const cameraURL =
    API_BASE.replace('http', 'ws') + '/live/webrtc/api/ws?src=' + cameraName;

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [retryAttempts, setRetryAttempts] = React.useState(0);
  const [shouldRetry, setShouldRetry] = React.useState(false);
  const [remoteStream, setRemoteStream] = React.useState<MediaStream | null>(
    null,
  );
  const [localStream, setLocalStream] = React.useState<MediaStream | null>(
    null,
  );

  const isError = retryAttempts > MAX_RETRIES;

  const pcRef = React.useRef<RTCPeerConnection>(
    new RTCPeerConnection(webRTCconfig),
  );
  const wsRef = React.useRef<WebSocket>(new WebSocket(cameraURL));

  const onIceConnect = () => {
    if (pcRef?.current?.iceConnectionState === 'connected') {
      setIsLoading(false);
    }
  };

  const onTrack = async (event: any, mediaStream: MediaStream) => {
    // Grab the remote track from the connected participant.
    const track = event?.track;
    if (track) {
      mediaStream.addTrack(track);
      setRemoteStream(mediaStream);
    }
  };

  const setLocalAvailability = (peerConnection: RTCPeerConnection) => {
    //? This sets the tracks on the local device, should before anything else i think
    const tracks = [
      peerConnection.addTransceiver('video', {
        direction: 'recvonly',
        // codecs: ['H264'],
      }).receiver.track,
      peerConnection.addTransceiver('audio', {
        direction: 'recvonly',
      }).receiver.track,
    ];

    setLocalStream(new MediaStream(tracks));
  };

  const onIceCandidate = (ev: any) => {
    if (ev.candidate === null) {
      // Gathering is complete?
    }
    //? This is where we send the new icecandidate info to the server
    if (!ev.candidate) {
      return;
    }

    const msg = {
      type: 'webrtc/candidate',
      value: ev.candidate.candidate,
    };

    wsRef.current.send(JSON.stringify(msg));
  };

  //? WS Handlers
  const onWsOpen = async (pc: RTCPeerConnection, ws: WebSocket) => {
    //? Websocket is how we're handling sdp negotiation with the frigate server
    //? Creating the offer is what triggers the gathering of icecandidates
    const offer = await pc.createOffer({});
    await pc.setLocalDescription(offer);

    if (pc.localDescription) {
      const msg = {type: 'webrtc/offer', value: pc.localDescription.sdp};
      ws.send(JSON.stringify(msg));
    }
  };

  const onWsMessage = async (ev: any, pc: RTCPeerConnection) => {
    const msg = JSON.parse(ev.data);
    if (msg.type === 'webrtc/candidate') {
      pc.addIceCandidate(msg.value);
    } else if (msg.type === 'webrtc/answer') {
      pc.setRemoteDescription({type: 'answer', sdp: msg.value});
    }
  };

  const connect = React.useCallback(async (url: string) => {
    setIsLoading(true);
    pcRef.current = new RTCPeerConnection(webRTCconfig);
    const pc = pcRef.current;

    wsRef.current = new WebSocket(url);
    const ws = wsRef.current;

    const mediaStream = new MediaStream(undefined);

    pc.addEventListener('iceconnectionstatechange', onIceConnect);

    setLocalAvailability(pc);
    //? Add our local tracks (recieve only)
    pc.addEventListener(
      'track',
      async (ev: any) => await onTrack(ev, mediaStream),
    );

    ws.addEventListener('open', () => {
      pc.addEventListener('icecandidate', onIceCandidate);
      //? Broadcast icecandidates to server
      onWsOpen(pc, ws);
    });

    ws.addEventListener('message', ev => onWsMessage(ev, pc));

    // the following is to ensure that ice connection eventually becomes connected or completed
    // as it can get stuck in other states which are an error state
    let attempts = 0;
    while (
      pc.iceConnectionState !== 'connected' &&
      pc.iceConnectionState !== 'completed'
    ) {
      // async timeout for 100ms
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;

      if (attempts > 5) {
        setRetryAttempts(prev => prev + 1);
        throw new Error('Could not connect');
      }
    }
    setRetryAttempts(0);

    // we no longer want to listen to connected state change events
    pc.removeEventListener('iceconnectedstatechange', onIceConnect);
    pc.removeEventListener(
      'track',
      async (ev: any) => await onTrack(ev, mediaStream),
    );
  }, []);

  React.useEffect(() => {
    if (cameraURL && cameraName) {
      connect(cameraURL).catch(() => {
        if (retryAttempts < MAX_RETRIES) {
          setShouldRetry(prev => !prev);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraURL, cameraName, shouldRetry]);

  React.useEffect(() => {
    //? When the camera changes we want to close out the open streams.
    remoteStream?.getTracks().forEach(t => t.stop());
    remoteStream?.release(true);
    localStream?.getTracks().forEach(t => t.stop());
    localStream?.release();
  }, [cameraURL]);

  if (!cameraName) {
    return null;
  }

  if (isError) {
    return (
      <BaseView className="flex-1 mt-4 px-6">
        <BaseText className="text-center mb-2 text-red-600 text-lg">
          Unable to load stream for {cameraName}
        </BaseText>
        <TouchableOpacity
          className="self-center border border-red-700 p-3 px-6 rounded-md"
          onPress={() => setRetryAttempts(0)}>
          <BaseText>Try Again</BaseText>
        </TouchableOpacity>
      </BaseView>
    );
  }

  if (isLoading) {
    return (
      <BaseView className="flex-1 justify-center">
        <BaseText className="text-center mb-2">
          Loading stream for camera: {cameraName}
        </BaseText>
        <ActivityIndicator size={'large'} />
        <BaseText className="text-center mt-2">
          Retry attempts: {retryAttempts}
        </BaseText>
      </BaseView>
    );
  }

  if (remoteStream) {
    return (
      <RTCView
        className="w-full h-full"
        objectFit={'contain'}
        streamURL={remoteStream.toURL()}
      />
    );
  }
  return <Text>No video stream set</Text>;
};
