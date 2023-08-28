import {useQuery} from 'react-query';

import {API_BASE} from '@env';

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

const fetchAllTodos = async () => {
  try {
    const response = await fetch(API_BASE, {method: 'get'});
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

export const useAllTodos = () =>
  useQuery({
    queryFn: fetchAllTodos,
    queryKey: ['todos'],
  });
