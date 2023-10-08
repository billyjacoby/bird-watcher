import React from 'react';
import {TouchableOpacity} from 'react-native';

import SettingsIcon from '@icons/settings.svg';
import {useNavigation} from '@react-navigation/native';

export const RightHeaderButton = ({tintColor}: {tintColor?: string}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
      <SettingsIcon height={22} width={22} fill={tintColor} />
    </TouchableOpacity>
  );
};
