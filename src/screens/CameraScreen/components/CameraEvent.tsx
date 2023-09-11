import React from 'react';
import {ImageBackground, useWindowDimensions, View} from 'react-native';

import {BaseText} from '@components';
import {useCameraEvents} from '@hooks';

export const CameraEvent = ({cameraName}: {cameraName: string}) => {
  const {data} = useCameraEvents({cameras: cameraName, limit: '10'});
  const {width} = useWindowDimensions();
  const imageSize = width * 0.97;
  const lastEvent = data?.[0];

  const getDateString = (date: Date) => {
    return (
      date.toLocaleString(undefined, {
        dateStyle: 'short',
      }) +
      ' - ' +
      date.toLocaleString(undefined, {
        timeStyle: 'short',
      })
    );
  };

  const lastEventEnded =
    lastEvent && getDateString(new Date(lastEvent?.end_time * 1000));

  const lastThumbnail =
    lastEvent && 'data:image/png;base64,' + lastEvent.thumbnail;
  const lastEventImage = lastEvent && lastEvent.snapshotURL;

  return (
    <View className="p-2">
      <View className="justify-between flex-row">
        <BaseText className="text-md">
          {cameraName.replaceAll('_', ' ').toLocaleUpperCase()}
        </BaseText>
        {!!lastEventEnded && (
          <BaseText className="text-xs text-mutedForeground dark:text-mutedForeground-dark">
            {lastEventEnded}
          </BaseText>
        )}
      </View>
      {(lastEventImage || lastThumbnail) && (
        <View
          className="self-center mt-2"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            borderRadius: 8,
            shadowColor: '#fff',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
          }}>
          <ImageBackground
            source={{uri: lastEventImage ?? lastThumbnail}}
            resizeMode="cover"
            style={{height: imageSize, width: imageSize}}
            // eslint-disable-next-line react-native/no-inline-styles
            imageStyle={{
              borderRadius: 8,
            }}
          />
        </View>
      )}
    </View>
  );
};
