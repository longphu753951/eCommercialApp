import React from 'react';
import Navigation from './src/navigation/Navigations';
import { View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';



const App = () => {
  return <Navigation/>;
};

export default App;