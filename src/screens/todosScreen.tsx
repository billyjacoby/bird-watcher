import {ActivityIndicator} from 'react-native';

import {BaseText, BaseView} from '@components';
import {useAllTodos} from '@hooks';

export const TodosScreen = () => {
  const {data, isLoading, error} = useAllTodos();

  if (isLoading) {
    return (
      <BaseView>
        <ActivityIndicator size={'large'} />
      </BaseView>
    );
  }

  if (error || (!isLoading && !data)) {
    return (
      <BaseView>
        <BaseText className="text-red-800 text-lg">
          Error fetching todos
        </BaseText>
      </BaseView>
    );
  }

  return (
    <BaseView>
      {data?.map(todo => (
        <BaseText key={todo.id}>{todo.todo}</BaseText>
      ))}
    </BaseView>
  );
};
