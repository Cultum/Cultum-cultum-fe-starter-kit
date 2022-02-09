import { AnyAction, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootToolkitStore, RootToolkitStore } from '@md-toolkit-store/index';

let store: (Store<RootToolkitStore, AnyAction> & { dispatch: unknown }) | undefined;

export const initializeReduxToolKitStore = (preloadedState?: RootToolkitStore) => {
  let _store =
    store ??
    configureStore({
      preloadedState,
      reducer: rootToolkitStore
    });

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = configureStore({
      reducer: rootToolkitStore,
      preloadedState: {
        ...store.getState(),
        ...preloadedState
      }
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};
