import * as React from 'react';
// view components
import { MainLayout } from '@md-shared/layouts/main';
import { PlanetToolkit } from '@md-sw/redux-toolkit/planet';
// context
import { AppReduxProvider } from '@md-modules/shared/providers/redux';
// types
import { GetServerSidePropsContext } from 'next';
import { ThunkDispatch } from '@md-store/helpers';
import { RootToolkitStore } from '@md-toolkit-store/index';
// store
import { initializeReduxToolKitStore } from 'lib/redux-toolkit/initStore';
import { getPlanet } from '@md-toolkit-store/modules/api/planets/get-planet';

interface Props {
  initialReduxState: RootToolkitStore;
}

const PlanetToolkitPage = (props: Props) => (
  <AppReduxProvider initialReduxToolkitState={props.initialReduxState} isReduxToolKit>
    <MainLayout>
      <PlanetToolkit />
    </MainLayout>
  </AppReduxProvider>
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params?.id) return;

  const id = context.params.id as string;
  const reduxStore = initializeReduxToolKitStore();
  const dispatch = reduxStore.dispatch as ThunkDispatch;

  await dispatch(getPlanet(id));

  return { props: { initialReduxState: reduxStore.getState() } };
}

export default PlanetToolkitPage;
