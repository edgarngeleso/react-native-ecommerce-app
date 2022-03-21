/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Drawers from './src/Index';
import {Provider as ReduxProvider, useSelector} from "react-redux";
import configureStore from './src/redux/store';
const store = configureStore();
const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Drawers/> 
      </NavigationContainer>
    </ReduxProvider>
     
  );
};
export default App;
