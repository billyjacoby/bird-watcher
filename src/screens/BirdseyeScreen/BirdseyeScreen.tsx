import {useConfig} from '@api';
import {BaseText, WebRTCView} from '@components';

export const BirdseyeScreen = () => {
  const config = useConfig();

  if (config.isLoading) {
    return <BaseText>Loading ...</BaseText>;
  }

  if (config.isError) {
    return <BaseText>Failed to load frigate config</BaseText>;
  }

  if (!config.data?.birdseye.enabled) {
    return <BaseText>Birdseye is not enabled</BaseText>;
  }

  if (!config.data?.birdseye.restream) {
    return (
      <BaseText>
        Restream must be enabled so that the birdseye feed is served through
        WebRTC. Please update your Frigate config.
      </BaseText>
    );
  }

  return <WebRTCView cameraName="birdseye" />;
};
