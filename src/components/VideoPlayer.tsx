import Video from 'react-native-video';

export const VideoPlayer = ({
  videoURI,
  isPaused = true,
}: {
  videoURI: string;
  isPaused?: boolean;
}) => {
  return (
    <Video
      className="w-full h-full rounded-md"
      paused={isPaused}
      bufferConfig={{minBufferMs: 1000}}
      fullscreen={true}
      pictureInPicture={true}
      controls
      source={{uri: videoURI}}
    />
  );
};
