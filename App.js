/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import {LogBox} from 'react-native';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppNavigator />
      </GestureHandlerRootView>
    </>
  );
};

export default App;
