import {ActivityIndicator} from 'react-native';

import {BaseText, BaseView} from '@components';
import {useConfig} from '@hooks';

export const CamerasScreen = () => {
  const {data, isLoading, error} = useConfig();

  if (isLoading) {
    return (
      <BaseView>
        <ActivityIndicator size={'large'} />
      </BaseView>
    );
  }

  if (error || (!isLoading && !data)) {
    return (
      <BaseView>
        <BaseText className="text-red-800 text-lg">
          Error fetching todos
        </BaseText>
      </BaseView>
    );
  }

  return (
    <BaseView isScrollview>
      <BaseText>{JSON.stringify(data, null, 2)}</BaseText>
    </BaseView>
  );
};
