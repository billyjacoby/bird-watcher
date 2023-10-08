import React from 'react';
import {TouchableOpacity} from 'react-native';

import BirdseyeIcon from '@icons/birdseye.svg';
import {useNavigation} from '@react-navigation/native';

import {useConfig} from '@api';

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
      <BirdseyeIcon
        height={24}
        width={24}
        fill={tintColor}
        fillSecondary={tintColor}
        style={{marginTop: 2}}
      />
    </TouchableOpacity>
  );
};
