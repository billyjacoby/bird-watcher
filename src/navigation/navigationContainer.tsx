import {useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import colors from 'tailwindcss/colors';

import {HomeScreen, TodosScreen} from '@screens';

export type MainStackParamList = {
  Home: undefined;
  Todos: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const NavigationWrapper = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: isDarkMode ? colors.white : colors.black,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: isDarkMode ? colors.black : colors.white,
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Todos" component={TodosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
