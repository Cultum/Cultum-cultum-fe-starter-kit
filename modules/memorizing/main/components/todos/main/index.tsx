import React from 'react';
// types
import { Todo } from '@md-modules/memorizing/main/constants';
// components
import TodoItem from '@md-modules/memorizing/main/components/todos/components/todo-item';
// views
import { Title, Description } from '@md-shared/views/common';
import { Wrapper, ListWrapper } from '@md-modules/memorizing/main/components/todos/main/views';

interface Props {
  todos: Todo[];
}

const Todos: React.FC<Props> = ({ todos }) => {
  const renderLogs = React.useRef<string[]>([]);

  renderLogs.current = [...renderLogs.current, 'Render'];

  return (
    <Wrapper>
      <Title>My Todos</Title>

      {todos.map((todo) => (
        <TodoItem key={todo.id} name={todo.name} isDone={todo.isDone} />
      ))}

      <hr />
      <Title yellowColor>Render logs</Title>

      <ListWrapper>
        {!!renderLogs.current.length &&
          renderLogs.current.map((item, index) => <Description key={index}>{item} </Description>)}
      </ListWrapper>
    </Wrapper>
  );
};

export default Todos;
