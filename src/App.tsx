import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import clsx from 'clsx';
import {QueryClient, QueryClientProvider} from 'react-query';

import {RootNavigation} from '@navigation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [queryClient] = React.useState(new QueryClient());

  return (
    <SafeAreaView
      className={clsx('flex-1', 'bg-background', 'dark:bg-background-dark')}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <QueryClientProvider client={queryClient}>
        <RootNavigation />
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
