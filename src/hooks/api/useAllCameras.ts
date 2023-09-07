//TODO
import {useQuery} from 'react-query';

import {API_BASE} from '@env';
import {useConfig} from '@hooks';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const fetchAllCameras = async (cameraNames: string[]) => {
  try {
    const response = await fetch(`${API_BASE}/`, {method: 'get'});
    const data = await response.json();
    if (response.ok) {
      if (data.todos) {
        return Promise.resolve(data.todos as Todo[]);
      }
    } else {
      return Promise.reject(new Error('ResNotOK'));
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const useAllCameras = () => {
  const {data: config} = useConfig();

  const cameraNames = Object.keys(config?.cameras || {});

  return useQuery({
    queryFn: () => fetchAllCameras(cameraNames),
    queryKey: ['cameras'],
    enabled: !!cameraNames?.length,
  });
};
