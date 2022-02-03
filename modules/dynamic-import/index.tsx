import React from 'react';
// utils
import dynamic from 'next/dynamic';
// hooks
import { useRouter } from 'next/router';
// components
import { Button } from '@md-ui/button';
import { Loader } from '@md-ui/loaders/loader';
// views
import { Title } from '@md-shared/views/common';
import { Wrapper } from '@md-modules/dynamic-import/views';

// These component is loaded dynamically
const LazyComponent = React.lazy(() => import('./components/lazy-component'));
const DynamicComponent = dynamic(() => import('./components/lazy-component'), { suspense: true });

const DynamicImportExample = () => {
  const { reload } = useRouter();

  const [isLazyOpen, setIsLazyOpen] = React.useState(false);

  const openLazy = () => setIsLazyOpen(true);

  return (
    <Wrapper>
      <Title yellowColor>I recommend setting the mode to "Slow 3G" or "Fast 3G".</Title>

      {isLazyOpen && (
        <React.Suspense fallback={<Loader />}>
          <LazyComponent />
        </React.Suspense>
      )}

      {isLazyOpen && (
        <React.Suspense fallback={<Loader />}>
          <DynamicComponent />
        </React.Suspense>
      )}

      <Button onClick={isLazyOpen ? reload : openLazy}>{isLazyOpen ? 'Reload' : 'Open Lazy Component'}</Button>
    </Wrapper>
  );
};

export default DynamicImportExample;
