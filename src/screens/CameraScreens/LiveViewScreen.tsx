import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useAllCameraNames} from '@api';
import {BaseText, BaseView, WebRTCView} from '@components';
import {useAppDataStore} from '@stores';

export const LiveViewScreen = () => {
  const defaultCamera = useAppDataStore(state => state.currentCamera);
  const {data: cameraNames} = useAllCameraNames();

  const defaultIndex = cameraNames?.findIndex(item => item === defaultCamera);
  const [cameraIndex, setCameraIndex] = React.useState(defaultIndex || 0);

  const currentCamera = cameraNames?.[cameraIndex];

  const onButtonPress = (direction: 'prev' | 'next') => {
    if (!cameraNames) {
      return;
    }
    if (direction === 'prev') {
      if (cameraIndex === 0) {
        setCameraIndex(cameraNames.length - 1);
      } else {
        setCameraIndex(prev => prev - 1);
      }
    }

    if (direction === 'next') {
      if (cameraIndex === cameraNames.length - 1) {
        setCameraIndex(0);
      } else {
        setCameraIndex(prev => prev + 1);
      }
    }
  };

  return (
    <BaseView className="flex-1">
      <BaseText className="text-3xl mb-4 self-center text-foreground dark:text-foreground-dark">
        WebRTC Test Screen
      </BaseText>

      <BaseView className="flex-row justify-evenly mb-2">
        <TouchableOpacity
          className="px-3 py-2 border border-green-500 rounded-md"
          onPress={() => onButtonPress('prev')}>
          <BaseText>Prev Camera</BaseText>
        </TouchableOpacity>
        <TouchableOpacity
          className="px-3 py-2 border border-green-500 rounded-md"
          onPress={() => onButtonPress('next')}>
          <BaseText>Next Camera</BaseText>
        </TouchableOpacity>
      </BaseView>
      {currentCamera && (
        <BaseView className="flex-1">
          <WebRTCView cameraName={currentCamera} key={currentCamera} />
          <BaseText>Viewing: {currentCamera}</BaseText>
        </BaseView>
      )}
    </BaseView>
  );
};
