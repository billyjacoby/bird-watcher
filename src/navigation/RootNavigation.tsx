import {useColorScheme} from 'react-native';

import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  CameraTabNavigator,
  CameraTabsStackParamList,
} from './CameraTabNavigator';
import {LeftHeaderButton, RightHeaderButton} from './components';
import {
  BirdseyeScreen,
  FullscreenVideoPlayer,
  HomeScreen,
  OnBoardingScreen,
  SettingsScreen,
} from '@screens';
import {useAppDataStore} from '@stores';
import {hslToHex} from '@utils';

import {colors} from '../../themeColors.js';

export type MainStackParamList = {
  Home: undefined;
  Birdseye: undefined;
  CameraTabs: NavigatorScreenParams<CameraTabsStackParamList>;
  Settings: undefined;
  Onboarding: undefined;
  'Fullscreen Video': {
    videoURI: string;
    title?: string;
  };
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const RootNavigation = () => {
  const currentCamera = useAppDataStore(state => state.currentCamera);
  const isDarkMode = useColorScheme() === 'dark';

  const tintColor = isDarkMode
    ? hslToHex(colors.dark.foreground)
    : hslToHex(colors.light.foreground);

  const backgroundColor = isDarkMode
    ? hslToHex(colors.dark.background)
    : hslToHex(colors.light.background);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: backgroundColor},
          headerShadowVisible: false,
          headerTintColor: tintColor,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerBackTitle: 'Back',
            headerTitle: 'Bird Watcher - Frigate',
            headerLeft: props => LeftHeaderButton(props as {tintColor: string}),
            headerRight: props =>
              RightHeaderButton(props as {tintColor: string}),
            headerTintColor: isDarkMode
              ? hslToHex(colors.dark.foreground)
              : hslToHex(colors.light.foreground),
          }}
        />
        <Stack.Screen
          name="CameraTabs"
          component={CameraTabNavigator}
          options={{
            headerBackTitle: 'Home',
            headerTitle: currentCamera?.replaceAll('_', ' '),
            headerTintColor: tintColor,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{presentation: 'modal', headerTransparent: false}}
        />
        <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
        <Stack.Screen
          name="Birdseye"
          component={BirdseyeScreen}
          options={{
            headerBackTitle: 'Home',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="Fullscreen Video"
          component={FullscreenVideoPlayer}
          options={{
            animation: 'slide_from_bottom',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
