import React from 'react';
import {Snackbar, Text, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

const HomeScreen = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [visible, setVisible] = React.useState(true);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Home Screen</Text>
        <Snackbar
          style={{backgroundColor: 'green'}}
          visible={visible}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Close',
            onPress: () => {
              // Do something
            },
          }}>
          Login SuccessFully!
        </Snackbar>
      </SafeAreaView>
    </>
  );
};

const getStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default HomeScreen;
