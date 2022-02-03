import * as React from 'react';
// view components
import { Card } from '@md-sw/shared/components/card';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// views
import { ContentWrapper, Description, Title, Wrapper } from '@md-shared/views/common';
// hooks
import { useDispatch, useSelector } from 'react-redux';
// store
import * as API from '@md-store/modules/api';
// utils
import { clientError } from '@md-shared/services/api';
// types
import { Starship } from '@md-shared/types/starship';
import { RootStore } from '@md-store/index';
import { ThunkDispatch } from '@md-store/helpers';

type ListItem = Pick<Starship, 'id' | 'name'> & { image: string };

const Starships = () => {
  // hooks
  const dispatch = useDispatch<ThunkDispatch>();

  // store
  const { data, error, loading } = useSelector<
    RootStore,
    Pick<RootStore['api']['starships']['getStarships'], 'data' | 'error' | 'loading'>
  >((state) => ({
    data: state.api.starships.getStarships.data,
    error: state.api.starships.getStarships.error,
    loading: state.api.starships.getStarships.loading
  }));

  // data transformation
  const starshipsList = React.useMemo<ListItem[] | undefined>(
    () =>
      data?.results?.map(({ name, uid }) => ({
        name,
        id: uid,
        image: '/static/images/starship.jpg'
      })),
    [data]
  );

  React.useEffect(() => {
    dispatch(API.starships.getStarships.performAPIGetStarships());
  }, [dispatch]);

  return (
    <ContentWrapper>
      <Title>CSR (Client-side Rendering)</Title>

      <Description>
        Client-side rendering (CSR) means rendering pages directly in the browser using JavaScript. All logic, data
        fetching, templating and routing are handled on the client rather than the server. To simplify, we get an empty
        or half empty HTML file (on the client side) and with the help of a JavaScript we fill it with content.
      </Description>

      <Title>When should I use CSR?</Title>

      <Description>
        Rendering on the client side should be used if you have elements on the page that should be rerender on any data
        change or on any events.
      </Description>

      <ContentLoader isLoading={loading} error={clientError(error)}>
        <Wrapper>
          {starshipsList?.map((starship) => (
            <Card key={starship.id} href='/redux/starships/[id]' as={`/redux/starships/${starship.id}`} {...starship} />
          ))}
        </Wrapper>
      </ContentLoader>
    </ContentWrapper>
  );
};

export { Starships };
