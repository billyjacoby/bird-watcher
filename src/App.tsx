import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {QueryClient, QueryClientProvider} from 'react-query';
import colors from 'tailwindcss/colors';

import {NavigationWrapper} from '@navigation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.black : colors.white,
  };

  const [queryClient] = React.useState(new QueryClient());

  return (
    <SafeAreaView style={backgroundStyle} className="flex-1">
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <QueryClientProvider client={queryClient}>
        <NavigationWrapper />
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
