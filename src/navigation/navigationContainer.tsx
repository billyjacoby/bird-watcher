import {TouchableOpacity, useColorScheme} from 'react-native';

import BirdseyeIcon from '@icons/birdseye.svg';
import EventIcon from '@icons/event.svg';
import HomeIcon from '@icons/home.svg';
import SettingsIcon from '@icons/settings.svg';
import VideoIcon from '@icons/video-waveform.svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useConfig} from '@api';
import {
  BirdseyeScreen,
  EventsScreen,
  HomeScreen,
  LiveViewScreen,
  OnBoardingScreen,
  SettingsScreen,
} from '@screens';
import {useAppDataStore} from '@stores';
import {hslToHex} from '@utils';

import {colors} from '../../themeColors.js';

export type MainStackParamList = {
  Home: undefined;
  Birdseye: undefined;
  Tabs: NavigatorScreenParams<TabsStackParamList>;
  Settings: undefined;
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
            ? hslToHex(colors.dark.background)
            : hslToHex(colors.light.background),
        },
        header: () => null,
      })}>
      <TabStack.Screen name="Events" component={EventsScreen} />
      <TabStack.Screen name="Live" component={LiveViewScreen} />
    </TabStack.Navigator>
  );
};

const LeftHeaderButton = ({tintColor}: {tintColor?: string}) => {
  const nav = useNavigation();
  const config = useConfig();

  if (!config.data?.birdseye.enabled) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate('Birdseye');
      }}>
      <BirdseyeIcon
        height={24}
        width={24}
        fill={tintColor}
        fillSecondary={tintColor}
      />
    </TouchableOpacity>
  );
};

const RightHeaderButton = ({tintColor}: {tintColor?: string}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <SettingsIcon height={22} width={22} fill={tintColor} />
    </TouchableOpacity>
  );
};

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
          name="Tabs"
          component={TabNavigator}
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
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
