import * as React from 'react';
// context
import { MemorizeAPIContext } from '@md-modules/memorizing/context/layers/api';
// view components
import { ContentLoader } from '@md-ui/loaders/content-loader';
import Card from '@md-modules/memorizing/context/components/card';
import Header from '@md-modules/memorizing/context/components/header';
// views
import { ContentWrapper, Title, Description } from '@md-shared/views/common';
import {
  CardsWrapper,
  InnerWrapper,
  DescriptionWrapper
} from '@md-modules/memorizing/context/layers/presentation/views';

const MemorizeContextPresentation = () => {
  const { isLoading, error, people } = React.useContext(MemorizeAPIContext);

  return (
    <ContentWrapper>
      <DescriptionWrapper>
        <Title yellowColor>Press the "Get ID" button to rerender</Title>

        <Description>
          All card's components rerender in both "Get ID" and "Count" click cases. But component highlighted in yellow
          on the left rerenders only in "Get ID" click case although they both use same context. And the card component
          inside the highlighted component is also rendered in any case.
        </Description>
      </DescriptionWrapper>

      <ContentLoader isLoading={isLoading} error={error}>
        <InnerWrapper>
          <Header />

          <CardsWrapper>
            {people.map((person) => (
              <Card key={person.id} {...person} />
            ))}
          </CardsWrapper>
        </InnerWrapper>
      </ContentLoader>
    </ContentWrapper>
  );
};

export { MemorizeContextPresentation };
