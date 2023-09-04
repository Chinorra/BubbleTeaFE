import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React from 'react';
import App from './src/App';
import { Provider } from 'react-redux';

import {store, persistor} from './src/store.js'
import { PersistGate } from 'redux-persist/integration/react';

const RNRedux = () => {
  console.log('sore', store);
  return (
    <>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
     </Provider>
    </>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);