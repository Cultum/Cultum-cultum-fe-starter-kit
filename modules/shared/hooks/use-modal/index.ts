// store
import { ModalData, setCloseModalAction, setOpenModalAction, setUpdateModalAction } from '@md-store/modules/ui/modal';
// hooks
import { useDispatch, useSelector } from 'react-redux';
// types
import { RootStore } from 'store';

const useModal = ({ modalType }: { modalType: string }) => {
  const dispatch = useDispatch();

  const modalData = useSelector<RootStore, RootStore['ui']['modal'][typeof modalType]>(
    (state) => state.ui.modal[modalType]
  );

  const openModal = (modalData?: ModalData) => dispatch(setOpenModalAction({ modalType, modalData }));
  const closeModal = () => dispatch(setCloseModalAction({ modalType }));
  const updateModal = (modalData: ModalData) => dispatch(setUpdateModalAction({ modalType, modalData }));

  return {
    openModal,
    closeModal,
    updateModal,
    modalData
  };
};

export { useModal };
