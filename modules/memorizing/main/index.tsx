import React from 'react';
// libs
import styled from 'styled-components';
// constants
import { TODO_LIST } from '@md-modules/memorizing/main/constants';
// components
import { Button } from '@md-ui/button';
import Todos from '@md-modules/memorizing/main/components/todos/main';
import TodosWithMemo from '@md-modules/memorizing/main/components/todos/with-memo';
// views
import { Title } from '@md-shared/views/common';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const TodoListWrapper = styled.div`
  display: flex;
`;

const MemorizingExample = () => {
  const [count, setCount] = React.useState(0);
  const [todos] = React.useState(TODO_LIST);

  const increment = () => setCount((c) => c + 1);

  return (
    <Wrapper>
      <Title>Count: {count}</Title>
      <Button onClick={increment}>+</Button>

      <TodoListWrapper>
        <Todos todos={todos} />
        <TodosWithMemo todos={todos} />
      </TodoListWrapper>
    </Wrapper>
  );
};

export default MemorizingExample;
