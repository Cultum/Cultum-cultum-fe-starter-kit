import * as React from 'react';
// libs
import { useRouter } from 'next/router';
// utils
import { useQuery } from '@apollo/client';
import * as U from '@md-utils';
// types
import { ClientError } from '@md-utils/errors/custom';
import { GetPerson, GetPersonResponse, GetPersonVariables } from '@md-queries/person/types';
// queries
import { GET_PERSON_QUERY } from '@md-queries/person';

interface PersonInfo {
  label: string;
  value: string;
}

interface Context {
  person?: GetPerson;
  isLoading: boolean;
  personInfo: PersonInfo[];
  error?: ClientError<string>;
  refetch: (variables?: Partial<GetPersonVariables>) => Promise<ClientError<string> | GetPerson | undefined>;
}

const PersonAPIContext = React.createContext<Context>({
  personInfo: [],
  isLoading: false,
  refetch: () => Promise.resolve({} as GetPerson)
});

const PersonAPIContextProvider: React.FC = ({ children }) => {
  const { query } = useRouter();

  const { data, loading, error, refetch } = useQuery<GetPersonResponse, GetPersonVariables>(GET_PERSON_QUERY, {
    variables: { id: query.id as string },
    skip: !query.id
  });

  const refetchPerson = async (variables?: Partial<GetPersonVariables>) => {
    try {
      const result = await refetch(variables);

      return result.data?.person;
    } catch (error: any) {
      return U.errors.parseGQLAndCreateClientError(error);
    }
  };

  const personInfo = React.useMemo<PersonInfo[]>(() => {
    if (!data?.person) {
      return [];
    }

    return [
      { label: 'Gender', value: data?.person.gender ?? 'N/A' },
      { label: 'Hair Color', value: data?.person.hairColor ?? 'N/A' },
      { label: 'Eye Color', value: data?.person.eyeColor ?? 'N/A' },
      { label: 'Birth Year', value: data?.person.birthYear ?? 'N/A' }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof data?.person === 'undefined']);

  return (
    <PersonAPIContext.Provider
      value={{
        personInfo,
        isLoading: loading,
        person: data ? data.person : undefined,
        error: error ? U.errors.parseGQLAndCreateClientError(error) : undefined,
        refetch: refetchPerson
      }}
    >
      {children}
    </PersonAPIContext.Provider>
  );
};

export { PersonAPIContextProvider, PersonAPIContext };
