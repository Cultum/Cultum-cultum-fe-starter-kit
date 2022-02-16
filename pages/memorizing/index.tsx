import React from 'react';
import { MainLayout } from '@md-shared/layouts/main';
import MemorizingExample from '@md-modules/memorizing/main';
import { MemorizeContextExampleContainer } from '@md-modules/memorizing/context';

const TABS = [
  { id: 'Memorizing', title: 'Memorizing', component: <MemorizingExample /> },
  { id: 'Memorizing Context', title: 'Memorizing Context', component: <MemorizeContextExampleContainer /> }
];

const MemorizingExamplePage = () => <MainLayout childrenTabs={TABS} />;

export default MemorizingExamplePage;
