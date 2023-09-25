import React from 'react';

import Video from 'react-native-video';

export const VideoPlayer = ({
  videoURI,
  isPaused = true,
  snapshotURL,
}: {
  videoURI: string;
  isPaused?: boolean;
  snapshotURL?: string;
}) => {
  React.useEffect(() => {}, []);
  return (
    <Video
      poster={snapshotURL}
      posterResizeMode="cover"
      className="w-full h-full rounded-md"
      resizeMode="cover"
      ignoreSilentSwitch="ignore"
      paused={isPaused}
      pictureInPicture={true}
      controls
      source={{uri: videoURI}}
    />
  );
};
