import {useQuery} from 'react-query';

import {API_BASE} from '@env';

// const buildEventUrl = (eventId: string) => {
//   const REC_URL = `${API_BASE}vod/event/${eventId}/index.m3u8`;
//   return REC_URL;
// };

const URL = `${API_BASE}api/:camera/recordings`;

const fetchRecordings = async (cameraName: string) => {
  const url = URL.replace(':camera', cameraName);
  try {
    const response = await fetch(url, {method: 'get'});
    const data = await response.json();
    if (response.ok) {
      if (data) {
        return Promise.resolve(data);
      }
    } else {
      return Promise.reject(new Error('ResNotOK'));
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const useRecordings = (cameraName?: string) =>
  useQuery({
    queryFn: () => fetchRecordings(cameraName || ''),
    queryKey: ['recordings', cameraName],
    enabled: !!cameraName,
  });
