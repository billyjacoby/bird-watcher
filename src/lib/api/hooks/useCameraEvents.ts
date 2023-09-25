import {useInfiniteQuery, UseInfiniteQueryOptions} from 'react-query';

import {API_BASE} from '@env';
import {DEFAULT_EVENTS_TO_LOAD} from '@utils';

import {
  CameraEventParams,
  FrigateEvent,
  SnapshotQueryParams,
} from '../types/events';

const URL = `${API_BASE}api/events`;

const buildSnapshotURL = (
  eventId: string,
  queryParams?: SnapshotQueryParams,
) => {
  let params: URLSearchParams | undefined;
  let url = URL + `/${eventId}/snapshot.jpg`;
  if (queryParams) {
    params = new URLSearchParams(queryParams as Record<string, string>);
    url = url + '?' + params;
  }
  return url;
};

const buildEventUrl = (eventId: string) => {
  const VOD_URL = `${API_BASE}vod/event/${eventId}/index.m3u8`;
  return VOD_URL;
};

const fetchEvents = async (
  beforeEpoch?: number,
  queryParams?: CameraEventParams,
  snapShotQueryParams?: SnapshotQueryParams,
) => {
  let params: URLSearchParams | undefined;
  const limit = parseInt(
    queryParams?.limit || DEFAULT_EVENTS_TO_LOAD.toString(),
    10,
  );
  if (queryParams) {
    if (typeof queryParams.before === 'undefined' && beforeEpoch) {
      queryParams.before = beforeEpoch?.toString();
    }
    params = new URLSearchParams(queryParams as Record<string, string>);
  }

  const url = params ? URL + '?' + params : URL;
  try {
    const response = await fetch(url, {method: 'get'});
    const data = await response.json();
    if (response.ok) {
      if (data) {
        const returnData: FrigateEvent[] = [];
        for (const event of data) {
          const enrichedEvent: FrigateEvent = {...event};

          const vodURL = buildEventUrl(event.id);
          enrichedEvent.vodURL = vodURL;
          if (event.has_snapshot) {
            const snapshotURL = buildSnapshotURL(event.id, snapShotQueryParams);
            enrichedEvent.snapshotURL = snapshotURL;
            returnData.push(enrichedEvent);
          } else {
            returnData.push(enrichedEvent);
          }
        }
        let pageParam: number | undefined;
        if (returnData?.length === limit) {
          /**
           * ! There's an edge case here where the number of items is divisible
           * by the limit, which means there won't actually be a next page but we
           * think that there is.
           */

          pageParam = returnData[limit - 1]?.start_time;
        }
        return Promise.resolve({events: returnData, pageParam});
      }
    } else {
      return Promise.reject(new Error('ResNotOK'));
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const useCameraEvents = (
  params: CameraEventParams,
  options?: Omit<
    UseInfiniteQueryOptions<
      {events: FrigateEvent[]; pageParam?: number},
      unknown,
      {events: FrigateEvent[]; pageParam?: number},
      any
    >,
    'queryFn'
  >,
) => {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => fetchEvents(pageParam, params),
    queryKey: ['EVENTS', params],
    getNextPageParam: lastPage => {
      return lastPage?.pageParam;
    },
    ...options,
  });
};
