import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Image, View, Dimensions, StyleSheet, Alert} from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
  Snackbar,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {Base64} from 'js-base64';
import {userLogin} from '../../../features/auth/authThunks.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  scpUserDetailsHandler,
  getWithSCPNumberHandler,
} from '../../../features/scp-user/scpUserThunk.js';

const CustomSnackbar = ({}) => {
  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.snackContainer}>
      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
      <Snackbar
        style={styles.snackbar}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Close',
          onPress: () => {
            // Do something
          },
        }}>
        Hey there! I'm a Snackbar.
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  snackContainer: {
    backgroundColor: 'red',
    position: 'relative',
    width: '100%',
    bottom: 10,
    zIndex: 1,
  },
  snackbar: {
    backgroundColor: 'green',
  },
});

const SignInScreen = ({navigation}) => {
  const theme = useTheme();
  const styles = getStyles(theme, windowWidth);
  const dispatch = useDispatch();
  const [snackVisible, setSnackVisible] = useState(false);

  const {isLoading, user, error, success} = useSelector(state => state.auth);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
  });

  const {window} = dimensions;
  const windowWidth = window.width;
  const windowHeight = window.height;

  const [isToggleIcon, setIsToggleIcon] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const iconHandler = () => {
    setIsToggleIcon(!isToggleIcon);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setDimensions({window});
    });
    return () => subscription?.remove();
  }, []);

  // useEffect(() => {
  //   const getScpUserDetails = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     const id = await AsyncStorage.getItem('id');
  //     if (token) {
  //       dispatch(getWithSCPNumberHandler(id));
  //       console.log("getScpUserDetails")
  //       return;
  //     }
  //   };
  //   getScpUserDetails();
  // }, [success]);

  const handleChange = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const hasErrors = () => {
    if (!credentials.username || !credentials.password) {
      if (!credentials.username) {
        usernameRef.current.focus();
        setUsernameError('Please enter your username');
      } else if (!credentials.password) {
        passwordRef.current.focus();
        setPasswordError('Please enter your password');
      }
      return true;
    } else {
      return false;
    }
  };

  // const decodeToken = token => {
  //   try {
  //     const decoded = jwtDecode(token);
  //     console.log('decodeToken', decoded);
  //     return decoded;
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //   }
  // };

  function decodeJWT(token) {
    try {
      const [header, payload, signature] = token.split('.');
      const decodedPayload = JSON.parse(Base64.decode(payload));
      return decodedPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  const handleLogin = async () => {
    if (!hasErrors()) {
      usernameRef.current.blur();
      passwordRef.current.blur();
      const {username, password} = credentials;
      const Username = username.trim();
      const Password = password.trim();
      await dispatch(userLogin({loginId: Username, password: Password}));

      const _token = await AsyncStorage.getItem('token');
      if (_token) {
        const {sub} = await decodeJWT(_token);
        await dispatch(getWithSCPNumberHandler(sub));

        // const _id = await AsyncStorage.getItem('scpId');
        // console.log('Sign In Screen all Keys', _id);
        // await dispatch(scpUserDetailsHandler(_id));
      }
    }
    return;
  };

  return (
    <>
      {isLoading ? (
        <>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.green800}
            size="large"
            style={{flex: 1, backgroundColor: 'white'}}
          />
        </>
      ) : (
        <>
          <SafeAreaView style={styles.container}>
            <View
              style={styles.title}
              colors={['#009900', '#b2cfb2']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Image
                source={require('../../../assets/images/software-logo.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.formStyle}>
              <Image
                source={{
                  uri: 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/129-512.png',
                }}
                style={styles.avatar}
              />
              <Text style={styles.login}>Login</Text>
              <View style={styles.inputGroup}>
                <View>
                  <TextInput
                    style={styles.input}
                    ref={usernameRef}
                    label={<Text style={styles.label}>Username*</Text>}
                    textColor="black"
                    inputMode="text"
                    mode="outlined"
                    outlineStyle={{
                      borderWidth: 1.5,
                    }}
                    keyboardType="email-address"
                    outlineColor="gray"
                    right={
                      <TextInput.Icon
                        icon="account"
                        size={20}
                        color={theme.colors.logoColor}
                        forceTextInputFocus={false}
                      />
                    }
                    value={credentials.username}
                    onChangeText={text => handleChange('username', text)}
                  />
                  {usernameError && !credentials?.username && (
                    <HelperText
                      style={{
                        color: 'red',
                      }}
                      type="error"
                      visible={() => hasErrors()}
                      padding="none">
                      {usernameError}
                    </HelperText>
                  )}
                </View>

                <View>
                  <TextInput
                    style={styles.input}
                    ref={passwordRef}
                    label={<Text style={styles.label}>Password*</Text>}
                    textColor="black"
                    secureTextEntry={!isToggleIcon}
                    inputMode="text"
                    mode="outlined"
                    outlineStyle={{
                      borderWidth: 1.5,
                    }}
                    keyboardType="visible-password"
                    outlineColor="gray"
                    right={
                      <TextInput.Icon
                        onPress={() => iconHandler()}
                        icon={isToggleIcon ? 'eye-off' : 'eye'}
                        size={20}
                        color={theme?.colors?.logoColor}
                      />
                    }
                    value={credentials.password}
                    onChangeText={text => handleChange('password', text)}
                  />
                  {passwordError && !credentials?.password && (
                    <HelperText
                      style={{
                        color: 'red',
                      }}
                      type="error"
                      visible={() => hasErrors()}
                      padding="none">
                      {passwordError}
                    </HelperText>
                  )}
                </View>
              </View>
              <View style={styles.forgotAndLogin}>
                <TouchableRipple
                  rippleColor="rgba(0, 0, 0, 0.32)"
                  onPress={() => handleLogin()}
                  // disabled={isLoading}
                >
                  <LinearGradient
                    style={styles.button}
                    colors={['#006600', '#009900']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={styles.loginText}>
                      {isLoading ? 'Loading' : 'Login'}
                    </Text>
                  </LinearGradient>
                </TouchableRipple>

                <TouchableRipple>
                  <View style={styles.forgotContent}>
                    <Text style={styles.lostPassword}>
                      You have lost your password?
                    </Text>
                    <Text style={styles.forgotPassword}>Forgot Password!</Text>
                  </View>
                </TouchableRipple>
              </View>
            </View>

            {/* {isAuthenticated && <CustomSnackbar visible={snackVisible} />} */}

            <View style={styles.footer}>
              <Image
                source={require('../../../assets/images/vi-logo.png')}
                style={styles.viLogo}
              />

              <Text style={styles.footerText}>
                &copy; copyright by Visionindia tech services ltd.
              </Text>
            </View>
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export const getStyles = (theme, windowWidth) => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#b2cfb2',
      flex: 1,
      // flexDirection: windowWidth > 500 ? "row" : "column",
      // alignItems: 'center',
      justifyContent: 'space-between',
      overflow: 'hidden',
      // paddingHorizontal: 10,
    },

    title: {
      padding: 20,
      width: '100%',
      height: 300,
      flexDirection: 'column',
      // paddingTop: 60,
      backgroundColor: 'white',
      alignItems: 'center',
      // opacity: 0.8,
    },

    logo: {
      // flex: 1,
      height: 130,
      width: 300,
      objectFit: 'contain',
      marginTop: 20,
    },

    formStyle: {
      // backgroundColor: 'white',
      width: windowWidth > 500 ? '50%' : '100%',
      padding: 20,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      // height: 380
      marginTop: -240,
      // borderWidth: 2,
      backgroundColor: '#b2cfb2',
    },

    avatar: {width: 80, height: 80, borderRadius: 15},

    login: {
      fontWeight: 'bold',
      fontSize: 34,
      color: 'black',
    },

    inputGroup: {
      width: '100%',
      marginTop: 30,
      rowGap: 20,
    },

    input: {
      // borderWidth: 1,
      backgroundColor: 'white',
    },

    forgotAndLogin: {
      marginTop: 40,
      width: '100%',
    },

    forgotContent: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 10,
    },

    lostPassword: {
      color: 'black',
      letterSpacing: 0.3,
      fontSize: 14,
    },

    forgotPassword: {
      color: 'purple',
      fontWeight: '700',
      marginLeft: 5,
    },

    button: {
      borderRadius: 4,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
    },

    loginText: {
      color: 'white',
      fontWeight: 'bold',
    },

    label: {
      color: theme.colors.logoColor,
      backgroundColor: 'white',
      color: 'black',
    },

    viLogo: {
      height: 40,
      width: 100,
      objectFit: 'contain',
      backgroundColor: 'white',
      borderRadius: 8,
      // marginTop: 80
    },

    footer: {
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      width: '100%',
      height: windowWidth > 500 ? 50 : 60,
      paddingHorizontal: 10,
      paddingBottom: 18,
    },

    footerText: {
      fontWeight: 200,
      color: 'black',
      alignItems: 'flex-end',
    },
  });
};

export default SignInScreen;
