import {Pressable} from 'react-native';

import PlayRect from '@icons/play-rect.svg';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import clsx from 'clsx';
import {getTimeZone} from 'react-native-localize';

import {useRecordingSummary} from '@api';
import {BaseText, BaseView, Label, LoadingView} from '@components';
import {API_BASE} from '@env';
import {useAppDataStore} from '@stores';

import {SectionDateHeader} from '../components';

const getRecordingUrl = (cameraName: string, dateTime: Date): string => {
  const dateString = `${dateTime.getFullYear()}-${
    dateTime.getMonth() + 1
  }/${dateTime.getDate()}/${dateTime.getHours()}`;
  return `${API_BASE}vod/${dateString}/${cameraName}/${getTimeZone().replace(
    '/',
    ',',
  )}/master.m3u8`;
};

const HourChip = ({
  numEvents,
  date,
  cameraName,
}: {
  numEvents: number;
  date: Date;
  cameraName: string;
}) => {
  const navigation = useNavigation();
  const hourString = date.getHours() + ':00';
  const vodUrl = getRecordingUrl(cameraName, date);
  const videoTitle = `${date.toLocaleDateString(undefined, {
    weekday: undefined,
  })} - ${hourString}`;

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Fullscreen Video', {
          videoURI: vodUrl,
          title: videoTitle,
        });
      }}>
      <Label
        className={clsx(
          'mx-1 my-2 justify-between p-2 items-center border border-transparent',
          numEvents > 0 && 'border-destructive dark:border-destructive-dark',
        )}>
        <BaseText className="mb-1">{hourString}</BaseText>
        <PlayRect className="h-8 w-8" fill={'white'} />
        <BaseText>{numEvents} Events</BaseText>
      </Label>
    </Pressable>
  );
};

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
