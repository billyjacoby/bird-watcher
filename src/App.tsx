import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import colors from 'tailwindcss/colors';

import {NavigationWrapper} from '@navigation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.black : colors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle} className="flex-1">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationWrapper />
    </SafeAreaView>
  );
}

export default App;
