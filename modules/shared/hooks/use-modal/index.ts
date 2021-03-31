import React from 'react';

export type UseModal = (
  isOpen: boolean
) => {
  openModal: () => void;
  closeModal: () => void;
  modalIsOpen: boolean;
};

const useModal: UseModal = (isOpen = false) => {
  const [modalIsOpen, setIsOpen] = React.useState(isOpen);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    openModal,
    closeModal,
    modalIsOpen
  };
};

export { useModal };
