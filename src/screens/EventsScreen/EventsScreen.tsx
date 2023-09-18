import {ActivityIndicator} from 'react-native';

import {CameraEvent} from './components';
import {useCameraEvents} from '@api';
import {BaseText, BaseView} from '@components';
import {useAppDataStore} from '@stores';

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
    <BaseView isScrollview showsVerticalScrollIndicator={false}>
      {events.map(camEvent => {
        return <CameraEvent camEvent={camEvent} key={camEvent.id} />;
      })}
      {/* // TODO: Get total event info and group by date. Add pagination heree */}
      <BaseText className="text-center text-mutedForeground dark:text-mutedForeground-dark">
        Showing {events.length} event{events.length > 1 && 's'}.
      </BaseText>
    </BaseView>
  );
};
