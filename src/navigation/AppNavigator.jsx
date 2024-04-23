import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignInScreen from '../screens/auth/sign in/SignInScreen.js';
import Home from '../screens/home/HomeScreen.js';
import AppDrawer from '../components/Common/drawer/Drawer.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BusinessPartner from '../screens/business-partner/BusinessPartnerScreen.js';
import FinancialSourcingScreen from '../screens/financial-sourcing/FinancialSourcingScreen.js';
import {Keyboard, AppState} from 'react-native';
import ReportsScreen from '../screens/reports/ReportsScreen.js';
import ProfileScreen from '../screens/profile/ProfileScreen.js';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  const navigation = useNavigation();
  const {success} = useSelector(state => state.auth);

  // useEffect(() => {
  //   (async () => {
  //     const _token = await AsyncStorage.getItem('token');
  //     if (_token) {
  //       setIsAuthenticated(true);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //     return;
  //   })();
  // }, [success]);

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerLeft: () => {
          return (
            <FontAwesome5
              name={'bars'}
              style={{fontSize: 25, marginLeft: 20, color: 'black'}}
              onPress={() =>
                navigation.dispatch(
                  DrawerActions.openDrawer(),
                  Keyboard.dismiss(),
                )
              }
            />
          );
        },
        headerStyle: {
          backgroundColor: '#ecf9ec',
        },
      }}>
      {success ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="business partner" component={BusinessPartner} />
          <Stack.Screen
            name="Financial Sourcing"
            component={FinancialSourcingScreen}
          />
          <Stack.Screen name="Reports" component={ReportsScreen} />
        </>
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
}

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Stack"
    drawerContent={props => <AppDrawer {...props} />}
    screenOptions={{headerShown: false}}>
    <Drawer.Screen name="Stack" component={StackNavigator} />
  </Drawer.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <DrawerNavigator />
  </NavigationContainer>
);

export default AppNavigator;
