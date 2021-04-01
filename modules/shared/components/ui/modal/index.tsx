import React from 'react';
import RModal, { Props as ReactModalProps } from 'react-modal';
// local
import { theme } from '@md-styles/styled/theme';
import { PersonContainer } from '@md-modules/star-wars/graphql/person';
import { useSelector } from 'react-redux';
import { RootStore } from '@md-store/index';
import { ModalType } from '@md-modules/shared/constants/modal';
import { Button } from '@md-ui/button';
import { useModal } from '@md-modules/shared/hooks/use-modal';
import { StarshipContainer } from '@md-modules/star-wars/redux/starship';

const MODAL_STYLES = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: '60%',
    minWidth: '500px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.colors.gray600
  },
  overlay: {
    backgroundColor: 'rgba(26, 34, 43, 0.7)',
    zIndex: 9999999
  }
};

type ModalProps = Omit<ReactModalProps, 'isOpen'>;

RModal.setAppElement('#__next');

const renderSwitch = (modalType: ModalType) => {
  switch (modalType) {
    case 'PERSON_DETAILS_MODAL':
      return <PersonContainer />;
    case 'STARSHIP_DETAILS_MODAL':
      return <StarshipContainer />;
  }
};

export const Modal: React.FC<ModalProps> = ({ ...rest }) => {
  const { modalType, modalData } = useSelector<RootStore, RootStore['ui']['modal']>((state) => state.ui.modal);
  const { closeModal } = useModal({ modalType });

  return (
    <RModal isOpen={modalData.open} style={MODAL_STYLES} {...rest}>
      {renderSwitch(modalType)}

      <Button onClick={() => closeModal(modalData.id)} preset='close'>
        &#10005;
      </Button>
    </RModal>
  );
};
