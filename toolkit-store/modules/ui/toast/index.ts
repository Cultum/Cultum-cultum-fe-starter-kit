import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* ------------- Types and Action Creators ------------- */

type NotificationType = 'WARNING' | 'ERROR' | 'SUCCESS';

export interface OpenToastParams {
  type: NotificationType;
  message: string;
  onPress?(): unknown;
}

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

export const slice = createSlice({
  name: 'toast',
  initialState: INITIAL_STATE,
  reducers: {
    openToast: (state, action: PayloadAction<OpenToastParams>) => {
      state = { ...state, ...action.payload, open: true };
    },
    hideToast: (state) => {
      state.open = false;
    }
  }
});
