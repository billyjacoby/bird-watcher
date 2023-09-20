import {
  Switch,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from 'react-native';

import {useConfig} from '@api';
import {BaseText, BaseView} from '@components';
import {API_BASE} from '@env';
import {showIPOnly} from '@utils';

const SettingRow = (props: ViewProps) => {
  return (
    <View className="flex-row justify-between items-center my-1" {...props} />
  );
};

const SettingsLabel = (props: TextProps) => {
  return <BaseText className="text-lg font-semibold" {...props} />;
};

const SettingsTextInput = (props: TextInputProps) => {
  return (
    <View className="p-2 px-4 bg-accent dark:bg-accent-dark rounded-md w-1/2">
      <TextInput
        className="text-foreground dark:text-background text-center"
        {...props}
      />
    </View>
  );
};

export const SettingsScreen = () => {
  const {data: config} = useConfig();
  const birdseyeEnabled = config?.birdseye?.enabled;

  return (
    <BaseView className="flex-1 px-4 py-2" isScrollview>
      <SettingRow>
        <SettingsLabel>Frigate URL</SettingsLabel>
        <SettingsTextInput placeholder={showIPOnly(API_BASE)} />
      </SettingRow>
      <SettingRow>
        <SettingsLabel>Birdseye Enabled</SettingsLabel>
        <Switch value={birdseyeEnabled} disabled />
      </SettingRow>
    </BaseView>
  );
};
