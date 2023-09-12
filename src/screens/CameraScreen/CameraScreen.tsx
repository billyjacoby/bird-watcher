import {ActivityIndicator} from 'react-native';

import {CameraCard} from './components';
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
    <BaseView isScrollview showsVerticalScrollIndicator={false}>
      <BaseText className="text-2xl font-bold">Cameras</BaseText>
      {cameraNames?.map(name => (
        <CameraCard key={name} cameraName={name} />
      ))}
    </BaseView>
  );
};
