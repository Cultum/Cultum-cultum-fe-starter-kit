export interface Todo {
  id: string;
  name: string;
  isDone: boolean;
}

export const TODO_LIST: Todo[] = [
  { id: '1', name: 'Read Next.js docs', isDone: true },
  { id: '2', name: 'Read GraphQL docs', isDone: false },
  { id: '3', name: 'Read styled-components docs', isDone: true },
  { id: '4', name: 'Read TypeScript docs', isDone: false }
];
