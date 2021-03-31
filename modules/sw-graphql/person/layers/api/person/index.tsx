import * as React from 'react';
// utils
import { useQuery } from '@apollo/client';
import * as U from '@md-utils';
// types
import { GetPerson, GetPersonResponse, GetPersonVariables } from '@md-sw-person/queries/person/types';
import { ClientError } from '@md-utils/errors/custom';
// mock
import { GET_PERSON_QUERY } from '@md-sw-person/queries/person';

interface Context {
  person?: GetPerson;
  isLoading: boolean;
  error?: ClientError<string>;
  refetch: (variables?: Partial<GetPersonVariables>) => Promise<ClientError<string> | GetPerson | undefined>;
}

const PersonAPIContext = React.createContext<Context>({
  person: undefined,
  isLoading: false,
  error: undefined,
  refetch: () => Promise.resolve({} as GetPerson)
});

interface Props {
  id: string;
}

const PersonAPIContextProvider: React.FC<Props> = ({ children, id }) => {
  const { data, loading, error, refetch } = useQuery<GetPersonResponse, GetPersonVariables>(GET_PERSON_QUERY, {
    variables: { id },
    skip: !id
  });

  const refetchPerson = async (variables?: Partial<GetPersonVariables>) => {
    try {
      const result = await refetch(variables);

      return result.data?.person;
    } catch (error) {
      return U.errors.parseAndCreateClientError(error);
    }
  };

  return (
    <PersonAPIContext.Provider
      value={{
        person: data ? data.person : undefined,
        isLoading: loading,
        error: error ? U.errors.parseAndCreateClientError(error) : undefined,
        refetch: refetchPerson
      }}
    >
      {children}
    </PersonAPIContext.Provider>
  );
};

export { PersonAPIContextProvider, PersonAPIContext };
