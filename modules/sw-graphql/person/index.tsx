import * as React from 'react';
import { PersonPresentation } from '@md-sw-person/layers/presentation';
import { PersonAPIContextProvider } from '@md-sw-person/layers/api/person';
import { PersonBLContextProvider } from '@md-sw-person/layers/business';

interface PersonContainerProps {
  closeModal: () => void;
  id: string;
}

const PersonContainer: React.FC<PersonContainerProps> = ({ closeModal, id }) => (
  <PersonAPIContextProvider id={id}>
    <PersonBLContextProvider>
      <PersonPresentation closeModal={closeModal} />
    </PersonBLContextProvider>
  </PersonAPIContextProvider>
);

export { PersonContainer };
