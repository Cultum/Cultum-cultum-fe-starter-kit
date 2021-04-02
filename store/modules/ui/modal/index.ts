// constants
import * as modalTypes from '@md-shared/constants/modal';
// helpers
import { createAction } from '@md-store/helpers';
// utils
import keys from 'lodash/keys';

/* ------------- Types ------------- */

export const OPEN_MODAL = '@ui/modal/OPEN_MODAl';
export const CLOSE_MODAL = '@ui/modal/CLOSE_MODAL';
export const UPDATE_MODAL = '@ui/modal/UPDATE_MODAL';

/* ------------- Types and Action Creators ------------- */
export type ModalData = Record<string, number | boolean | string>;

export interface ModalParams {
  modalType: string;
  modalData?: ModalData;
}

export const setOpenModalAction = createAction<typeof OPEN_MODAL, ModalParams>(OPEN_MODAL);
export type SetOpenModalAction = ReturnType<typeof setOpenModalAction>;

export const setUpdateModalAction = createAction<typeof UPDATE_MODAL, ModalParams>(UPDATE_MODAL);
export type SetUpdateModalAction = ReturnType<typeof setUpdateModalAction>;

export const setCloseModalAction = createAction<typeof CLOSE_MODAL, ModalParams>(CLOSE_MODAL);
export type SetCloseModalAction = ReturnType<typeof setCloseModalAction>;

type Actions = SetOpenModalAction | SetCloseModalAction | SetUpdateModalAction;

/* ------------- Initial State ------------- */

export type Modal = {
  [key: string]: { isOpen: boolean };
};

export type InitialState = Modal;

export const INITIAL_STATE: InitialState = keys(modalTypes).reduce(
  (o, key) => ({
    ...o,
    [key]: { isOpen: false }
  }),
  {}
);

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        [action.payload.modalType]: {
          ...action.payload.modalData,
          isOpen: true
        }
      };

    case CLOSE_MODAL:
      return {
        ...state,
        [action.payload.modalType]: {
          isOpen: false
        }
      };

    case UPDATE_MODAL:
      return {
        ...state,
        [action.payload.modalType]: {
          ...state[action.payload.modalType],
          ...action.payload.modalData
        }
      };

    default:
      return state;
  }
}
