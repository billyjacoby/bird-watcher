import {
  ScrollView,
  ScrollViewProps,
  useColorScheme,
  View,
  ViewProps,
} from 'react-native';

import clsx from 'clsx';

type BaseViewProps =
  | ({isScrollview?: never} & ViewProps)
  | ({isScrollview: true} & ScrollViewProps);

export const BaseView = (props: BaseViewProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  if (props.isScrollview) {
    return (
      <ScrollView
        contentContainerStyle={{flex: 1}}
        className={clsx(isDarkMode ? 'bg-black' : 'bg-white', 'flex-1')}
        {...props}
      />
    );
  } else {
    return (
      <View
        className={clsx(isDarkMode ? 'bg-black' : 'bg-white', 'flex-1')}
        {...props}
      />
    );
  }
};
