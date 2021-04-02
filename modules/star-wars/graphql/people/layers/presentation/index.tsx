import * as React from 'react';
// view components
import { Card } from '@md-sw/shared/components/card';
import { ContentLoader } from '@md-ui/loaders/content-loader';
// context
import { PeopleAPIContext } from '@md-sw-people/layers/api/people';
import { PeopleBLContext } from '@md-sw-people/layers/business';
// views
import { ContentWrapper, Wrapper } from '@md-shared/views/common';
// components
import { PersonDetailsModal } from '@md-sw-people/components/person-details-modal';
// constants
import { PERSON_DETAILS_MODAL } from '@md-constants/modal';
// hooks
import { useModal } from '@md-shared/hooks/use-modal';

const PeoplePresentation = () => {
  const { isLoading, error, people } = React.useContext(PeopleAPIContext);
  const { peopleList } = React.useContext(PeopleBLContext);

  const { openModal } = useModal({ modalType: PERSON_DETAILS_MODAL });

  const showDetails = (id: string) => openModal(people.find((person) => id === person.id));

  return (
    <ContentWrapper>
      <ContentLoader isLoading={isLoading} error={error}>
        <Wrapper>
          {peopleList.map((person) => (
            <Card
              key={person.id}
              href='/graphql/people/[id]'
              as={`/graphql/people/${person.id}`}
              openModal={showDetails}
              {...person}
            />
          ))}
          <PersonDetailsModal />
        </Wrapper>
      </ContentLoader>
    </ContentWrapper>
  );
};

export { PeoplePresentation };
