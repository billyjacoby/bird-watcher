import {ViewProps} from 'react-native';

import {FrigateEvent} from '@api';
import {BaseText, BaseView} from '@components';
import {toTitleCase} from '@utils';

const Row = (props: ViewProps) => (
  <BaseView
    className="flex-row justify-between mx-6 px-2 py-1 rounded-sm my-[2px] border border-accent dark:border-accent-dark"
    {...props}
  />
);

export const EventDetails = ({camEvent}: {camEvent: FrigateEvent}) => {
  const startDate = new Date(camEvent.start_time * 1000);
  const endDate = new Date(camEvent.end_time * 1000);
  // TODO: format minutes here too.
  const eventDuration = Math.round(camEvent.end_time - camEvent.start_time);

  const endTimeValue =
    endDate.getFullYear() === 1970
      ? 'Current'
      : endDate.toLocaleDateString() + ' @ ' + endDate.toLocaleTimeString();

  const durationValue =
    eventDuration < 0 ? 'Ongoing' : eventDuration + ' seconds';

  return (
    <BaseView className="flex-1">
      <BaseText className="self-center text-lg mb-1">Event Details</BaseText>
      <Row>
        <BaseText>Start Time</BaseText>
        <BaseText>
          {startDate.toLocaleDateString() +
            ' @ ' +
            startDate.toLocaleTimeString()}
        </BaseText>
      </Row>
      <Row>
        <BaseText>End Time</BaseText>
        <BaseText>{endTimeValue}</BaseText>
      </Row>
      <Row>
        <BaseText>Event Duration</BaseText>
        <BaseText>{durationValue}</BaseText>
      </Row>
      <Row>
        <BaseText>Object Label</BaseText>
        <BaseText>{toTitleCase(camEvent.label)}</BaseText>
      </Row>
      <Row>
        <BaseText>Confidence</BaseText>
        <BaseText>{Math.round(camEvent.top_score * 10000) / 100}%</BaseText>
      </Row>
      {!!camEvent?.zones?.length && (
        <Row>
          <BaseText>Zones</BaseText>
          <BaseText>LABEL</BaseText>
        </Row>
      )}
      {!!camEvent.region && (
        <Row>
          <BaseText>Region</BaseText>
          <BaseText>LABEL</BaseText>
        </Row>
      )}
    </BaseView>
  );
};
