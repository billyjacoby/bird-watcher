import BirdseyeIcon from '@icons/birdseye.svg';
import {useNavigation} from '@react-navigation/native';

import {useConfig} from '@api';

interface BirdseyeIconProps {
  fill?: string;
}

export const BirdseyeNavigationButton = (props: BirdseyeIconProps) => {
  const nav = useNavigation();
  const config = useConfig();

  if (!config.data?.birdseye.enabled) {
    return null;
  }

  return (
    <BirdseyeIcon
      height={25}
      width={25}
      onPress={() => {
        nav.navigate('Birdseye');
      }}
      fill={props.fill}
      fillSecondary={props.fill}
    />
  );
};
