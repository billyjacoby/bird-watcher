import React from 'react';
import {ViewProps} from 'react-native';

import {BaseView} from '@components';
export const Label = (props: ViewProps) => {
  return (
    <BaseView
      className="px-2 py-1 rounded-md bg-accent dark:bg-accent-dark"
      {...props}
    />
  );
};
