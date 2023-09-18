import {useQuery, UseQueryOptions} from 'react-query';

import {API_BASE} from '@env';

const URL = `${API_BASE}api/events`;

export interface FrigateEvent {
  //? Unsure what the non null types should be here
  area: null | any;
  box: null | any;
  plus_id: null | any;
  false_positive: null | any;
  ratio: null | any;
  camera: string;
  end_time: number;
  has_clip: boolean;
  has_snapshot: boolean;
  id: string;
  label: string;
  region: null | string;
  retain_indefinitely: boolean;
  start_time: number;
  sub_label: null | string;
  thumbnail: string;
  top_score: number;
  snapshotURL?: string;
}

interface CameraEventParams extends Record<string, string | undefined> {
  before?: string;
  after?: string;
  cameras?: string;
  labels?: string;
  zones?: string;
  limit?: string;
  has_snapshot?: string;
  has_clip?: string;
  include_thumbnails?: string;
  in_progress?: string;
}

interface SnapshotQueryParams extends Record<string, string | undefined> {
  h?: string;
  bbox?: string;
  timestamp?: string;
  crop?: string;
  quality?: string;
}

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
          if (event.has_snapshot) {
            const snapshotURL = buildSnapshotURL(event.id, snapShotQueryParams);
            returnData.push({...event, snapshotURL});
          } else {
            returnData.push(event);
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
