import {Text, TextProps, useColorScheme} from 'react-native';

export const BaseText = ({children, ...props}: TextProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text className={isDarkMode ? 'text-white' : 'text-black'} {...props}>
      {children}
    </Text>
  );
};
