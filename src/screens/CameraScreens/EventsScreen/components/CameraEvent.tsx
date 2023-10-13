import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import clsx from 'clsx';

import {EventDetails} from './EventDetails';
import {FrigateEvent} from '@api';
import {BaseView, SnapshotCard} from '@components';

export const CameraEvent = ({
  camEvent,
  isFirst,
}: {
  camEvent: FrigateEvent;
  isFirst?: boolean;
}) => {
  const {width} = useWindowDimensions();
  const imageWidth = width * 0.97;
  const imageHeight = imageWidth * 0.75;

  const navigation = useNavigation();

  const scrollviewRef = React.useRef<ScrollView>(null);

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

  const onPlayPress = () => {
    // Open fullscreen player
    navigation.navigate('Fullscreen Video', {
      videoURI: camEvent.vodURL,
      title: 'Event',
    });
  };

  const lastEventEnded = getDateString(new Date(camEvent?.end_time * 1000));

  const lastThumbnail = 'data:image/png;base64,' + camEvent.thumbnail;
  const lastEventImage = camEvent && camEvent.snapshotURL;

  return (
    <ScrollView
      ref={scrollviewRef}
      horizontal
      contentOffset={{x: width, y: 0}}
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      className={clsx('py-2', isFirst && 'pt-1 rounded-t-none')}>
      {/* //? Details on left */}
      <BaseView
        style={{width, height: imageHeight}}
        className="flex-1 justify-center">
        <EventDetails camEvent={camEvent} />
      </BaseView>

      {/* //? snapshot in middle, default view */}
      <BaseView style={{width, height: imageHeight}}>
        {(lastEventImage || lastThumbnail) && (
          <SnapshotCard
            camEvent={{...camEvent, lastEventEnded}}
            imageSource={lastEventImage || lastThumbnail}
            onPlayPress={onPlayPress}
          />
        )}
      </BaseView>
    </ScrollView>
  );
};
//
