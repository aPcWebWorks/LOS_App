import React, {useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {Image, View, StyleSheet} from 'react-native';
import {
  HelperText,
  Text,
  TextInput,
  TouchableRipple,
  ActivityIndicator,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {userLogin} from '../../../features/auth/authThunks.js';

const SignInScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [isToggleIcon, setIsToggleIcon] = useState(false);
  const {isError, error} = useSelector(state => state.auth) || '';

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

  const handleLogin = async (values, {setSubmitting}) => {
    const {username, password} = values;

    await dispatch(userLogin({loginId: username, password}));
    setSubmitting(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../../../assets/images/software-logo.png')}
          style={styles.logo}
        />
        {isError && <Text style={{color: 'red'}}>{isError?.responseMsg}</Text>}
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
            isValid,
          }) => (
            <>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  ref={usernameRef}
                  label={<Text style={styles.label}>Username*</Text>}
                  textColor="black"
                  mode="outlined"
                  outlineStyle={{borderWidth: 1.5}}
                  value={values.username}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={touched.username && errors.username}
                />
                {touched.username && errors.username && (
                  <HelperText
                    style={styles.helperText}
                    type="error"
                    visible={true}>
                    {errors.username}
                  </HelperText>
                )}

                <TextInput
                  style={styles.input}
                  ref={passwordRef}
                  label={<Text style={styles.label}>Password*</Text>}
                  secureTextEntry={!isToggleIcon}
                  mode="outlined"
                  outlineStyle={{borderWidth: 1.5}}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <Icon
                          name={isToggleIcon ? 'visibility-off' : 'visibility'}
                          size={20}
                          color="black"
                          onPress={() => setIsToggleIcon(!isToggleIcon)}
                        />
                      )}
                    />
                  }
                />
                {touched.password && errors.password && (
                  <HelperText
                    style={styles.helperText}
                    type="error"
                    visible={true}>
                    {errors.password}
                  </HelperText>
                )}

                <TouchableRipple
                  style={styles.button}
                  rippleColor="rgba(0, 0, 0, 0.32)"
                  onPress={handleSubmit}
                  disabled={isSubmitting || !isValid}>
                  <LinearGradient
                    style={{width: '100%', height: '100%'}}
                    colors={['#006600', '#009900']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}>
                    <Text style={styles.loginText}>
                      {isSubmitting ? (
                        <ActivityIndicator color="white" />
                      ) : (
                        'Login'
                      )}
                    </Text>
                  </LinearGradient>
                </TouchableRipple>

                {errors.apiError && (
                  <HelperText
                    style={styles.helperText}
                    type="error"
                    visible={true}>
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
    position: 'relative',
    // top: 40,
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
    color: 'black',
    textAlign: 'center',
  },
});
