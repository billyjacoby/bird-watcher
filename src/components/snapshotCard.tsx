import {Image, ImageURISource, useWindowDimensions, View} from 'react-native';

import clsx from 'clsx';

import {BaseText} from './baseText';
import {Label} from './label';
import {FrigateEvent} from '@api';

export const SnapshotCard = ({
  imageSource,
  camEvent,
  imageOverlay,
  addtlClasses,
}: {
  imageSource: ImageURISource['uri'];
  camEvent?: FrigateEvent & {lastEventEnded: string};
  imageOverlay?: React.ReactNode;
  addtlClasses?: string;
}) => {
  const {width} = useWindowDimensions();
  const imageWidth = width;
  const imageHeight = imageWidth * 0.75;

  return (
    <View className={clsx('rounded-xl', addtlClasses)}>
      <Image
        source={{uri: imageSource}}
        resizeMode="cover"
        style={{height: imageHeight, width: imageWidth}}
        className="top-0 rounded-lg"
      />
      {!!imageOverlay && imageOverlay}
      {!!camEvent && (
        <View
          className="justify-between flex-row absolute p-1"
          style={{width: imageWidth}}>
          <Label>
            <BaseText className="text-md font-semibold">
              {camEvent.label.replaceAll('_', ' ').toLocaleUpperCase()}
            </BaseText>
          </Label>
          {!!camEvent.lastEventEnded && (
            <Label>
              <BaseText className="text-xs text-mutedForeground dark:text-mutedForeground-dark">
                {camEvent.lastEventEnded}
              </BaseText>
            </Label>
          )}
        </View>
      )}
    </View>
  );
};
