import {useQuery, UseQueryOptions} from 'react-query';

import {API_BASE} from '@env';

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
  queryParams?: CameraEventParams,
  snapShotQueryParams?: SnapshotQueryParams,
) => {
  let params: URLSearchParams | undefined;
  if (queryParams) {
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
        return Promise.resolve(returnData);
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
    UseQueryOptions<unknown, unknown, FrigateEvent[], any>,
    'queryFn'
  >,
) => {
  return useQuery({
    queryFn: () => fetchEvents(params),
    queryKey: ['EVENTS', params],
    ...options,
  });
};
