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
import { Modal } from '@md-ui/modal';
// constants
import { PERSON_DETAILS_MODAL } from '@md-constants/modal';
// hooks
import { useModal } from '@md-shared/hooks/use-modal';

const PeoplePresentation = () => {
  const { isLoading, error } = React.useContext(PeopleAPIContext);
  const { peopleList } = React.useContext(PeopleBLContext);

  const {
    openModal,
    closeModal,
    modalData: { isOpen }
  } = useModal({ modalType: PERSON_DETAILS_MODAL });

  return (
    <ContentWrapper>
      <ContentLoader isLoading={isLoading} error={error}>
        <Wrapper>
          {peopleList.map((person) => (
            <Card
              key={person.id}
              href='/graphql/people/[id]'
              as={`/graphql/people/${person.id}`}
              openModal={openModal}
              {...person}
            />
          ))}
        </Wrapper>

        <Modal isOpen={isOpen} closeModal={closeModal}>
          TEST
        </Modal>
      </ContentLoader>
    </ContentWrapper>
  );
};

export { PeoplePresentation };
