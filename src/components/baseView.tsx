import {ScrollView, ScrollViewProps, View, ViewProps} from 'react-native';

import clsx from 'clsx';

type BaseViewProps =
  | ({isScrollview?: never} & ViewProps)
  | ({isScrollview: true} & ScrollViewProps);

export const BaseView = (props: BaseViewProps) => {
  if (props.isScrollview) {
    return (
      <ScrollView
        contentContainerStyle={{minHeight: '95%'}}
        className={clsx('bg-background', 'dark:bg-background-dark', 'flex-1')}
        {...props}
      />
    );
  } else {
    return (
      <View
        className={clsx('bg-background', 'dark:bg-background-dark')}
        {...props}
      />
    );
  }
};
