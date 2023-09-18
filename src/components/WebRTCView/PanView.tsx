import React from 'react';
import {Animated, PanResponder} from 'react-native';

import {BaseView} from '../baseView';

export const PanView = ({
  children,
  isImageZoomed,
}: {
  children: React.ReactNode;
  isImageZoomed: boolean;
}) => {
  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <BaseView className="flex-1">
      <Animated.View
        style={{
          transform: [
            {translateX: isImageZoomed ? pan.x : 0},
            {translateY: isImageZoomed ? pan.y : 0},
          ],
        }}
        {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </BaseView>
  );
};
