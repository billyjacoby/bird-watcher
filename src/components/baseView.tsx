import {ScrollView, ScrollViewProps, View, ViewProps} from 'react-native';

import clsx from 'clsx';

import {bgBackground} from '@utils';

type BaseViewProps =
  | ({isScrollview?: never} & ViewProps)
  | ({isScrollview: true} & ScrollViewProps);

export const BaseView = (props: BaseViewProps) => {
  if (props.isScrollview) {
    return (
      <ScrollView
        contentContainerStyle={{minHeight: '95%'}}
        className={clsx(bgBackground, 'flex-1')}
        {...props}
      />
    );
  } else {
    return <View className={bgBackground} {...props} />;
  }
};
