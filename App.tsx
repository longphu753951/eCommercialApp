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
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

let persistor = persistStore(store);

const App = () => {
  // const registerForPushNotificationsAsync = async() => {
  //   let token;
  //   if (Device.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }

  //   if (Platform.OS === 'android') {
  //     await Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }

  //   return token;
  // }

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </ReactReduxFirebaseProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
