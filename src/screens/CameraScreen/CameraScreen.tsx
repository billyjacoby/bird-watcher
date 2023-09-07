import {ActivityIndicator} from 'react-native';

import {CameraEvent} from './components';
import {BaseText, BaseView} from '@components';
import {useAllCameraNames} from '@hooks';

export const CamerasScreen = () => {
  const {data: cameraNames, isLoading, error} = useAllCameraNames();

  if (isLoading) {
    return (
      <BaseView>
        <ActivityIndicator size={'large'} />
      </BaseView>
    );
  }

  if (error || (!isLoading && !cameraNames)) {
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
      {cameraNames?.map(name => (
        <CameraEvent key={name} cameraName={name} />
      ))}
    </BaseView>
  );
};
