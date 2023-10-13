import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BaseText, BaseView, VideoPlayer} from '@components';
import {MainStackParamList} from '@navigation';

type FullscreenVideoProps = NativeStackScreenProps<
  MainStackParamList,
  'Fullscreen Video'
>;

export const FullscreenVideoPlayer = ({
  route,
  navigation,
}: FullscreenVideoProps) => {
  const title = route.params.title || '';
  const [hasError, setHasError] = React.useState<boolean>(false);

  React.useEffect(() => {
    navigation.setOptions({title});
  }, [navigation, title]);

  return (
    <BaseView className="flex-1">
      {hasError ? (
        <BaseText className="text-destructive dark:text-destructive-dark">
          Error loading video.
        </BaseText>
      ) : (
        <VideoPlayer
          videoURI={route.params.videoURI}
          isForcedFullscreen
          isPaused={false}
          onError={data => {
            setHasError(true);
            console.error(data, route.params.videoURI);
          }}
        />
      )}
    </BaseView>
  );
};
