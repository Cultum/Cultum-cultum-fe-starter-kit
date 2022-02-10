import * as React from 'react';
// libs
import { useRouter } from 'next/router';
// utils
import { useQuery } from '@apollo/client';
import * as U from '@md-utils';
// types
import { ClientError } from '@md-utils/errors/custom';
import { GetStarship, GetStarshipResponse, GetStarshipVariables } from '@md-queries/starship/types';
// queries
import { GET_STARSHIP_QUERY } from '@md-queries/starship';

interface StarshipInfo {
  label: string;
  value: string | number;
}

interface Context {
  isLoading: boolean;
  starship?: GetStarship;
  starshipInfo: StarshipInfo[];
  error?: ClientError<string>;
  refetch: (variables?: Partial<GetStarshipVariables>) => Promise<ClientError<string> | GetStarship | undefined>;
}

const StarshipAPIContext = React.createContext<Context>({
  starshipInfo: [],
  isLoading: false,
  refetch: () => Promise.resolve({} as GetStarship)
});

const StarshipAPIContextProvider: React.FC = ({ children }) => {
  const { query } = useRouter();

  const { data, loading, error, refetch } = useQuery<GetStarshipResponse, GetStarshipVariables>(GET_STARSHIP_QUERY, {
    variables: { id: query.id as string },
    skip: !query.id
  });

  const refetchStarship = async (variables?: Partial<GetStarshipVariables>) => {
    try {
      const result = await refetch(variables);

      return result.data?.starship;
    } catch (error: any) {
      return U.errors.parseGQLAndCreateClientError(error);
    }
  };

  const starshipInfo = React.useMemo<StarshipInfo[]>(() => {
    if (!data?.starship) {
      return [];
    }

    return [
      { label: 'Name', value: data?.starship.name ?? 'N/A' },
      { label: 'Model', value: data?.starship.model ?? 'N/A' },
      { label: 'Cost In Credits', value: data?.starship.costInCredits ?? 'N/A' },
      { label: 'Hyperdrive Rating', value: data?.starship.hyperdriveRating ?? 'N/A' },
      { label: 'Passengers', value: data?.starship.passengers ?? 'N/A' }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof data?.starship === 'undefined']);

  return (
    <StarshipAPIContext.Provider
      value={{
        starshipInfo,
        isLoading: loading,
        refetch: refetchStarship,
        starship: data && data.starship,
        error: error && U.errors.parseGQLAndCreateClientError(error)
      }}
    >
      {children}
    </StarshipAPIContext.Provider>
  );
};

export { StarshipAPIContextProvider, StarshipAPIContext };
