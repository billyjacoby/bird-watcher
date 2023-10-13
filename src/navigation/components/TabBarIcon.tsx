import {RouteProp} from '@react-navigation/native';

import {Event, Live, Recording} from '@icons';

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
      <Recording
        height={size}
        width={size}
        fill={color}
        fillSecondary={color}
      />
    );
  }
  if (route.name === 'Events') {
    return (
      <Event height={size} width={size} fill={color} fillSecondary={color} />
    );
  }
  if (route.name === 'Live') {
    return (
      <Live
        height={size}
        width={size}
        fill={color}
        fillSecondary={isDarkMode ? 'black' : 'white'}
      />
    );
  }
  return null;
};
