import React from 'react';
import {Pressable, useColorScheme, View} from 'react-native';

import DownSquare from '@icons/downSquare.svg';
import clsx from 'clsx';

import {FrigateEvent} from '@api';
import {BaseText, Label} from '@components';
import {getFgColorHex} from '@utils';

export const SectionDateHeader = ({
  section,
  handleHeaderPress,
  isCollapsed,
}: {
  section: {
    title: string;
    data: FrigateEvent[];
  };
  handleHeaderPress: (s: string) => void;
  isCollapsed: boolean;
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Pressable onPress={() => handleHeaderPress(section.title)}>
      <Label
        className={clsx('px-4 py-2 rounded-t-none', isCollapsed && 'mb-1')}>
        <View className="flex-row items-center justify-between">
          <BaseText className="font-semibold">{section.title}</BaseText>
          <DownSquare
            fill={getFgColorHex(isDarkMode)}
            height={28}
            width={28}
            style={isCollapsed && {transform: [{rotate: '180deg'}]}}
          />
        </View>
      </Label>
    </Pressable>
  );
};
