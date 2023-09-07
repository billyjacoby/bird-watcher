import {useQuery} from 'react-query';

import {API_BASE} from '@env';

interface Config {
  cameras: object[];
}

const URL = `${API_BASE}/config`;
const fetchConfig = async () => {
  try {
    const response = await fetch(URL, {method: 'get'});
    const data = await response.json();
    if (response.ok) {
      if (data) {
        return Promise.resolve(data as Config);
      }
    } else {
      return Promise.reject(new Error('ResNotOK'));
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const useConfig = () =>
  useQuery({
    queryFn: fetchConfig,
    queryKey: ['config'],
  });
