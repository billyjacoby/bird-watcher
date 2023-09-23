import {ActivityIndicator, FlatList, View} from 'react-native';

import clsx from 'clsx';

import {CameraEvent} from './components';
import {useCameraEvents} from '@api';
import {BaseText, BaseView} from '@components';
import {useAppDataStore} from '@stores';
import {bgBackground} from '@utils';

const FooterComponent = ({length}: {length: number}) => (
  //? I don't know why but we get some layout shift and that requires adding this height value here
  <BaseView className="h-[250]">
    <BaseText className="text-center text-mutedForeground dark:text-mutedForeground-dark pt-2">
      Showing {length} event{length > 1 && 's'}.
    </BaseText>
  </BaseView>
);

export const EventsScreen = () => {
  const currentCamera = useAppDataStore(state => state.currentCamera);
  const {
    data: events,
    isLoading,
    error,
  } = useCameraEvents(
    {
      cameras: currentCamera || '',
      limit: '10',
    },
    {enabled: !!currentCamera},
  );

  if (isLoading) {
    return (
      <BaseView>
        <ActivityIndicator size={'large'} />
      </BaseView>
    );
  }

  if (error || !events || (!isLoading && !currentCamera)) {
    return (
      <BaseView>
        <BaseText className="text-red-800 text-lg">
          Error fetching events
        </BaseText>
      </BaseView>
    );
  }

  if (!events.length) {
    return (
      <BaseView isScrollview showsVerticalScrollIndicator={false}>
        <BaseText>No events found.</BaseText>
      </BaseView>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        className={clsx(bgBackground)}
        ListFooterComponent={<FooterComponent length={events.length} />}
        showsVerticalScrollIndicator={false}
        data={events}
        renderItem={({item: camEvent}) => (
          <CameraEvent camEvent={camEvent} key={camEvent.id} />
        )}
      />
      {/* // TODO: Get total event info and group by date. Add pagination heree */}
    </View>
  );
};
