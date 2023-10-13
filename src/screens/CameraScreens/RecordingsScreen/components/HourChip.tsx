import React from 'react';
import {Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import clsx from 'clsx';

import {BaseText, Label} from '@components';
import {PlayRect} from '@icons';
import {getRecordingUrl} from '@utils';

export const HourChip = ({
  numEvents,
  date,
  cameraName,
}: {
  numEvents: number;
  date: Date;
  cameraName: string;
}) => {
  const navigation = useNavigation();
  const hourString = date.getHours() + ':00';
  const vodUrl = getRecordingUrl(cameraName, date);
  const videoTitle = `${date.toLocaleDateString(undefined, {
    weekday: undefined,
  })} - ${hourString}`;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Fullscreen Video', {
          videoURI: vodUrl,
          title: videoTitle,
        });
      }}>
      <Label
        className={clsx(
          'mx-1 my-2 justify-between p-2 items-center border border-transparent',
          numEvents > 0 && 'border-destructive dark:border-destructive-dark',
        )}>
        <BaseText className="mb-1">{hourString}</BaseText>
        <PlayRect className="h-8 w-8" fill={'white'} />
        <BaseText>{numEvents} Events</BaseText>
      </Label>
    </Pressable>
  );
};
