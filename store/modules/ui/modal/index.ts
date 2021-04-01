import { ModalType } from '@md-modules/shared/constants/modal';
import { createAction } from '@md-store/helpers';

/* ------------- Types ------------- */

export const OPEN_MODAL = '@ui/modal/OPEN_MODAl';
export const CLOSE_MODAL = '@ui/modal/CLOSE_MODAL';
export const UPDATE_MODAL = '@ui/modal/UPDATE_MODAL';

/* ------------- Types and Action Creators ------------- */
export interface ModalParams {
  modalType: any;
  modalData: {
    id: string;
    open: boolean;
  };
}

export const setOpenModalAction = createAction<typeof OPEN_MODAL, ModalParams>(OPEN_MODAL);
export type SetOpenModalAction = ReturnType<typeof setOpenModalAction>;

export const setUpdateModalAction = createAction<typeof UPDATE_MODAL, ModalParams>(UPDATE_MODAL);
export type SetUpdateModalAction = ReturnType<typeof setUpdateModalAction>;

export const setCloseModalAction = createAction<typeof CLOSE_MODAL, ModalParams>(CLOSE_MODAL);
export type SetCloseModalAction = ReturnType<typeof setCloseModalAction>;

type Actions = SetOpenModalAction | SetCloseModalAction | SetUpdateModalAction;

/* ------------- Initial State ------------- */

export type InitialState = {
  modalType: ModalType;
  modalData: {
    id: string;
    open: boolean;
  };
};

export const INITIAL_STATE: InitialState = {
  modalType: '' as ModalType,
  modalData: { open: false, id: '' }
};

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case OPEN_MODAL:
      return state.modalData.open
        ? state
        : {
            ...state,
            ...action.payload
          };

    case CLOSE_MODAL:
      return {
        ...state,
        ...action.payload
      };

    case UPDATE_MODAL:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
