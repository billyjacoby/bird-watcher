import React from 'react';
import {
  Switch,
  TextInput,
  TextInputProps,
  TextProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

import clsx from 'clsx';

import {useConfig} from '@api';
import {BaseText, BaseView} from '@components';
import {API_BASE} from '@env';
import {useAppDataStore} from '@stores';
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
  // TODO: use something like react-hook-form here

  //? Current setting
  const {data: config} = useConfig();
  const birdseyeEnabled = config?.birdseye?.enabled;
  const currentEventsToLoad = useAppDataStore(state => state.eventsToLoad);
  const updateEventsToLoad = useAppDataStore(state => state.setEventsToLoad);

  //? Screen state
  const [canSave, setCanSave] = React.useState(false);
  const [eventsToLoad, setEventsToLoad] = React.useState(currentEventsToLoad);

  React.useEffect(() => {
    const eventsLoadHasChanged = eventsToLoad !== currentEventsToLoad;
    if (eventsLoadHasChanged) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [currentEventsToLoad, eventsToLoad]);

  const onEventsChange = (val: string) => {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) {
      setEventsToLoad(parsed);
    } else {
      //? Handle this a bit more gracefully
      setEventsToLoad(0);
    }
  };

  const onSavePress = () => {
    updateEventsToLoad(eventsToLoad);
  };

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
      <SettingRow>
        <SettingsLabel>Events to load</SettingsLabel>
        <SettingsTextInput
          value={eventsToLoad.toString()}
          onChangeText={onEventsChange}
          keyboardType="number-pad"
        />
      </SettingRow>
      <TouchableOpacity
        className="mb-2 mt-auto self-center"
        disabled={!canSave}
        onPress={onSavePress}>
        <BaseView
          className={clsx(
            'bg-accent dark:bg-accent-dark px-8 py-2 rounded-md',
            !canSave && 'opacity-50',
          )}>
          <BaseText className={clsx('text-lg')}>Save Changes</BaseText>
        </BaseView>
      </TouchableOpacity>
    </BaseView>
  );
};
