import React from 'react';
// libs
import styled from 'styled-components';
// views
import { Description } from '@md-shared/views/common';

interface Props {
  name: string;
  isDone: boolean;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TodoItem: React.FC<Props> = ({ name, isDone }) => (
  <Wrapper>
    <Description>{name}</Description>

    <input type='checkbox' checked={isDone} />
  </Wrapper>
);

export default TodoItem;
