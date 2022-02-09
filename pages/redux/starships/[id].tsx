import * as React from 'react';
// view components
import { MainLayout } from '@md-shared/layouts/main';
import { StarshipContainer } from '@md-modules/star-wars/redux/starship';
// context
import { AppReduxProvider } from '@md-modules/shared/providers/redux';

const StarshipPage = () => (
  <AppReduxProvider>
    <MainLayout>
      <StarshipContainer />
    </MainLayout>
  </AppReduxProvider>
);

export default StarshipPage;
