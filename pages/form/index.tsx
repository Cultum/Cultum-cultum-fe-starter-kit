import * as React from 'react';
// view components
import { MainLayout } from '@md-shared/layouts/main';
import { ReactHookFormExample } from '@md-modules/form/react-hook-form-example';
import { ReactFinalFormExample } from '@md-modules/form/react-final-form-example';

const TABS = [
  { id: 'react-hook-form', title: 'react-hook-form', component: <ReactHookFormExample /> },
  { id: 'react-final-form', title: 'react-final-form', component: <ReactFinalFormExample /> }
];

const FormExamplePage = () => <MainLayout childrenTabs={TABS} />;

export default FormExamplePage;
