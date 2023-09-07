import React from 'react';
import {Image, useWindowDimensions, View} from 'react-native';

import {BaseText} from '@components';
import {useCameraEvents} from '@hooks';

export const CameraEvent = ({cameraName}: {cameraName: string}) => {
  const {data} = useCameraEvents({cameras: cameraName, limit: '10'});
  const {width} = useWindowDimensions();
  const imageSize = width * 0.9;
  const lastEvent = data?.[0];

  const lastEventEnded =
    lastEvent && new Date(lastEvent?.end_time * 1000).toLocaleString();

  const lastThumbnail =
    lastEvent && 'data:image/png;base64,' + lastEvent.thumbnail;

  return (
    <View className="border-white border-2 mt-3 p-4">
      <View className="w-full justify-between flex-row">
        <BaseText>{cameraName}</BaseText>
        {!!lastEventEnded && <BaseText>{lastEventEnded}</BaseText>}
      </View>
      {lastThumbnail && (
        <Image
          source={{uri: lastThumbnail}}
          style={{height: imageSize, width: imageSize}}
          className="self-center rounded-md mt-2"
        />
      )}
    </View>
  );
};
