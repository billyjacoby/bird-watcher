import {Buffer} from 'buffer';
import React from 'react';

import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import {MediaStream} from 'react-native-webrtc';

import {BaseText, BaseView} from '@components';
import {API_BASE} from '@env';
import {useAppDataStore} from '@stores';

export const LiveViewScreen = () => {
  const currentCamera = useAppDataStore(state => state.currentCamera);
  const [videoFilePath, setVideoFilePath] = React.useState(null);

  const mpegUrl = `${API_BASE.replace(
    /^http/,
    'ws',
  )}live/jsmpeg/${currentCamera}`;
  const ws = new WebSocket(mpegUrl);
  // webSocket.onmessage = event => {
  //   const videoBlob = new Blob([event.data], {type: 'video/mp4'});
  //   setVideoBlob(videoBlob);
  // };

  React.useEffect(() => {
    const saveVideoToFile = async data => {
      const filePath = `${RNFS.CachesDirectoryPath}/video.mp4`;

      try {
        await RNFS.writeFile(filePath, data, 'base64');
        setVideoFilePath(filePath);
      } catch (error) {
        console.error('Error saving video to file:', error);
      }
    };

    // WebSocket on message event
    ws.onmessage = event => {
      // Convert ArrayBuffer to base64 string
      const videoData = Buffer.from(event.data).toString('base64');

      // Save video to file
      saveVideoToFile(videoData);
    };

    // Clean up WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <BaseView className="flex-1">
      <BaseText className="text-3xl mb-4 self-center text-foreground dark:text-foreground-dark">
        Live View
      </BaseText>

      {currentCamera && (
        <BaseView className="flex-1">
          {/* <WebRTCView cameraName={currentCamera} key={currentCamera} /> */}
          <Video
            source={{uri: `file://${videoFilePath}`}}
            onError={data => console.error(data)}
          />
          <BaseText>Viewing: {currentCamera}</BaseText>
        </BaseView>
      )}
    </BaseView>
  );
};
