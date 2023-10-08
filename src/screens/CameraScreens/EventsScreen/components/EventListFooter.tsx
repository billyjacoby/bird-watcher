import React from 'react';
import {TouchableOpacity} from 'react-native';

import {BaseText, BaseView, Label} from '@components';

export const EventListFooter = ({
  length,
  fetchNextPage,
}: {
  length?: number;
  fetchNextPage?: () => void;
}) => {
  return (
    <BaseView className="">
      {!!length && (
        <BaseText className="text-center text-mutedForeground dark:text-mutedForeground-dark pt-2">
          Showing {length} event{length > 1 && 's'}.
        </BaseText>
      )}
      {!!fetchNextPage && (
        <TouchableOpacity className="items-center mt-2" onPress={fetchNextPage}>
          <Label className="px-3 py-2">
            <BaseText>Fetch more</BaseText>
          </Label>
        </TouchableOpacity>
      )}
    </BaseView>
  );
};
