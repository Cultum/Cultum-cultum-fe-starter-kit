import { createSlice } from '@reduxjs/toolkit';

/* ------------- Initial State ------------- */

export type InitialState = {
  open: boolean;
};

export const INITIAL_STATE: InitialState = {
  open: false
};

/* ------------- Hookup Reducers To Types ------------- */

export const slice = createSlice({
  name: 'modal',
  initialState: INITIAL_STATE,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    }
  }
});
