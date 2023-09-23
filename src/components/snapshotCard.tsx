import {Image, ImageURISource, useWindowDimensions, View} from 'react-native';

import {BaseText} from './baseText';
import {Label} from './label';
import {FrigateEvent} from '@api';

export const SnapshotCard = ({
  imageSource,
  camEvent,
  imageOverlay,
}: {
  imageSource: ImageURISource['uri'];
  camEvent?: FrigateEvent & {lastEventEnded: string};
  imageOverlay?: React.ReactNode;
}) => {
  const {width} = useWindowDimensions();
  const imageWidth = width * 0.97;
  const imageHeight = imageWidth * 0.75;

  return (
    <View className="self-center border border-accent dark:border-accent-dark relative rounded-lg">
      <Image
        source={{uri: imageSource}}
        resizeMode="contain"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{height: imageHeight, width: imageWidth, borderRadius: 8}}
        className="top-0"
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
