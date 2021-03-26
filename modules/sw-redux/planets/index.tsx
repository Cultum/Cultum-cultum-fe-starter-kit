import * as React from 'react';
// view components
import { Card } from './compoonents/card';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// views
import { ContentWrapper, Wrapper } from '@md-shared/views/common';
// hooks
import { useSelector } from 'react-redux';
// types
import { Planet } from '@md-shared/types/planet';
import { RootStore } from '@md-store/index';
import { clientError } from '@md-shared/services/api';

type ListItem = Pick<Planet, 'id' | 'name'>;

const Planets = () => {
  const { data, error, loading } = useSelector<
    RootStore,
    Pick<RootStore['api']['planets'], 'data' | 'error' | 'loading'>
  >((state) => ({
    data: state.api.planets.data,
    error: state.api.planets.error,
    loading: state.api.planets.loading
  }));

  const planetsList = React.useMemo<ListItem[] | undefined>(
    () =>
      data?.results?.map(({ name, uid }) => ({
        id: uid,
        name
      })),
    [data]
  );

  return (
    <ContentWrapper>
      <ContentLoader isLoading={loading} error={clientError(error)}>
        <Wrapper>
          {planetsList?.map((planet) => (
            <Card key={planet.id} name={planet.name} id={planet.id} />
          ))}
        </Wrapper>
      </ContentLoader>
    </ContentWrapper>
  );
};

export { Planets };
