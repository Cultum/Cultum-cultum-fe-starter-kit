import * as React from 'react';
// libs
import { useQuery } from '@apollo/client';
// utils
import * as U from '@md-utils';
// types
import { ClientError } from '@md-utils/errors/custom';
import { GetPeopleResponse, GetPeopleVariables, GetPerson, People } from '@md-queries/people/types';
// queries
import { GET_PEOPLE_QUERY } from '@md-queries/people';

type PersonItem = Pick<GetPerson, 'id' | 'name'> & { image: string };

interface Context {
  people: PersonItem[];
  isLoading: boolean;
  error?: ClientError<string>;
  refetch: (variables?: Partial<GetPeopleVariables>) => Promise<ClientError<string> | People>;
}

const PeopleAPIContext = React.createContext<Context>({
  people: [],
  isLoading: false,
  refetch: () => Promise.resolve([] as People)
});

const PeopleAPIContextProvider: React.FC = ({ children }) => {
  // make api call here
  const { data, loading, refetch, error } = useQuery<GetPeopleResponse, GetPeopleVariables>(GET_PEOPLE_QUERY, {
    variables: { first: 5 }
  });

  const refetchPeople = async (variables?: Partial<GetPeopleVariables>) => {
    try {
      const result = await refetch(variables);

      return result.data ? result.data.allPeople.people : [];
    } catch (error: any) {
      return U.errors.parseGQLAndCreateClientError(error);
    }
  };

  const people = React.useMemo<PersonItem[]>(
    () =>
      data?.allPeople.people.map(({ id, name }) => ({
        id,
        name,
        image: '/static/images/Ben-Kenobi.jpg'
      })) || [],
    [data?.allPeople.people]
  );

  return (
    <PeopleAPIContext.Provider
      value={{
        people,
        isLoading: loading,
        refetch: refetchPeople,
        error: error ? U.errors.parseGQLAndCreateClientError(error) : undefined
      }}
    >
      {children}
    </PeopleAPIContext.Provider>
  );
};

export { PeopleAPIContextProvider, PeopleAPIContext };
