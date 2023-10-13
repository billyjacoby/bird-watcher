import {
  Image,
  ImageURISource,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';

import clsx from 'clsx';

import {BaseText} from './baseText';
import {Label} from './label';
import {FrigateEvent} from '@api';
import {PlayRect} from '@icons';

import {colors, hslFunction} from '../../themeColors';

export const SnapshotCard = ({
  imageSource,
  camEvent,
  imageOverlay,
  addtlClasses,
  onPlayPress,
}: {
  imageSource: ImageURISource['uri'];
  camEvent?: FrigateEvent & {lastEventEnded: string};
  imageOverlay?: React.ReactNode;
  addtlClasses?: string;
  onPlayPress?: () => void;
}) => {
  const {width} = useWindowDimensions();
  const imageWidth = width;
  const imageHeight = imageWidth * 0.75;

  const isDarkMode = useColorScheme() === 'dark';

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
        <View className="absolute w-full h-full">
          <View
            className="flex-row justify-between absolute p-1"
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
          {!!onPlayPress && (
            <TouchableOpacity
              className="mt-auto ml-auto mr-2 mb-2 rounded-lg p-2 bg-background dark:bg-background-dark opacity-60 items-center justify-center flex"
              onPress={onPlayPress}>
              <PlayRect
                height={64}
                width={64}
                className="-mb-3.5"
                fill={
                  isDarkMode
                    ? hslFunction(colors.dark.foreground)
                    : hslFunction(colors.light.foreground)
                }
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
