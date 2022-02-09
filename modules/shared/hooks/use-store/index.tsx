import * as React from 'react';
// libs
import { initializeStore } from 'lib/redux/initStore';
import { initializeReduxToolKitStore } from 'lib/redux-toolkit/initStore';
// types
import { RootStore } from 'store';
import { RootToolkitStore } from '@md-toolkit-store/index';

export const useStore = (initialState?: RootStore) =>
  React.useMemo(() => initializeStore(initialState), [initialState]);

export const useToolKitStore = (initialState?: RootToolkitStore) =>
  React.useMemo(() => initializeReduxToolKitStore(initialState), [initialState]);
