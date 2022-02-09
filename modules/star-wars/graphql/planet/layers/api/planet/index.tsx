import * as React from 'react';
// libs
import { useRouter } from 'next/router';
// utils
import { useQuery } from '@apollo/client';
import * as U from '@md-utils';
// types
import { ClientError } from '@md-utils/errors/custom';
import { GetPlanetResponse, GetPlanetVariables, Planet } from '@md-queries/planet/types';
// queries
import { GET_PLANET_QUERY } from '@md-queries/planet';

interface PlanetInfo {
  label: string;
  value: string | number;
}

interface Context {
  planet?: Planet;
  isLoading: boolean;
  planetInfo: PlanetInfo[];
  error?: ClientError<string>;
  refetch: (variables?: Partial<GetPlanetVariables>) => Promise<ClientError<string> | Planet | undefined>;
}

const PlanetAPIContext = React.createContext<Context>({
  planetInfo: [],
  isLoading: false,
  refetch: () => Promise.resolve({} as Planet)
});

const PlanetAPIContextProvider: React.FC = ({ children }) => {
  const { query } = useRouter();

  const { data, loading, error, refetch } = useQuery<GetPlanetResponse, GetPlanetVariables>(GET_PLANET_QUERY, {
    variables: { id: query.id as string },
    skip: !query.id
  });

  const refetchPlanet = async (variables?: Partial<GetPlanetVariables>) => {
    try {
      const result = await refetch(variables);

      return result.data?.planet;
    } catch (error: any) {
      return U.errors.parseGQLAndCreateClientError(error);
    }
  };

  const planetInfo = React.useMemo<PlanetInfo[]>(() => {
    if (!data?.planet) {
      return [];
    }

    return [
      { label: 'Diameter', value: data?.planet.diameter ?? 'N/A' },
      { label: 'Gravity', value: data?.planet.gravity ?? 'N/A' },
      { label: 'Orbital Period', value: data?.planet.orbitalPeriod ?? 'N/A' },
      { label: 'Population', value: data?.planet.population ?? 'N/A' }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof data?.planet === 'undefined']);

  return (
    <PlanetAPIContext.Provider
      value={{
        planetInfo,
        isLoading: loading,
        refetch: refetchPlanet,
        planet: data ? data.planet : undefined,
        error: error ? U.errors.parseGQLAndCreateClientError(error) : undefined
      }}
    >
      {children}
    </PlanetAPIContext.Provider>
  );
};

export { PlanetAPIContextProvider, PlanetAPIContext };
