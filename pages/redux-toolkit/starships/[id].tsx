import * as React from 'react';
// context
import { AppReduxProvider } from '@md-shared/providers/redux';
// view components
import { MainLayout } from '@md-shared/layouts/main';
import { StarshipToolkit } from '@md-sw/redux-toolkit/starship';

const StarshipToolkitPage = () => (
  <AppReduxProvider isReduxToolKit>
    <MainLayout>
      <StarshipToolkit />
    </MainLayout>
  </AppReduxProvider>
);

export default StarshipToolkitPage;
