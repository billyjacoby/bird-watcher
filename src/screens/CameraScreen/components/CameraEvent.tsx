import React from 'react';
import {Image, useWindowDimensions, View} from 'react-native';

import {Label} from './Label';
import {BaseText, BaseView} from '@components';
import {FrigateEvent} from '@hooks';

export const CameraEvent = ({camEvent}: {camEvent: FrigateEvent}) => {
  const {width} = useWindowDimensions();
  const imageWidth = width * 0.97;
  const imageHeight = imageWidth * 0.75;

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

  const lastEventEnded = getDateString(new Date(camEvent?.end_time * 1000));

  const lastThumbnail = 'data:image/png;base64,' + camEvent.thumbnail;
  const lastEventImage = camEvent && camEvent.snapshotURL;

  return (
    <BaseView className="px-2:" style={{width, minHeight: imageHeight}}>
      {(lastEventImage || lastThumbnail) && (
        <View className="self-center my-2 border border-accent dark:border-accent-dark relative rounded-lg">
          <Image
            source={{uri: lastEventImage ?? lastThumbnail}}
            resizeMode="contain"
            style={{height: imageHeight, width: imageWidth, borderRadius: 8}}
            className="top-0"
          />
          <View
            className="justify-between flex-row absolute p-1"
            style={{width: imageWidth}}>
            <Label>
              <BaseText className="text-md font-semibold">
                {camEvent.label.replaceAll('_', ' ').toLocaleUpperCase()}
              </BaseText>
            </Label>
            {!!lastEventEnded && (
              <Label>
                <BaseText className="text-xs text-mutedForeground dark:text-mutedForeground-dark">
                  {lastEventEnded}
                </BaseText>
              </Label>
            )}
          </View>
          {/* <View
            className="justify-between flex-row my-1 px-1 absolute bottom-0"
            style={{width: imageWidth}}>
            <View className="flex-row gap-1">
              <Label>
                <BaseText className="text-md font-semibold text-mutedForeground dark:text-mutedForeground-dark">
                  Events
                </BaseText>
              </Label>
              {!!lastEventEnded && (
                <Label>
                  <BaseText className="text-xs text-mutedForeground dark:text-mutedForeground-dark">
                    Recordings
                  </BaseText>
                </Label>
              )}
            </View>
            <View className="flex-row gap-1">
              <Label>
                <BaseText className="text-mutedForeground dark:text-mutedForeground-dark">
                  DT
                </BaseText>
              </Label>
              <Label>
                <BaseText className="text-mutedForeground dark:text-mutedForeground-dark">
                  RC
                </BaseText>
              </Label>
              <Label>
                <BaseText className="text-mutedForeground dark:text-mutedForeground-dark">
                  SP
                </BaseText>
              </Label>
            </View>
          </View> */}
        </View>
      )}
    </BaseView>
  );
};
