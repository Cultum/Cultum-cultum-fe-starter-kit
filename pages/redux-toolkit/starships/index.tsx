import * as React from 'react';
// context
import { AppReduxProvider } from '@md-shared/providers/redux';
// view components
import { MainLayout } from '@md-shared/layouts/main';
import { StarshipsToolkit } from '@md-sw/redux-toolkit/starships';

const StarshipsToolkitPage = () => (
  <AppReduxProvider isReduxToolKit>
    <MainLayout>
      <StarshipsToolkit />
    </MainLayout>
  </AppReduxProvider>
);

export default StarshipsToolkitPage;
