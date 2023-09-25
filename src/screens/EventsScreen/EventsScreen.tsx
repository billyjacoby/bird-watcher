import React from 'react';
import {
  ActivityIndicator,
  LayoutAnimation,
  SectionList,
  View,
} from 'react-native';

import clsx from 'clsx';

import {CameraEvent} from './components';
import {FrigateEvent, useCameraEvents} from '@api';
import {BaseText, BaseView} from '@components';
import {useAppDataStore} from '@stores';
import {bgBackground} from '@utils';

import {SectionDateHeader} from './components/SectionDateHeader';

const FooterComponent = ({length}: {length?: number}) => {
  return (
    //? I don't know why but we get some layout shift and that requires adding this height value here
    <BaseView className="">
      {!!length && (
        <BaseText className="text-center text-mutedForeground dark:text-mutedForeground-dark pt-2">
          Showing {length} event{length > 1 && 's'}.
        </BaseText>
      )}
    </BaseView>
  );
};

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

  const [collapsedSections, setCollapsedSections] = React.useState(new Set());

  //? PERF: I could see this getting real expensive with more events. Consider moving into a RQ Select function?
  const groupedEvents = React.useMemo(
    () =>
      events?.reduce<{title: string; data: FrigateEvent[]}[]>((acc, evt) => {
        const evtDate = new Date(evt.start_time * 1000).toLocaleDateString();
        const prevEventsIdx = acc.findIndex(grp => grp.title === evtDate);
        const prevEvents = acc[prevEventsIdx]?.data;
        if (prevEventsIdx > -1 && prevEvents?.length) {
          acc[prevEventsIdx] = {title: evtDate, data: [...prevEvents, evt]};
        } else {
          acc.push({title: evtDate, data: [evt]});
        }
        return acc;
      }, []),
    [events],
  );

  const handleHeaderPress = (title: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newCollapsed = new Set(collapsedSections);
    if (collapsedSections.has(title)) {
      newCollapsed.delete(title);
    } else {
      newCollapsed.add(title);
    }
    setCollapsedSections(newCollapsed);
  };

  if (isLoading) {
    return (
      <BaseView>
        <ActivityIndicator size={'large'} />
      </BaseView>
    );
  }

  if (error || !groupedEvents || (!isLoading && !currentCamera)) {
    return (
      <BaseView>
        <BaseText className="text-red-800 text-lg">
          Error fetching events
        </BaseText>
      </BaseView>
    );
  }

  if (!groupedEvents?.length) {
    return (
      <BaseView isScrollview showsVerticalScrollIndicator={false}>
        <BaseText>No events found.</BaseText>
      </BaseView>
    );
  }

  return (
    <View className="flex-1">
      <SectionList
        className={clsx(bgBackground)}
        extraData={collapsedSections}
        keyExtractor={(item, index) => item.id + index}
        ListFooterComponent={<FooterComponent length={events?.length} />}
        showsVerticalScrollIndicator={false}
        sections={groupedEvents}
        renderSectionHeader={props => (
          <SectionDateHeader
            {...props}
            handleHeaderPress={handleHeaderPress}
            isCollapsed={collapsedSections.has(props.section.title)}
          />
        )}
        renderItem={({item: camEvent, index, section}) => {
          if (collapsedSections.has(section.title)) {
            return null;
          }
          return (
            <CameraEvent
              camEvent={camEvent}
              key={camEvent.id}
              isFirst={index === 0}
            />
          );
        }}
      />
      {/* // TODO: Get total event info and group by date. Add pagination heree */}
    </View>
  );
};
