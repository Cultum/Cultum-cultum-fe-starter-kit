import React from 'react';
// store
import { setCloseModalAction, setOpenModalAction, setUpdateModalAction } from '@md-store/modules/ui/modal';
// hooks
import { useDispatch, useSelector } from 'react-redux';
// types
import { RootStore } from 'store';
import { UseModalProps } from '@md-modules/shared/constants/modal';

const useModal = ({ modalType }: UseModalProps) => {
  const dispatch = useDispatch();

  const modalData = useSelector<RootStore, RootStore['ui']['modal']>((state) => state.ui.modal);

  const openModal = React.useCallback(
    (id) => {
      dispatch(
        setOpenModalAction({
          modalType,
          modalData: {
            id,
            open: true
          }
        })
      );
    },

    [dispatch, modalType]
  );

  const closeModal = React.useCallback(
    (id) => {
      dispatch(
        setCloseModalAction({
          modalType,
          modalData: {
            id,
            open: false
          }
        })
      );
    },

    [dispatch, modalType]
  );

  const updateModal = React.useCallback(
    (id) => {
      dispatch(
        setUpdateModalAction({
          modalType: modalData.modalType,
          modalData: {
            id,
            open: modalData.modalData.open
          }
        })
      );
    },

    [dispatch, modalData]
  );

  return {
    openModal,
    closeModal,
    updateModal,
    modalData
  };
};

export { useModal };
