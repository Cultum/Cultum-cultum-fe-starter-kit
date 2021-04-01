import * as React from 'react';
// libs
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// utils
import { useQuery } from '@apollo/client';
import * as U from '@md-utils';
// types
import { ClientError } from '@md-utils/errors/custom';
import { GetPerson, GetPersonResponse, GetPersonVariables } from '@md-queries/person/types';
import { RootStore } from '@md-store/index';
// queries
import { GET_PERSON_QUERY } from '@md-queries/person';

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

const PersonAPIContextProvider: React.FC = ({ children }) => {
  const { query } = useRouter();
  const { modalData } = useSelector<RootStore, RootStore['ui']['modal']>((state) => state.ui.modal);

  const { data, loading, error, refetch } = useQuery<GetPersonResponse, GetPersonVariables>(GET_PERSON_QUERY, {
    variables: {
      id: (modalData.id as string) || (query.id as string)
    },
    skip: !modalData.id && !query.id
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
