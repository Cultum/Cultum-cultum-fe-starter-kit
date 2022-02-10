import * as React from 'react';
// view components
import { Card } from '@md-sw/shared/components/card';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// views
import { ContentWrapper, Description, Title, Wrapper } from '@md-shared/views/common';
// api
import { starshipsAPI } from '@md-toolkit-store/services/starships/get-starships-api';
// utils
import * as U from '@md-utils';
// types
import { Starship } from '@md-shared/types/starship';

type ListItem = Pick<Starship, 'id' | 'name'> & { image: string };

const StarshipsToolkit = () => {
  // api
  const { data, error, isLoading } = starshipsAPI.useGetStarshipsQuery(null);

  const clientError = error && U.errors.parseRTKQAndCreateClientError(error);

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

      <ContentLoader isLoading={isLoading} error={clientError}>
        <Wrapper>
          {starshipsList?.map((starship) => (
            <Card
              key={starship.id}
              href='/redux-toolkit/starships/[id]'
              as={`/redux-toolkit/starships/${starship.id}`}
              {...starship}
            />
          ))}
        </Wrapper>
      </ContentLoader>
    </ContentWrapper>
  );
};

export { StarshipsToolkit };
