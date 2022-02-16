import * as React from 'react';
import { MemorizeContextPresentation } from '@md-modules/memorizing/context/layers/presentation';
import { MemorizeBLLContextProvider } from '@md-modules/memorizing/context/layers/business';
import { MemorizeAPIContextProvider } from '@md-modules/memorizing/context/layers/api';

const MemorizeContextExampleContainer = () => (
  <MemorizeAPIContextProvider>
    <MemorizeBLLContextProvider>
      <MemorizeContextPresentation />
    </MemorizeBLLContextProvider>
  </MemorizeAPIContextProvider>
);

export { MemorizeContextExampleContainer };
