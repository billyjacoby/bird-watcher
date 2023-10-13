import {
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {getLatestCameraFrame, useAllCameraNames} from '@api';
import {BaseText, BaseView, Label, SnapshotCard} from '@components';
import {useAppDataStore} from '@stores';

export const HomeScreen = () => {
  const {data: cameraNames, isLoading, refetch} = useAllCameraNames();
  const navigation = useNavigation();
  const setCurrentCamera = useAppDataStore(state => state.setCurrentCamera);

  const onCameraPress = (cameraName: string) => {
    setCurrentCamera(cameraName);
    navigation.navigate('CameraTabs', {screen: 'Events'});
  };

  if (isLoading) {
    return (
      <BaseView className="flex-1 align-middle pt-8">
        <ActivityIndicator size={'large'} />
      </BaseView>
    );
  }
  if (!cameraNames && !isLoading) {
    // Go to onboarding if not config exists, otherwise show an error
    console.error('No cameras found...');
    return null;
  }

  return (
    <BaseView
      isScrollview
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }>
      {cameraNames?.map(name => (
        <TouchableOpacity
          onPress={() => onCameraPress(name)}
          key={name}
          className="my-2">
          <SnapshotCard
            imageSource={getLatestCameraFrame({cameraName: name})}
            imageOverlay={
              <View className="absolute mx-auto left-0 right-0 bottom-0">
                <Label className="rounded-t-none">
                  <BaseText className="text-center text-lg">
                    {name.replaceAll('_', ' ')}
                  </BaseText>
                </Label>
              </View>
            }
          />
        </TouchableOpacity>
      ))}
    </BaseView>
  );
};
