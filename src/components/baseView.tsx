import {useColorScheme, View, ViewProps} from 'react-native';

import clsx from 'clsx';

export const BaseView = (props: ViewProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      className={clsx(isDarkMode ? 'bg-black' : 'bg-white', 'flex-1')}
      {...props}
    />
  );
};
