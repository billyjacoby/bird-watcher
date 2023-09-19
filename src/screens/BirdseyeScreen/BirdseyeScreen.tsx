import {useConfig} from '@api';
import {BaseText, WebRTCView} from '@components';

export const BirdseyeScreen = () => {
  const config = useConfig();

  if (config.isLoading) {
    return <BaseText>Loading ...</BaseText>;
  }

  if (config.data?.birdseye.enabled) {
    return <WebRTCView cameraName="birdseye" />;
  }

  return <BaseText>Birdseye is not enabled</BaseText>;
};
