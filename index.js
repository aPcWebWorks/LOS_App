/**
 * @format
 */
import * as React from 'react';
import {AppRegistry, useColorScheme} from 'react-native';
import {
  // MD3DarkTheme,
  // MD3LightTheme,
  DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import App from './App';
// import {lightScheme, darkScheme} from './src/theme/colors';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';

// const lightTheme = {
//   ...MD3LightTheme,
//   colors: lightScheme,
//   roundness: 4,
// };

// const darkTheme = {
//   ...MD3DarkTheme,
//   colors: darkScheme,
// };

export default function Main() {
  const colorScheme = useColorScheme();

  // const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
