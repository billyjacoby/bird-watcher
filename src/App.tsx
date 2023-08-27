import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import colors from 'tailwindcss/colors';

import {BaseText} from '@components';

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
      <ScrollView
        style={{
          backgroundColor: isDarkMode ? colors.black : colors.white,
        }}>
        <BaseText>This is some text</BaseText>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
