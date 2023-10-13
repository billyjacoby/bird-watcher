import React from 'react';

import Video from 'react-native-video';

export const VideoPlayer = ({
  videoURI,
  isPaused = true,
  snapshotURL,
  isForcedFullscreen,
  onError,
}: {
  videoURI: string;
  isPaused?: boolean;
  snapshotURL?: string;
  isForcedFullscreen?: boolean;
  onError?: Video['props']['onError'];
}) => {
  React.useEffect(() => {}, []);
  return (
    <Video
      poster={snapshotURL}
      posterResizeMode="cover"
      className="w-full h-full"
      resizeMode="contain"
      ignoreSilentSwitch="ignore"
      paused={isPaused}
      pictureInPicture={true}
      controls
      source={{uri: videoURI, type: 'm3u8'}}
      fullscreen={isForcedFullscreen}
      onError={onError || console.error}
    />
  );
};
