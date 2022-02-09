import { combineReducers } from 'redux';
// local
import * as toast from './toast';
import * as modal from './modal';

export type UIReducers = {
  toast: toast.InitialState;
  modal: modal.InitialState;
};

export const uiReducers = combineReducers<UIReducers>({
  toast: toast.slice.reducer,
  modal: modal.slice.reducer
});

export { toast, modal };
