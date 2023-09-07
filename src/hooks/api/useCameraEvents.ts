import {useQuery} from 'react-query';

import {API_BASE} from '@env';

const URL = `${API_BASE}/events`;

interface FrigateEvent {
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

const fetchEvents = async (queryParams?: CameraEventParams) => {
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
        return Promise.resolve(data as FrigateEvent[]);
      }
    } else {
      return Promise.reject(new Error('ResNotOK'));
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const useCameraEvents = (params: CameraEventParams) => {
  return useQuery({
    queryFn: () => fetchEvents(params),
    queryKey: ['EVENTS', params],
  });
};
