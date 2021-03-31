import React from 'react';
import RModal, { Props as ReactModalProps } from 'react-modal';
// hooks
import { theme } from '@md-styles/styled/theme';

interface ModalProps extends ReactModalProps {
  isOpen: boolean;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.colors.gray600
  },
  overlay: {
    backgroundColor: 'rgba(26, 34, 43, 0.7)'
  }
};

const Modal: React.FC<ModalProps> = ({ isOpen, children, ...rest }) => {
  return (
    <RModal isOpen={isOpen} style={customStyles} {...rest}>
      {children}
    </RModal>
  );
};

export default Modal;
