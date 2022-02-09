import { ApolloError } from '@apollo/client';
import flow from 'lodash/flow';
import * as E from './custom';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

// GraphQL
export function handleGraphqlErrorMsg(error: Error | ApolloError): string {
  if ('graphQLErrors' in error && error.graphQLErrors && error.graphQLErrors.length) {
    return error.graphQLErrors.map(({ message }: { message: string }) => message).join('. ');
  } else if ('message' in error && error.message) {
    return error.message;
  }

  return 'Unexpected Error';
}

export const parseGQLAndCreateClientError = flow(handleGraphqlErrorMsg, E.clientError);

// RTK Query
export function handleRTKQueryErrorMsg(error: SerializedError | FetchBaseQueryError): string {
  if ('error' in error && error.error) {
    return error.error;
  } else if ('message' in error && error.message) {
    return error.message;
  }

  return 'Unexpected Error';
}

export const parseRTKQAndCreateClientError = flow(handleRTKQueryErrorMsg, E.clientError);
