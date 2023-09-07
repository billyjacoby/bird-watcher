import {ActivityIndicator} from 'react-native';

import {BaseText, BaseView} from '@components';
import {useConfig} from '@hooks';

export const CamerasScreen = () => {
  const {data, isLoading, error} = useConfig();
  console.log(
    '🪵 | file: camerasScreen.tsx:8 | CamerasScreen | data:',
    JSON.stringify(data?.go2rtc, null, 2),
  );

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
      <BaseText>{JSON.stringify(data.cameras, null, 2)}</BaseText>
    </BaseView>
  );
};
