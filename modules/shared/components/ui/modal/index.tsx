import React from 'react';
import RModal, { Props as ReactModalProps } from 'react-modal';
// local
import { theme } from '@md-styles/styled/theme';

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

RModal.setAppElement('#__next');

export const Modal: React.FC<ReactModalProps> = ({ isOpen, children, ...rest }) => {
  return (
    <RModal isOpen={isOpen} style={MODAL_STYLES} {...rest}>
      {children}
    </RModal>
  );
};
