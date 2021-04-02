// store
import { ModalInfo, setCloseModalAction, setOpenModalAction, setUpdateModalAction } from '@md-store/modules/ui/modal';
// hooks
import { useDispatch, useSelector } from 'react-redux';
// types
import { RootStore } from 'store';
import { ModalType } from '@md-modules/shared/constants/modal';

interface UseModalProps {
  modalType: ModalType;
}

const useModal = ({ modalType }: UseModalProps) => {
  const dispatch = useDispatch();

  const modalData = useSelector<RootStore, RootStore['ui']['modal'][typeof modalType]>(
    (state) => state.ui.modal[modalType]
  );

  const openModal = (modalInfo?: ModalInfo) => dispatch(setOpenModalAction({ modalType, modalInfo }));
  const closeModal = () => dispatch(setCloseModalAction({ modalType }));
  const updateModal = (modalInfo: ModalInfo) => dispatch(setUpdateModalAction({ modalType, modalInfo }));

  return {
    openModal,
    closeModal,
    updateModal,
    modalData
  };
};

export { useModal };
