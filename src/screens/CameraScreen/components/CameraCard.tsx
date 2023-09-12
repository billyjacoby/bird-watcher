import React from 'react';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

import {CameraEvent} from './CameraEvent';
import {BaseText, BaseView} from '@components';
import {useCameraEvents} from '@hooks';

const CameraCardComponent = ({cameraName}: {cameraName: string}) => {
  const {data: events} = useCameraEvents({cameras: cameraName, limit: '10'});
  if (!events && !events?.[0]) {
    return null;
  }

  return (
    <>
      <BaseText>{cameraName.replaceAll('_', ' ')}</BaseText>
      <BaseView
        isScrollview
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {events.map(camEvent => {
          return <CameraEvent camEvent={camEvent} key={camEvent.id} />;
        })}
      </BaseView>
    </>
  );
};

export const CameraCard = gestureHandlerRootHOC(CameraCardComponent);
