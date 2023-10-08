import EventIcon from '@icons/event.svg';
import RecordingIcon from '@icons/recording.svg';
import VideoIcon from '@icons/video-waveform.svg';
import {RouteProp} from '@react-navigation/native';

import {CameraTabsStackParamList} from '../CameraTabNavigator';

export const TabBarIcon = ({
  color,
  size,
  route,
  isDarkMode,
}: {
  color: string;
  size: number;
  isDarkMode: boolean;
  route: RouteProp<CameraTabsStackParamList, keyof CameraTabsStackParamList>;
}) => {
  if (route.name === 'Recordings') {
    return (
      <RecordingIcon
        height={size}
        width={size}
        fill={color}
        fillSecondary={color}
      />
    );
  }
  if (route.name === 'Events') {
    return (
      <EventIcon
        height={size}
        width={size}
        fill={color}
        fillSecondary={color}
      />
    );
  }
  if (route.name === 'Live') {
    return (
      <VideoIcon
        height={size}
        width={size}
        fill={color}
        fillSecondary={isDarkMode ? 'black' : 'white'}
      />
    );
  }
  return null;
};
