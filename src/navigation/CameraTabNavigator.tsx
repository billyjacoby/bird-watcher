import React from 'react';
import {useColorScheme} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {EventsScreen, LiveViewScreen, RecordingsScreen} from '@screens';
import {hslToHex} from '@utils';

import {colors} from '../../themeColors.js';

import {TabBarIcon} from './components/TabBarIcon';

export type CameraTabsStackParamList = {
  Events: undefined;
  Live: undefined;
  Recordings: undefined;
};

const CameraTabStack = createBottomTabNavigator<CameraTabsStackParamList>();

export const CameraTabNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <CameraTabStack.Navigator
      screenOptions={({route}) => ({
        headerTitle: '',
        tabBarIcon: ({color, size}) =>
          TabBarIcon({color, size, route, isDarkMode}),
        tabBarActiveTintColor: isDarkMode ? 'white' : 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: isDarkMode
            ? hslToHex(colors.dark.background)
            : hslToHex(colors.light.background),
        },
        header: () => null,
      })}>
      <CameraTabStack.Screen name="Live" component={LiveViewScreen} />
      <CameraTabStack.Screen name="Events" component={EventsScreen} />
      <CameraTabStack.Screen name="Recordings" component={RecordingsScreen} />
    </CameraTabStack.Navigator>
  );
};
