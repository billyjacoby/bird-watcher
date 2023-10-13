import {ActivityIndicator} from 'react-native';

import {BaseView} from './baseView';

export const LoadingView = () => {
  return (
    <BaseView className="flex-1">
      <ActivityIndicator size={'large'} />
    </BaseView>
  );
};
