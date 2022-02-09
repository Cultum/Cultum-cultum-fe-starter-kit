import * as React from 'react';
// view components
import { Planets } from '@md-sw/redux/planets';
import { MainLayout } from '@md-shared/layouts/main';
// context
import { AppReduxProvider } from '@md-modules/shared/providers/redux';
// store
import { initializeStore } from 'lib/redux/initStore';
import * as API from '@md-store/modules/api';
// types
import { RootStore } from '@md-store/index';
import { ThunkDispatch } from '@md-store/helpers';

interface Props {
  initialReduxState: RootStore;
}

const PlanetsPage = (props: Props) => (
  <AppReduxProvider initialReduxState={props.initialReduxState}>
    <MainLayout>
      <Planets />
    </MainLayout>
  </AppReduxProvider>
);

export async function getServerSideProps() {
  const reduxStore = initializeStore();
  const dispatch = reduxStore.dispatch as ThunkDispatch;

  await dispatch(API.planets.getPlanets.performAPIGetPlanets());

  return { props: { initialReduxState: reduxStore.getState() } };
}

export default PlanetsPage;
