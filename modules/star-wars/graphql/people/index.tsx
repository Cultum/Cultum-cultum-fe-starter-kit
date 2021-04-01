import * as React from 'react';
import { PeopleAPIContextProvider } from '@md-sw-people/layers/api/people';
import { PeopleBLContextProvider } from '@md-sw-people/layers/business';
import { PeoplePresentation } from '@md-sw-people/layers/presentation';
import { Modal } from '@md-modules/shared/components/ui/modal';

const PeopleContainer = () => (
  <PeopleAPIContextProvider>
    <PeopleBLContextProvider>
      <PeoplePresentation />
      <Modal />
    </PeopleBLContextProvider>
  </PeopleAPIContextProvider>
);

export { PeopleContainer };
