import React from 'react';
import RModal, { Props as ReactModalProps } from 'react-modal';
// local
import { theme } from '@md-styles/styled/theme';
import { Button } from '@md-ui/button';

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

interface ModalProps extends ReactModalProps {
  closeModal?: () => void;
}

RModal.setAppElement('#__next');

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children, ...rest }) => {
  return (
    <RModal isOpen={isOpen} style={MODAL_STYLES} {...rest}>
      <Button onClick={closeModal} preset='close'>
        &#10005;
      </Button>
      {children}
    </RModal>
  );
};

export { Modal };
