import {Text, TextProps} from 'react-native';

export const BaseText = ({children, ...props}: TextProps) => {
  return (
    <Text className="text-foreground dark:text-foreground-dark" {...props}>
      {children}
    </Text>
  );
};
