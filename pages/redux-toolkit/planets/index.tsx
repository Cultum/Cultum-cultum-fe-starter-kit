import * as React from 'react';
import { GetServerSideProps } from 'next';
// view components
import { MainLayout } from '@md-shared/layouts/main';
import { PlanetsToolkit } from '@md-sw/redux-toolkit/planets';
// context
import { AppReduxProvider } from '@md-modules/shared/providers/redux';
// store
import { initializeReduxToolKitStore } from 'lib/redux-toolkit/initStore';
import { getPlanets } from '@md-toolkit-store/modules/api/planets/get-planets';
// types
import { ThunkDispatch } from '@md-store/helpers';
import { RootToolkitStore } from '@md-toolkit-store/index';

interface Props {
  initialReduxState: RootToolkitStore;
}

const PlanetsToolkitPage = (props: Props) => (
  <AppReduxProvider initialReduxToolkitState={props.initialReduxState} isReduxToolKit>
    <MainLayout>
      <PlanetsToolkit />
    </MainLayout>
  </AppReduxProvider>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const reduxStore = initializeReduxToolKitStore();
  const dispatch = reduxStore.dispatch as ThunkDispatch;

  await dispatch(getPlanets());

  return { props: { initialReduxState: reduxStore.getState() } };
};

export default PlanetsToolkitPage;
