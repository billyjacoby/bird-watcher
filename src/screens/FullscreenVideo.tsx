import React from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {BaseView, VideoPlayer} from '@components';
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

  React.useEffect(() => {
    navigation.setOptions({title});
  }, [navigation, title]);

  return (
    <BaseView className="flex-1">
      <VideoPlayer
        videoURI={route.params.videoURI}
        isForcedFullscreen
        isPaused={false}
      />
    </BaseView>
  );
};
