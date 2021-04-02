import { createAction } from '@md-store/helpers';

/* ------------- Types ------------- */

export const OPEN_TOAST = '@ui/toast/OPEN_TOAST';
export const HIDE_TOAST = '@ui/toast/HIDE_TOAST';
export const RESET_TOAST_DATA = '@ui/toast/RESET_TOAST_DATA';

/* ------------- Types and Action Creators ------------- */

type NotificationType = 'WARNING' | 'ERROR' | 'SUCCESS';

export interface OpenToastParams {
  type: NotificationType;
  message: string;
}

export const setOpenToastAction = createAction<typeof OPEN_TOAST, OpenToastParams>(OPEN_TOAST);
export type SetOpenToastAction = ReturnType<typeof setOpenToastAction>;

export const setHideToastAction = createAction<typeof HIDE_TOAST>(HIDE_TOAST);
export type SetHideToastAction = ReturnType<typeof setHideToastAction>;

export const resetToastAction = createAction<typeof RESET_TOAST_DATA>(RESET_TOAST_DATA);
export type ResetToastAction = ReturnType<typeof resetToastAction>;

type Actions = SetHideToastAction | SetOpenToastAction | ResetToastAction;

/* ------------- Initial State ------------- */

export type InitialState = {
  type: NotificationType;
  open: boolean;
  message: string;
};

export const INITIAL_STATE: InitialState = {
  type: 'ERROR',
  message: '',
  open: false
};

/* ------------- Hookup Reducers To Types ------------- */

export function reducer(state = INITIAL_STATE, action: Actions): InitialState {
  switch (action.type) {
    case OPEN_TOAST:
      return state.open
        ? state
        : {
            ...state,
            ...action.payload,
            open: true
          };
    case HIDE_TOAST:
      return {
        ...state,
        open: false
      };
    case RESET_TOAST_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
}
