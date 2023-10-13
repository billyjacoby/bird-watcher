import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {useConfig} from '@api';
import {Birdseye} from '@icons';

export const LeftHeaderButton = ({tintColor}: {tintColor?: string}) => {
  const nav = useNavigation();
  const config = useConfig();

  if (!config.data?.birdseye.enabled) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        nav.navigate('Birdseye');
      }}>
      <Birdseye
        height={24}
        width={24}
        fill={tintColor}
        fillSecondary={tintColor}
        style={{marginTop: 2}}
      />
    </TouchableOpacity>
  );
};
