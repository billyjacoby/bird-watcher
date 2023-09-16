import {useColorScheme} from 'react-native';

import CameraIcon from '@assets/icons/camera.svg';
import VideoIcon from '@assets/icons/video-waveform.svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {CamerasScreen, HomeScreen, OnBoardingScreen} from '@screens';

//? Can't figure out how to properly type this
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import {colors, hslFunction} from '../../themeColors.js';

export type MainStackParamList = {
  Tabs: NavigatorScreenParams<TabsStackParamList>;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export type TabsStackParamList = {
  Cameras: undefined;
  Live: undefined;
};

const TabStack = createBottomTabNavigator<TabsStackParamList>();

const TabNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  //TODO: make work with tailwind theme...
  return (
    <TabStack.Navigator
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}) => {
          if (route.name === 'Cameras') {
            return (
              <CameraIcon
                height={size}
                width={size}
                fill={color}
                fillSecondary={isDarkMode ? 'black' : 'white'}
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
        },
        tabBarActiveTintColor: isDarkMode ? 'white' : 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: isDarkMode
            ? hslFunction(colors.dark.background)
            : hslFunction(colors.light.background),
        },
        header: () => null,
      })}>
      <TabStack.Screen name="Cameras" component={CamerasScreen} />
      <TabStack.Screen name="Live" component={HomeScreen} />
    </TabStack.Navigator>
  );
};

export const NavigationWrapper = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => null,
        }}>
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
