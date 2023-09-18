import React from 'react';
import {useWindowDimensions} from 'react-native';

import {FrigateEvent} from '@api';
import {BaseView, SnapshotCard} from '@components';

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
        <SnapshotCard
          camEvent={{...camEvent, lastEventEnded}}
          imageSource={lastEventImage || lastThumbnail}
        />
      )}
    </BaseView>
  );
};
