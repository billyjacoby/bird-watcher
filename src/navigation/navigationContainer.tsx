import {useColorScheme} from 'react-native';

import EventIcon from '@icons/event.svg';
import HomeIcon from '@icons/home.svg';
import VideoIcon from '@icons/video-waveform.svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  EventsScreen,
  HomeScreen,
  LiveViewScreen,
  OnBoardingScreen,
} from '@screens';
import {useAppDataStore} from '@stores';

//? Can't figure out how to properly type this
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import {colors, hslFunction} from '../../themeColors.js';

export type MainStackParamList = {
  Home: undefined;
  Tabs: NavigatorScreenParams<TabsStackParamList>;
  Onboarding: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export type TabsStackParamList = {
  Events: undefined;
  Live: undefined;
  Recordings: undefined;
};

const TabStack = createBottomTabNavigator<TabsStackParamList>();

const TabNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  //TODO: make work with tailwind theme...
  return (
    <TabStack.Navigator
      screenOptions={({route}) => ({
        headerTitle: '',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({color, size}) => {
          if (route.name === 'Recordings') {
            // TODO
            return (
              <HomeIcon
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
      <TabStack.Screen name="Events" component={EventsScreen} />
      <TabStack.Screen name="Live" component={LiveViewScreen} />
    </TabStack.Navigator>
  );
};

export const NavigationWrapper = () => {
  const currentCamera = useAppDataStore(state => state.currentCamera);
  const isDarkMode = useColorScheme() === 'dark';

  // TODO: update to get this value properly...
  const tintColor = isDarkMode ? 'white' : 'black';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: 'transparent'},
          headerTintColor: tintColor,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerBackTitle: 'Back',
            headerTitle: 'Bird Watcher - Frigate',
            headerTintColor: isDarkMode
              ? colors.dark.accent
              : colors.light.accent,
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{
            headerBackTitle: 'Home',
            headerTitle: currentCamera?.replaceAll('_', ' '),
            headerTintColor: tintColor,
          }}
        />
        <Stack.Screen name="Onboarding" component={OnBoardingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
