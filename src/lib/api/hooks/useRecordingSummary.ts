import {getTimeZone} from 'react-native-localize';
import {useQuery} from 'react-query';

import {API_BASE} from '@env';

import {RecordingResponse} from '../types/recordings';

const URL = `${API_BASE}api/:camera/recordings/summary?timezone=:tz`;

const fetchRecordingSummary = async (cameraName: string) => {
  const url = URL.replace(':camera', cameraName).replace(':tz', getTimeZone());
  try {
    const response = await fetch(url, {method: 'get'});
    const data = await response.json();
    if (response.ok) {
      if (data) {
        return Promise.resolve(data as RecordingResponse[]);
      }
    } else {
      return Promise.reject(new Error('ResNotOK'));
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const useRecordingSummary = (cameraName?: string) => {
  return useQuery({
    queryFn: () => fetchRecordingSummary(cameraName || ''),
    queryKey: ['recordings', cameraName],
    enabled: !!cameraName,
  });
};
