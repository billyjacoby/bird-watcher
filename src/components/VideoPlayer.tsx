import React from 'react';

import Video from 'react-native-video';

export const VideoPlayer = ({
  videoURI,
  isPaused = true,
  snapshotURL,
  isForcedFullscreen,
}: {
  videoURI: string;
  isPaused?: boolean;
  snapshotURL?: string;
  isForcedFullscreen?: boolean;
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
      source={{uri: videoURI}}
      fullscreen={isForcedFullscreen}
    />
  );
};
