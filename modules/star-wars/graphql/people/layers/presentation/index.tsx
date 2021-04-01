import * as React from 'react';
// view components
import { Card } from '@md-sw/shared/components/card';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// context
import { PeopleAPIContext } from '@md-sw-people/layers/api/people';
import { PeopleBLContext } from '@md-sw-people/layers/business';
// views
import { ContentWrapper, Wrapper } from '@md-shared/views/common';

const PeoplePresentation = () => {
  const { isLoading, error } = React.useContext(PeopleAPIContext);
  const { peopleList } = React.useContext(PeopleBLContext);

  return (
    <ContentWrapper>
      <ContentLoader isLoading={isLoading} error={error}>
        <Wrapper>
          {peopleList.map((person) => (
            <Card
              key={person.id}
              href='/graphql/people/[id]'
              as={`/graphql/people/${person.id}`}
              modalEnabled
              modalType='PERSON_DETAILS_MODAL'
              {...person}
            />
          ))}
        </Wrapper>
      </ContentLoader>
    </ContentWrapper>
  );
};

export { PeoplePresentation };
