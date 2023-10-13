import React from 'react';
import {Pressable, useColorScheme, View} from 'react-native';

import DownSquare from '@icons/downSquare.svg';
import clsx from 'clsx';

import {BaseText, Label} from '@components';
import {getFgColorHex} from '@utils';

export const SectionDateHeader = ({
  title,
  handleHeaderPress,
  isCollapsed,
}: {
  title: string;
  handleHeaderPress?: (s: string) => void;
  isCollapsed?: boolean;
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const shouldShowCollapse = typeof isCollapsed !== 'undefined';
  return (
    <Pressable onPress={() => handleHeaderPress?.(title)}>
      <Label
        className={clsx('px-4 py-2 rounded-t-none', isCollapsed && 'mb-1')}>
        <View className="flex-row items-center justify-between">
          <BaseText className="font-semibold">{title}</BaseText>
          {shouldShowCollapse ? (
            <DownSquare
              fill={getFgColorHex(isDarkMode)}
              height={28}
              width={28}
              style={isCollapsed && {transform: [{rotate: '180deg'}]}}
            />
          ) : (
            <View className="h-7 w-7" />
          )}
        </View>
      </Label>
    </Pressable>
  );
};
