import React from 'react';
// store
import { setCloseModalAction, setOpenModalAction } from '@md-store/modules/ui/modal';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const updateModal = React.useCallback(
    (id) => {
      dispatch(
        setCloseModalAction({
          modalType,
          modalData: {
            id,
            open: modalData.modalData.open
          }
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  return {
    openModal,
    closeModal,
    updateModal,
    modalData
  };
};

export { useModal };
