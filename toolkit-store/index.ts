// libs
import { combineReducers } from '@reduxjs/toolkit';
// api
import { starshipsAPI } from '@md-toolkit-store/services/starships/get-starships-api';
// shapes
import { UIReducers } from '@md-toolkit-store/modules/ui';
import { APIReducers } from '@md-toolkit-store/modules/api';

export type RootToolkitStore = {
  ui: UIReducers;
  api: APIReducers;
  [starshipsAPI.reducerPath]: ReturnType<typeof starshipsAPI.reducer>;
};

export const rootToolkitStore = combineReducers<RootToolkitStore>({
  ui: require('./modules/ui').uiReducers,
  api: require('./modules/api').apiReducers,
  [starshipsAPI.reducerPath]: starshipsAPI.reducer
});
