import React from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import clsx from 'clsx';

import {EventDetails} from './EventDetails';
import {FrigateEvent} from '@api';
import {BaseView, SnapshotCard, VideoPlayer} from '@components';

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

  const scrollviewRef = React.useRef<ScrollView>(null);

  const [videoIsPaused, setVideoIsPaused] = React.useState(true);

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

  const onEventPress = () => {
    scrollviewRef?.current?.scrollToEnd();
    setVideoIsPaused(false);
  };

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (scrollviewRef.current) {
      const xOffset = event.nativeEvent.contentOffset.x;
      const scrollIndex = Math.round(xOffset / width);
      if (scrollIndex === 2) {
        setVideoIsPaused(false);
      } else {
        setVideoIsPaused(true);
      }
    }
  };

  const lastEventEnded = getDateString(new Date(camEvent?.end_time * 1000));

  const lastThumbnail = 'data:image/png;base64,' + camEvent.thumbnail;
  const lastEventImage = camEvent && camEvent.snapshotURL;

  return (
    <ScrollView
      ref={scrollviewRef}
      onMomentumScrollEnd={onScrollEnd}
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
          <Pressable onPress={onEventPress}>
            <SnapshotCard
              camEvent={{...camEvent, lastEventEnded}}
              imageSource={lastEventImage || lastThumbnail}
            />
          </Pressable>
        )}
      </BaseView>

      {/* //? if there's a video, show that to the right */}
      <BaseView style={{width, height: imageHeight}}>
        <VideoPlayer
          key={camEvent.id}
          videoURI={camEvent.vodURL}
          isPaused={videoIsPaused}
          snapshotURL={lastEventImage || lastThumbnail}
        />
      </BaseView>
    </ScrollView>
  );
};
//
