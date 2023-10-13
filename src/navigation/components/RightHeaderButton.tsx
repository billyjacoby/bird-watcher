import React from 'react';
import {TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {Settings} from '@icons';

export const RightHeaderButton = ({tintColor}: {tintColor?: string}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <Settings height={22} width={22} fill={tintColor} />
    </TouchableOpacity>
  );
};
