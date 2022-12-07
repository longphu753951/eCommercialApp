import React, {type PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {store} from 'store';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {firebase, rrfConfig} from 'services/firebase';
import {createFirestoreInstance} from 'redux-firestore';
import Navigation from 'navigation';
console.log(store);
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};
import {Settings} from 'react-native-fbsdk-next';

Settings.setAppID('600246601082072');

const App = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Navigation />
      </ReactReduxFirebaseProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
