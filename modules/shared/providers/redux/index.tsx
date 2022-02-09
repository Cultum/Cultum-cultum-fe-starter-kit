import * as React from 'react';
// types
import { RootStore } from '@md-store/index';
import { RootToolkitStore } from '@md-toolkit-store/index';
// hooks
import { useStore, useToolKitStore } from '@md-shared/hooks';
// providers
import { Provider } from 'react-redux';

interface ReduxProps {
  isReduxToolKit?: false;
  initialReduxState?: RootStore;
}

interface ReduxToolkitProps {
  isReduxToolKit: true;
  initialReduxToolkitState?: RootToolkitStore;
}

const AppReduxProvider: React.FC<ReduxProps | ReduxToolkitProps> = (props) => {
  const reduxStore = useStore(!props.isReduxToolKit ? props.initialReduxState : undefined);
  const reduxToolkitStore = useToolKitStore(props.isReduxToolKit ? props.initialReduxToolkitState : undefined);

  const store = props.isReduxToolKit ? reduxToolkitStore : reduxStore;

  return <Provider store={store}>{props.children}</Provider>;
};

export { AppReduxProvider };
