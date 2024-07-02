// import React, {useState, useEffect, useRef} from 'react';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {useDispatch, useSelector} from 'react-redux';
// import {Image, View, Dimensions, StyleSheet} from 'react-native';
// import {
//   Button,
//   HelperText,
//   Text,
//   TextInput,
//   TouchableRipple,
//   useTheme,
//   Snackbar,
//   ActivityIndicator,
//   MD2Colors,
// } from 'react-native-paper';
// import LinearGradient from 'react-native-linear-gradient';
// import {Base64} from 'js-base64';
// import {userLogin} from '../../../features/auth/authThunks.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   scpUserDetailsHandler,
//   getWithSCPNumberHandler,
// } from '../../../features/scp-user/scpUserThunk.js';

// const CustomSnackbar = ({}) => {
//   const [visible, setVisible] = useState(false);
//   const onToggleSnackBar = () => setVisible(!visible);

//   const onDismissSnackBar = () => setVisible(false);

//   return (
//     <View style={styles.snackContainer}>
//       <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
//       <Snackbar
//         style={styles.snackbar}
//         visible={visible}
//         onDismiss={onDismissSnackBar}
//         action={{
//           label: 'Close',
//           onPress: () => {
//             // Do something
//           },
//         }}>
//         Hey there! I'm a Snackbar.
//       </Snackbar>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   snackContainer: {
//     backgroundColor: 'red',
//     position: 'relative',
//     width: '100%',
//     bottom: 10,
//     zIndex: 1,
//   },
//   snackbar: {
//     backgroundColor: 'green',
//   },
// });

// const SignInScreen = ({navigation}) => {
//   const theme = useTheme();
//   const styles = getStyles(theme, windowWidth);
//   const dispatch = useDispatch();
//   // const [snackVisible, setSnackVisible] = useState(false);

//   const {isLoading, user, error, success} = useSelector(state => state.auth);

//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });

//   const usernameRef = useRef(null);
//   const passwordRef = useRef(null);

//   const [dimensions, setDimensions] = useState({
//     window: Dimensions.get('window'),
//   });

//   const {window} = dimensions;
//   const windowWidth = window.width;
//   const windowHeight = window.height;

//   const [isToggleIcon, setIsToggleIcon] = useState(false);
//   const [usernameError, setUsernameError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [loginSuccess, setLoginSuccess] = useState(false);

//   const [isError, setIsError] = useState('');

//   const iconHandler = () => {
//     setIsToggleIcon(!isToggleIcon);
//   };

//   useEffect(() => {
//     const subscription = Dimensions.addEventListener('change', ({window}) => {
//       setDimensions({window});
//     });
//     return () => subscription?.remove();
//   }, []);

//   const handleChange = (key, value) => {
//     setCredentials({
//       ...credentials,
//       [key]: value,
//     });
//     console.log(credentials);
//   };

//   // useEffect(() => {
//   //   const getScpUserDetails = async () => {
//   //     const token = await AsyncStorage.getItem('token');
//   //     const id = await AsyncStorage.getItem('id');
//   //     if (token) {
//   //       dispatch(getWithSCPNumberHandler(id));
//   //       console.log("getScpUserDetails")
//   //       return;
//   //     }
//   //   };
//   //   getScpUserDetails();
//   // }, [success]);

//   // const handleChange = (name, value) => {
//   //   if(name==='username'){
//   //     value=value.toUpperCase();
//   //   }
//   //   setCredentials({
//   //     ...credentials,
//   //     [name]: value,
//   //   });
//   // };
//   // const handleChange = (name, value) => {
//   //   if (name === 'username') {
//   //     value = value.toUpperCase();
//   //     if (!value.trim()) {
//   //       setUsernameError('Please enter your username');
//   //     } else {
//   //       setUsernameError('');
//   //     }
//   //   }
//   //   if (name === 'password') {
//   //     // Validate password complexity
//   //     const hasUpperCase = /[A-Z]/.test(value);
//   //     const hasLowerCase = /[a-z]/.test(value);
//   //     const hasNumeric = /[0-9]/.test(value);
//   //     const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

//   //     const isValidPassword =
//   //       value.length >= 6 &&
//   //       hasUpperCase &&
//   //       hasLowerCase &&
//   //       hasNumeric &&
//   //       hasSymbol;

//   //     if (!isValidPassword) {
//   //       setPasswordError(
//   //         value.trim()
//   //           ? 'Password must contain at least 6 characters with uppercase, lowercase, numeric, and symbol'
//   //           : 'Please enter your password',
//   //       );
//   //     } else {
//   //       setPasswordError('');
//   //     }
//   //   }
//   //   setCredentials({
//   //     ...credentials,
//   //     [name]: value,
//   //   });
//   // };

//   // const hasErrors = () => {
//   //   if (!credentials.username || !credentials.password) {
//   //     if (!credentials.username) {
//   //       usernameRef.current.focus();
//   //       setUsernameError('Please enter your username');
//   //     } else if (!credentials.password) {
//   //       passwordRef.current.focus();
//   //       setPasswordError('Please enter your password');
//   //     }
//   //     return true;
//   //   } else {
//   //     return false;
//   //   }
//   // };

//   // const decodeToken = token => {
//   //   try {
//   //     const decoded = jwtDecode(token);
//   //     console.log('decodeToken', decoded);
//   //     return decoded;
//   //   } catch (error) {
//   //     console.error('Error decoding token:', error);
//   //   }
//   // };

//   function decodeJWT(token) {
//     try {
//       const [payload] = token.split('.');
//       const decoded = JSON.parse(Base64.decode(payload));
//       return decoded;
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       return null;
//     }
//   }

//   // const handleLogin = async () => {
//   //   if (!hasErrors()) {
//   //     usernameRef.current.blur();
//   //     passwordRef.current.blur();
//   //     const {username, password} = credentials;
//   //     const Username = username.trim();
//   //     const Password = password.trim();
//   //     const auth = await dispatch(
//   //       userLogin({loginId: Username, password: Password}),
//   //     );

//   //     const _token = await AsyncStorage.getItem('token');
//   //     if (_token) {
//   //       const {sub} = await decodeJWT(_token);
//   //       await dispatch(getWithSCPNumberHandler(sub));
//   //       setLoginSuccess(true);
//   //       console.log('Login Successfull', auth);
//   //       // Optionally, navigate to another screen after successful login
//   //       // navigation.navigate('Home'); // Example navigation
//   //     }
//   //   }
//   // };

//   const validateUsername = () => {
//     if (!credentials?.username.trim()) {
//       setUsernameError('Please enter your usernamessss');
//       usernameRef.current.focus();
//       return false;
//     }
//     setUsernameError('');
//     return true;
//   };

//   const validatePassword = () => {
//     // const hasUpperCase = /[A-Z]/.test(credentials.password);
//     // const hasLowerCase = /[a-z]/.test(credentials.password);
//     // const hasNumeric = /[0-9]/.test(credentials.password);
//     // const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
//     //   credentials.password,
//     // );
//     const pattern =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/.test(
//         credentials.password,
//       );

//     const isValidPassword = credentials.password.length >= 6 && pattern;

//     if (!isValidPassword) {
//       setPasswordError(
//         credentials.password.trim()
//           ? 'Password must contain at least 6 characters with uppercase, lowercase, numeric, and symbol'
//           : 'Please enter your password',
//       );
//       passwordRef.current.focus();
//       return false;
//     }
//     setPasswordError('');
//     return true;
//   };

//   const hasErrors = () => {
//     return !validateUsername() || !validatePassword();
//   };

//   const handleLogin = async () => {
//     if (hasErrors()) return;

//     usernameRef.current.blur();
//     passwordRef.current.blur();

//     const trimmedUsername = credentials.username.trim();
//     const trimmedPassword = credentials.password.trim();

//     try {
//       const auth = await dispatch(
//         userLogin({loginId: trimmedUsername, password: trimmedPassword}),
//       );
//       const token = await AsyncStorage.getItem('token');

//       if (token) {
//         const {sub} = await decodeJWT(token);
//         await dispatch(getWithSCPNumberHandler(sub));
//         console.log('Login Successful', auth);
//       }
//     } catch (error) {
//       console.error('Login Error:', error);
//     }
//   };

//   return (
//     <>
//       {isLoading ? (
//         <>
//           <ActivityIndicator
//             animating={true}
//             color={MD2Colors.green800}
//             size="large"
//             style={{flex: 1, backgroundColor: 'white'}}
//           />
//         </>
//       ) : (
//         <>
//           <SafeAreaView style={styles.container}>
//             <View
//               style={styles.title}
//               colors={['#009900', '#b2cfb2']}
//               start={{x: 0, y: 0}}
//               end={{x: 1, y: 0}}>
//               <Image
//                 source={require('../../../assets/images/software-logo.png')}
//                 style={styles.logo}
//               />
//             </View>
//             <View style={styles.formStyle}>
//               <Image
//                 source={{
//                   uri: 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/129-512.png',
//                 }}
//                 style={styles.avatar}
//               />
//               <Text style={styles.login}>Login</Text>
//               <View style={styles.inputGroup}>
//                 <View>
//                   <TextInput
//                     style={styles.input}
//                     ref={usernameRef}
//                     label={<Text style={styles.label}>Username*</Text>}
//                     textColor="black"
//                     inputMode="text"
//                     mode="outlined"
//                     outlineStyle={{
//                       borderWidth: 1.5,
//                     }}
//                     keyboardType="email-address"
//                     outlineColor="gray"
//                     value={credentials.username}
//                     onChangeText={text => handleChange('username', text)}
//                     focus={!credentials.username}
//                   />
//                   {/* {usernameError && !credentials?.username && ( */}
//                   {usernameError ? (
//                     <HelperText
//                       style={{
//                         color: 'red',
//                       }}
//                       type="error"
//                       visible={true}
//                       padding="none">
//                       {usernameError}
//                     </HelperText>
//                   ) : null}
//                 </View>

//                 <View>
//                   <TextInput
//                     style={styles.input}
//                     ref={passwordRef}
//                     label={<Text style={styles.label}>Password*</Text>}
//                     textColor="black"
//                     secureTextEntry={!isToggleIcon}
//                     inputMode="text"
//                     mode="outlined"
//                     outlineStyle={{
//                       borderWidth: 1.5,
//                     }}
//                     keyboardType="visible-password"
//                     outlineColor="gray"
//                     right={
//                       <TextInput.Icon
//                         onPress={() => iconHandler()}
//                         icon={isToggleIcon ? 'eye-off' : 'eye'}
//                         size={20}
//                         color={theme?.colors?.logoColor}
//                       />
//                     }
//                     value={credentials.password}
//                     onChangeText={text => handleChange('password', text)}
//                     require
//                   />
//                   {/* {passwordError && !credentials?.password && ( */}
//                   {passwordError ? (
//                     <HelperText
//                       style={{
//                         color: 'red',
//                       }}
//                       type="error"
//                       visible={true}
//                       padding="none">
//                       {passwordError}
//                     </HelperText>
//                   ) : null}
//                 </View>
//               </View>
//               <View style={styles.forgotAndLogin}>
//                 <TouchableRipple
//                   rippleColor="rgba(0, 0, 0, 0.32)"
//                   onPress={() => handleLogin()}
//                   // disabled={isLoading}
//                 >
//                   <LinearGradient
//                     style={styles.button}
//                     colors={['#006600', '#009900']}
//                     start={{x: 0, y: 0}}
//                     end={{x: 1, y: 0}}>
//                     <Text style={styles.loginText}>
//                       {isLoading ? 'Loading' : 'Login'}
//                     </Text>
//                   </LinearGradient>
//                 </TouchableRipple>
//                 {loginSuccess && (
//                   <Text style={styles.successMessage}>Login Successfull !</Text>
//                 )}

//                 <TouchableRipple>
//                   <View style={styles.forgotContent}>
//                     <Text style={styles.lostPassword}>
//                       You have lost your password?
//                     </Text>
//                     <Text style={styles.forgotPassword}>Forgot Password!</Text>
//                   </View>
//                 </TouchableRipple>
//               </View>
//             </View>

//             {/* {isAuthenticated && <CustomSnackbar visible={snackVisible} />} */}

//             <View style={styles.footer}>
//               <Image
//                 source={require('../../../assets/images/vi-logo.png')}
//                 style={styles.viLogo}
//               />

//               <Text style={styles.footerText}>
//                 &copy; copyright by Visionindia tech services ltd.
//               </Text>
//             </View>
//           </SafeAreaView>
//         </>
//       )}
//     </>
//   );
// };

// export const getStyles = (theme, windowWidth) => {
//   return StyleSheet.create({
//     container: {
//       backgroundColor: '#b2cfb2',
//       flex: 1,
//       justifyContent: 'space-between',
//       overflow: 'hidden',
//       // paddingHorizontal: 10,
//     },

//     title: {
//       padding: 20,
//       width: '100%',
//       height: 300,
//       flexDirection: 'column',
//       backgroundColor: 'white',
//       alignItems: 'center',
//     },

//     logo: {
//       height: 130,
//       width: 300,
//       objectFit: 'contain',
//       marginTop: 20,
//     },

//     formStyle: {
//       width: windowWidth > 500 ? '50%' : '100%',
//       padding: 20,
//       borderTopLeftRadius: 50,
//       borderTopRightRadius: 50,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: -240,
//       backgroundColor: '#b2cfb2',
//     },

//     avatar: {width: 80, height: 80, borderRadius: 15},

//     login: {
//       fontWeight: 'bold',
//       fontSize: 34,
//       color: 'black',
//     },

//     inputGroup: {
//       width: '100%',
//       marginTop: 30,
//       rowGap: 20,
//     },

//     input: {
//       // borderWidth: 1,
//       backgroundColor: 'white',
//     },

//     forgotAndLogin: {
//       marginTop: 40,
//       width: '100%',
//     },
//     successMessage: {
//       marginTop: 20,
//       padding: 10,
//       backgroundColor: '#4CAF50', // Green color for success
//       color: 'white',
//       borderRadius: 5,
//       textAlign: 'center',
//       fontSize: 16,
//       fontWeight: 'bold',
//     },

//     forgotContent: {
//       flexDirection: 'row',
//       alignSelf: 'center',
//       marginTop: 10,
//     },

//     lostPassword: {
//       color: 'black',
//       letterSpacing: 0.3,
//       fontSize: 14,
//     },

//     forgotPassword: {
//       color: 'purple',
//       fontWeight: '700',
//       marginLeft: 5,
//     },

//     button: {
//       borderRadius: 4,
//       height: 45,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },

//     loginText: {
//       color: 'white',
//       fontWeight: 'bold',
//     },

//     label: {
//       color: theme.colors.logoColor,
//       backgroundColor: 'white',
//       color: 'black',
//     },

//     viLogo: {
//       height: 40,
//       width: 100,
//       objectFit: 'contain',
//       backgroundColor: 'white',
//       borderRadius: 8,
//     },

//     footer: {
//       backgroundColor: 'white',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'flex-end',
//       width: '100%',
//       height: windowWidth > 500 ? 50 : 60,
//       paddingHorizontal: 10,
//       paddingBottom: 18,
//     },

//     footerText: {
//       fontWeight: 200,
//       color: 'black',
//       alignItems: 'flex-end',
//     },
//   });
// };

// export default SignInScreen;

import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Image, View, StyleSheet} from 'react-native';
import {
  HelperText,
  Text,
  TextInput,
  TouchableRipple,
  Snackbar,
  ActivityIndicator,
  MD2Colors,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {Base64} from 'js-base64';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userLogin} from '../../../features/auth/authThunks.js';
import {getWithSCPNumberHandler} from '../../../features/scp-user/scpUserThunk.js';

// const CustomSnackbar = ({}) => {
//   const [visible, setVisible] = useState(false);
//   const onToggleSnackBar = () => setVisible(!visible);

//   const onDismissSnackBar = () => setVisible(false);

//   return (
//     <View style={styles.snackContainer}>
//       <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
//       <Snackbar
//         style={styles.snackbar}
//         visible={visible}
//         onDismiss={onDismissSnackBar}
//         action={{
//           label: 'Close',
//           onPress: () => {
//             // Do something
//           },
//         }}>
//         Hey there! I'm a Snackbar.
//       </Snackbar>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   snackContainer: {
//     backgroundColor: 'red',
//     position: 'relative',
//     width: '100%',
//     bottom: 10,
//     zIndex: 1,
//   },
//   snackbar: {
//     backgroundColor: 'green',
//   },
// });

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading, user, error, success} = useSelector(state => state.auth);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [isToggleIcon, setIsToggleIcon] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const iconHandler = () => {
    setIsToggleIcon(!isToggleIcon);
  };

  // function decodeJWT(token) {
  //   try {
  //     const [payload] = token.split('.');
  //     const decoded = JSON.parse(Base64.decode(payload));
  //     return decoded;
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return null;
  //   }
  // }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required('Please enter your username')
      .uppercase(),
    password: Yup.string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/,
        'Password must contain 8-12 characters with uppercase, lowercase, numeric, and symbol',
      ),
  });

  const handleLogin = async (values, {setSubmitting, setErrors}) => {
    const {username, password} = values;
    try {
      if (username && password) {
        const response = await dispatch(
          userLogin({loginId: username, password}),
        );

        const {payload} = response;

        if (payload.status === 200) {
          await navigation.navigate('Home');
          return;
        }
      } else {
        setErrors({apiError: 'Invalid username or password.'});
      }
    } catch (error) {
      console.error('Login Error:', error);
      setErrors({apiError: 'Login failed. Please try again.'});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../../assets/images/software-logo.png')}
          style={styles.logo}
        />
        <Formik
          initialValues={{username: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={handleLogin}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <View style={styles.form}>
                <Text style={styles.signinText}>Sign In</Text>
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
                    value={values.username}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    // autoFocus={}
                    error={touched.username && errors.username}
                  />
                  {touched.username && errors.username ? (
                    <HelperText
                      style={{
                        color: 'red',
                        position: 'absolute',
                        top: 68,
                        left: 4,
                      }}
                      type="error"
                      visible={true}
                      padding="none">
                      {errors.username}
                    </HelperText>
                  ) : null}
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
                        color="black"
                      />
                    }
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={touched.password && errors.password}
                  />
                  {touched.password && errors.password ? (
                    <HelperText
                      style={{
                        color: 'red',
                        position: 'absolute',
                        top: 68,
                        left: 4,
                      }}
                      type="error"
                      visible={true}
                      padding="none">
                      {errors.password}
                    </HelperText>
                  ) : null}
                </View>

                <TouchableRipple
                  style={styles.button}
                  rippleColor="rgba(0, 0, 0, 0.32)"
                  onPress={handleSubmit}
                  disabled={isSubmitting}>
                  <LinearGradient
                    style={{width: '100%', height: '100%'}}
                    colors={['#006600', '#009900']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={styles.loginText}>
                      {isSubmitting ? 'Loading' : 'Login'}
                    </Text>
                  </LinearGradient>
                </TouchableRipple>

                <View style={styles.forgot}>
                  <View style={styles.forgotContent}>
                    <Text style={styles.lostPassword}>
                      You have lost your password?
                    </Text>
                    <Text style={styles.forgotPassword}>Forgot Password!</Text>
                  </View>
                </View>
                {errors.apiError && (
                  <HelperText
                    style={{color: 'red'}}
                    type="error"
                    visible={true}
                    padding="none">
                    {errors.apiError}
                  </HelperText>
                )}
              </View>
            </>
          )}
        </Formik>
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
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  logo: {
    resizeMode: 'contain',
  },
  signinText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    marginVertical: 14,
  },
  label: {
    fontWeight: 'bold',
  },
  forgot: {
    marginTop: 30,
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflow: 'hidden',
    marginTop: 30,
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  forgotContent: {
    alignItems: 'center',
  },
  lostPassword: {
    fontSize: 16,
    color: 'gray',
  },
  forgotPassword: {
    fontSize: 16,
    color: '#009900',
  },
  footer: {
    alignItems: 'center',
  },
  viLogo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  footerText: {
    marginTop: 10,
    color: 'gray',
    textAlign: 'center',
  },
});
