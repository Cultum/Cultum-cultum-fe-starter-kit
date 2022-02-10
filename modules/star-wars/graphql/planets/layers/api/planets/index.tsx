import * as React from 'react';
// libs
import { useQuery } from '@apollo/client';
// utils
import * as U from '@md-utils';
// types
import { GetPlanetsResponse, GetPlanetsVariables, Planet, Planets } from '@md-queries/planets/types';
import { ClientError } from '@md-utils/errors/custom';
// queries
import { GET_PLANETS_QUERY } from '@md-queries/planets';

type PlanetsList = Planet & { image: string };

interface Context {
  isLoading: boolean;
  planets: PlanetsList[];
  error?: ClientError<string>;
  refetch: (variables?: Partial<GetPlanetsVariables>) => Promise<ClientError<string> | Planets>;
}

const PlanetsAPIContext = React.createContext<Context>({
  planets: [],
  isLoading: false,
  refetch: () => Promise.resolve([] as Planets)
});

const PlanetsAPIContextProvider: React.FC = ({ children }) => {
  // make api call here
  const { data, loading, refetch, error } = useQuery<GetPlanetsResponse, GetPlanetsVariables>(GET_PLANETS_QUERY, {
    variables: { first: 5 }
  });

  const refetchPlanets = async (variables?: Partial<GetPlanetsVariables>) => {
    try {
      const result = await refetch(variables);

      return result.data ? result.data.allPlanets.planets : [];
    } catch (error: any) {
      return U.errors.parseGQLAndCreateClientError(error);
    }
  };

  const planets = React.useMemo<PlanetsList[]>(() => {
    return (
      data?.allPlanets.planets.map(({ id, name }) => ({
        id,
        name,
        image: '/static/images/planet.png'
      })) || []
    );
  }, [data?.allPlanets.planets]);

  return (
    <PlanetsAPIContext.Provider
      value={{
        planets,
        isLoading: loading,
        refetch: refetchPlanets,
        error: error && U.errors.parseGQLAndCreateClientError(error)
      }}
    >
      {children}
    </PlanetsAPIContext.Provider>
  );
};

export { PlanetsAPIContextProvider, PlanetsAPIContext };
