/**
 * I'm thinking that we need to separate our connect function from the event
 * handlers. It seems that now we're re-adding the handlers on every iteration of connect
 * even if that handler is already there, which seems like it could definitely be problematic.
 * Creating separate setup and cleanup functions that are called on mount and unmount
 * then calling the connect function seems like it's the way forward here.
 *
 * I'm unsure if we really *need* to move the RCTPeerConnection into it's own Context, but
 * it also seems like the kind of thing that doesn't need to be instantiated more than a single time
 */

import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import {
  MediaStream,
  MediaStreamTrack,
  RTCPeerConnection,
  RTCView,
} from 'react-native-webrtc';

import {BaseText, BaseView} from '@components';
import {API_BASE} from '@env';

interface WebRTCViewProps {
  cameraName?: string;
}

const webRTCconfig = {
  iceServers: [{urls: 'stun:stun.l.google.com:19302'}],
};

const MAX_RETRIES = 10;

export const WebRTCView = ({cameraName}: WebRTCViewProps) => {
  const cameraURL =
    API_BASE.replace('http', 'ws') + '/live/webrtc/api/ws?src=' + cameraName;

  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [retryAttempts, setRetryAttempts] = React.useState(0);
  const [shouldRetry, setShouldRetry] = React.useState(false);
  const [remoteStream, setRemoteStream] = React.useState<MediaStream>(
    new MediaStream(undefined),
  );
  const [isWsOpen, setIsWsOpen] = React.useState(false);

  const isError = retryAttempts > MAX_RETRIES;

  const pcRef = React.useRef<RTCPeerConnection | null>(null);
  const wsRef = React.useRef<WebSocket>(new WebSocket(cameraURL));

  const onIceConnect = () => {
    const peerConnection = pcRef.current;
    if (peerConnection?.iceConnectionState === 'connected') {
      setIsLoading(false);
    }
  };

  //? Start webcam
  const setLocalAvailability = (pc: RTCPeerConnection) => {
    const peerConnection = pcRef.current;
    if (!peerConnection) {
      return;
    }
    //? This sets the tracks on the local device, should before anything else i think
    pc.addTransceiver('video', {
      direction: 'recvonly',
      // codecs: ['H264'],
    }).receiver.track;

    pc.addTransceiver('audio', {
      direction: 'recvonly',
    }).receiver.track;

    peerConnection.ontrack = (event: any) => {
      event?.streams[0].getTracks().forEach((track: MediaStreamTrack) => {
        remoteStream.addTrack(track);
      });
    };

    peerConnection.onaddstream = (event: any) => {
      setRemoteStream(event?.stream);
    };
  };

  const onIceCandidate = (ev: any) => {
    if (ev.candidate === null) {
      //*** Gathering is complete?
      //? I think this is where we want to notify the component that we're finished added ice candidates and can set the remote stream?
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
  const onWsMessage = async (ev: any) => {
    const peerConnection = pcRef.current;
    if (!peerConnection) {
      console.error('NO PEER CONNECTION onWsMessage()');
      return;
    }
    const pc = peerConnection;

    const msg = JSON.parse(ev.data);
    if (msg.type === 'webrtc/candidate') {
      pc.addIceCandidate(msg.value);
    } else if (msg.type === 'webrtc/answer') {
      pc.setRemoteDescription({type: 'answer', sdp: msg.value});
    }
  };

  const onWsOpen = () => {
    setIsWsOpen(true);
  };
  const onWsClose = () => {
    setIsWsOpen(false);
  };

  const setupListeners = () => {
    pcRef.current = new RTCPeerConnection(webRTCconfig);

    const peerConnection = pcRef.current;
    const ws = wsRef.current;

    setLocalAvailability(peerConnection);

    peerConnection.oniceconnectionstatechange = _event => onIceConnect();
    peerConnection.onicecandidate = event => onIceCandidate(event);

    ws.onopen = onWsOpen;
    ws.onclose = onWsClose;
    ws.onmessage = onWsMessage;
  };

  const connect = async () => {
    const peerConnection = pcRef.current;
    if (!peerConnection) {
      throw 'No RTCPeerConnection found in connect()';
    }
    if (!isWsOpen) {
      throw 'Websocket not open yet';
    }
    const pc = peerConnection;
    const ws = wsRef.current;

    setIsLoading(true);

    const offer = await pc.createOffer({});
    await pc.setLocalDescription(offer);

    if (pc.localDescription && isWsOpen) {
      //? Send our offer to the websocket and await an answer.
      const msg = {type: 'webrtc/offer', value: pc.localDescription.sdp};
      ws.send(JSON.stringify(msg));
    }

    // the following is to ensure that ice connection eventually becomes connected or completed
    // as it can get stuck in other states which are an error state
    let attempts = 0;
    while (
      peerConnection.iceConnectionState !== 'connected' &&
      peerConnection.iceConnectionState !== 'completed'
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
  };

  React.useEffect(() => {
    //? Setup our event listeners, and cleanup when we're done
    setupListeners();
    setRetryAttempts(0);
    return () => {
      remoteStream?.getTracks().forEach(t => t.stop());
      remoteStream?.release(true);
    };
  }, []);

  React.useEffect(() => {
    if (cameraURL && cameraName) {
      connect().catch(() => {
        if (retryAttempts < MAX_RETRIES) {
          setShouldRetry(prev => !prev);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraURL, cameraName, shouldRetry]);

  if (!cameraName) {
    return null;
  }

  if (isError) {
    return (
      <BaseView className="flex-1 mt-4 px-6">
        <BaseText className="text-center mb-2 text-red-600 text-lg">
          Unable to load streme for {cameraName}
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
