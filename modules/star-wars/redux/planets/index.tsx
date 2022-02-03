import * as React from 'react';
// view components
import { Card } from '@md-sw/shared/components/card';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// views
import { ContentWrapper, Description, Title, Wrapper } from '@md-shared/views/common';
// hooks
import { useSelector } from 'react-redux';
// types
import { Planet } from '@md-shared/types/planet';
import { RootStore } from '@md-store/index';
// utils
import { clientError } from '@md-shared/services/api';

type ListItem = Pick<Planet, 'id' | 'name'> & { image: string };

const Planets = () => {
  // store
  const { data, error, loading } = useSelector<
    RootStore,
    Pick<RootStore['api']['planets']['getPlanets'], 'data' | 'error' | 'loading'>
  >((state) => ({
    data: state.api.planets.getPlanets.data,
    error: state.api.planets.getPlanets.error,
    loading: state.api.planets.getPlanets.loading
  }));

  // data transformation
  const planetsList = React.useMemo<ListItem[] | undefined>(
    () =>
      data?.results?.map(({ name, uid }) => ({
        name,
        id: uid,
        image: '/static/images/planet.png'
      })),
    [data]
  );

  return (
    <ContentWrapper>
      <Title>SSR (Server-side Rendering)</Title>

      <Description>
        If a page uses Server-side Rendering, the page HTML is generated on each request. To simplify, with each change,
        a fully assembled HTML file comes from the server.
      </Description>

      <ContentLoader isLoading={loading} error={clientError(error)}>
        <Wrapper>
          {planetsList?.map((planet) => (
            <Card key={planet.id} href='/redux/planets/[id]' as={`/redux/planets/${planet.id}`} {...planet} />
          ))}
        </Wrapper>
      </ContentLoader>
    </ContentWrapper>
  );
};

export { Planets };
