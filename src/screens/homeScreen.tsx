import React from 'react';
import {Button, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {BaseText, BaseView, WebRTCPOC} from '@components';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <BaseView isScrollview className="pb-4">
      <WebRTCPOC cameraName="frigate_front_door" />
      <BaseText className="text-3xl">Home Screen</BaseText>
      <View className="border-white border-2 mt-auto rounded-lg mx-10">
        <Button
          title="View Cameras"
          onPress={() => navigation.navigate('Tabs', {screen: 'Cameras'})}
        />
      </View>
    </BaseView>
  );
};
