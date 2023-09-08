import React from 'react';
import {TouchableOpacity} from 'react-native';

import {BaseText, BaseView, WebRTCPOC} from '@components';
import {useAllCameraNames} from '@hooks';

export const HomeScreen = () => {
  const {data: cameraNames} = useAllCameraNames();
  const [cameraIndex, setCameraIndex] = React.useState(0);

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
    <BaseView isScrollview className="pb-4">
      <BaseText className="text-3xl mb-4 self-center">
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
          <WebRTCPOC cameraName={currentCamera} />
          <BaseText>Vieweing: {currentCamera}</BaseText>
        </BaseView>
      )}
    </BaseView>
  );
};
