import * as React from 'react';
// view components
import { Starships } from '@md-sw/redux/starships';
import { MainLayout } from '@md-shared/layouts/main';
// context
import { AppReduxProvider } from '@md-modules/shared/providers/redux';

const StarshipsPage = () => (
  <AppReduxProvider>
    <MainLayout>
      <Starships />
    </MainLayout>
  </AppReduxProvider>
);

export default StarshipsPage;
