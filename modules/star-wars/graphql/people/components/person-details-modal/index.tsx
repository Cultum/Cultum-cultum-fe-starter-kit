import React from 'react';
// hooks
import { useModal } from '@md-modules/shared/hooks/use-modal';
// constants
import { PERSON_DETAILS_MODAL } from '@md-constants/modal';
// components
import { Info } from '@md-modules/star-wars/shared/components/info';
import { Modal } from '@md-modules/shared/components/ui/modal';
// views
import { ContentWrapper, Wrapper, ImgContainer, InfoContainer, DetailsContainer, Name } from '@md-sw/shared/views';

interface PersonInfo {
  label: string;
  value: string;
}

export const PersonDetailsModal = () => {
  const {
    closeModal,
    modalData: { modalInfo, isOpen }
  } = useModal({ modalType: PERSON_DETAILS_MODAL });

  const personInfo = React.useMemo<PersonInfo[]>(() => {
    if (!modalInfo) {
      return [];
    }

    return [
      { label: 'Gender', value: modalInfo.gender ?? 'N/A' },
      { label: 'Hair Color', value: modalInfo.hairColor ?? 'N/A' },
      { label: 'Eye Color', value: modalInfo.eyeColor ?? 'N/A' },
      { label: 'Birth Year', value: modalInfo.birthYear ?? 'N/A' }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalInfo]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <ContentWrapper>
        <Wrapper>
          <ImgContainer>
            <img src='/static/images/Ben-Kenobi.jpg' alt='Kenobi' />
          </ImgContainer>
          <DetailsContainer>
            {personInfo && <Name>{modalInfo.name}</Name>}
            <InfoContainer>
              {personInfo.map((i, idx) => (
                <Info key={idx} {...i} />
              ))}
            </InfoContainer>
          </DetailsContainer>
        </Wrapper>
      </ContentWrapper>
    </Modal>
  );
};
