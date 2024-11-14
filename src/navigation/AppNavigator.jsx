import React from 'react';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import SignInScreen from '../screens/auth/sign in/SignInScreen.js';
import Home from '../screens/home/HomeScreen.js';
import AppDrawer from '../components/Common/drawer/Drawer.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Keyboard} from 'react-native';
import ReportsScreen from '../screens/reports/ReportsScreen.js';
import ProfileScreen from '../screens/profile/ProfileScreen.js';
import CustomerMasterScreen from '../screens/financial-sourcing/customer-master/CustomerMasterScreen.js';
import LoanMasterScreen from '../screens/financial-sourcing/loan-master/LoanMasterScreen.js';
import LoanSearchedCustomerScreen from '../screens/financial-sourcing/loan-master/LoanSearchedCustomerScreen.js';
import LoanGenerationScreen from '../screens/financial-sourcing/loan-master/LoanGenerationScreen.js';
import CustomerDetailsScreen from '../screens/financial-sourcing/customer-master/CustomerDetailsScreen.js';
import LoanStatusScreen from '../screens/financial-sourcing/loan-status/LoanStatusScreen.js';
import LoanDetailsScreen from '../screens/financial-sourcing/loan-master/LoanDetailsScreen.js';
import CustomerUpdateScreen from '../screens/financial-sourcing/customer-master/CustomerUpdateScreen.js';
import LoanUpdateScreen from '../screens/financial-sourcing/loan-master/LoanUpdateScreen.js';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function StackNavigator() {
  const navigation = useNavigation();
  const {isAuthenticated} = useSelector(state => state.auth);

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerLeft: () => {
          return (
            <Icon
              name="menu"
              style={{marginLeft: 20}}
              size={25}
              color="black"
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
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Customer Master"
            component={CustomerMasterScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Customer Details"
            component={CustomerDetailsScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />

          <Stack.Screen
            name="Customer Update"
            component={CustomerUpdateScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />

          <Stack.Screen
            name="Loan Master"
            component={LoanMasterScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Loan Details"
            component={LoanDetailsScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.navigate('Loan Master')}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Loan Status"
            component={LoanStatusScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Searched Customer"
            component={LoanSearchedCustomerScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Loan Generation"
            component={LoanGenerationScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          <Stack.Screen
            name="Loan Update"
            component={LoanUpdateScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />
          <Stack.Screen
            name="All Types Reports"
            component={ReportsScreen}
            options={{
              headerLeft: () => (
                <Icon
                  name="arrow-back"
                  style={{marginLeft: 20, marginTop: 3}}
                  size={25}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              ),
            }}
          />
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
