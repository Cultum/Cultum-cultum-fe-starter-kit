import * as React from 'react';
// view components
import { Card } from '@md-sw/shared/components/card';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// context
import { PeopleAPIContext } from '@md-sw-people/layers/api/people';
// views
import { ContentWrapper, Wrapper, Description, Title } from '@md-shared/views/common';

const PeoplePresentation = () => {
  const { isLoading, error, people } = React.useContext(PeopleAPIContext);

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

      <ContentLoader isLoading={isLoading} error={error}>
        <Wrapper>
          {people.map((person) => (
            <Card key={person.id} href='/graphql/people/[id]' as={`/graphql/people/${person.id}`} {...person} />
          ))}
        </Wrapper>
      </ContentLoader>
    </ContentWrapper>
  );
};

export { PeoplePresentation };
