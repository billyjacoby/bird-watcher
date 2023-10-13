import {FlashList} from '@shopify/flash-list';

import {HourChip} from './components';
import {useRecordingSummary} from '@api';
import {BaseView, LoadingView} from '@components';
import {useAppDataStore} from '@stores';

import {SectionDateHeader} from '../components';

export const RecordingsScreen = () => {
  const currentCamera = useAppDataStore(state => state.currentCamera);
  const {data, isLoading} = useRecordingSummary(currentCamera);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <BaseView className="flex-1">
      <BaseView isScrollview>
        <FlashList
          estimatedItemSize={288}
          data={data}
          renderItem={({item: recording}) => {
            const date = new Date(recording.day);
            const tzOffsetMinutes = date.getTimezoneOffset();

            date.setUTCMinutes(tzOffsetMinutes);
            const dateString = date.toLocaleDateString();

            return (
              <BaseView key={recording.day}>
                <SectionDateHeader title={dateString} />
                <FlashList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  estimatedItemSize={147}
                  data={recording.hours}
                  renderItem={({item: hour}) => {
                    const hourlyDate = new Date(date);
                    hourlyDate.setHours(parseInt(hour.hour, 10));
                    return (
                      <HourChip
                        cameraName={currentCamera || ''}
                        key={hour.hour}
                        numEvents={hour.events}
                        date={hourlyDate}
                      />
                    );
                  }}
                />
              </BaseView>
            );
          }}
        />
      </BaseView>
    </BaseView>
  );
};
