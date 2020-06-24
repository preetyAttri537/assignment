import React, {useCallback, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../components/customHeader';
import Input from '../../components/input';
import useFieldRequired from '../../hooks/useFieldRequired';
import ActivityIndicator from '../../components/activityIndicator';

const Login = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  /**
   * useFieldRequired is a custom hook that accept initial value
   *  and return that value, method to set that field value,
   *  method which validate field value and
   *  the error return by validate method if value is not valid
   */
  const [email, onChangeEmail, validateEmail, emailError] = useFieldRequired();

  const [
    password,
    onChangePassword,
    validatePassword,
    passwordError,
  ] = useFieldRequired();

  const handleLogin = useCallback(async () => {
    const isEmailValid = validateEmail(value => {
      const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      if (!value) {
        return 'Email is required.';
      } else if (!regex.test(value)) {
        return 'Please enter valid email';
      }
      return false;
    });
    const isPasswordValid = validatePassword('Please enter password');
    if (!isEmailValid && !isPasswordValid) {
      setLoader(true);
      let result = await AsyncStorage.getItem('User');
      if (!result) {
        setLoader(false);
        Alert.alert('Please sign up before login');
      } else {
        setLoader(false);
        result = JSON.parse(result);
        if (result.email !== email) {
          Alert.alert('Please sign up before login');
        } else if (result.password !== password) {
          Alert.alert('Password entered is wrong');
        } else {
          const dataToStore = {
            ...result,
            isLogin: true,
          };
          AsyncStorage.setItem('User', JSON.stringify(dataToStore));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            }),
          );
        }
      }
    }
  }, [validateEmail, validatePassword, email, password, navigation]);

  return (
    <View style={styles.container}>
      {loader && <ActivityIndicator animating />}
      <CustomHeader
        showLeftNavigation
        title={'Sign in'}
        navigation={navigation}
      />
      <View style={styles.formWrapper}>
        <View>
          <Input
            containerStyles={styles.input}
            placeholder={'Email Id'}
            value={email}
            onChangeText={onChangeEmail}
            error={emailError}
          />
          <Input
            containerStyles={styles.input}
            placeholder={'Password'}
            value={password}
            onChangeText={onChangePassword}
            error={passwordError}
            secureTextEntry
          />
          <TouchableOpacity style={styles.signInWrapper} onPress={handleLogin}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </View>
        <View style={styles.noAccountWrapper}>
          <Text style={styles.noAccountText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signUp}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  formWrapper: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  forgotPassword: {
    color: '#BDBDBD',
    textAlign: 'center',
    paddingTop: 20,
  },
  signInWrapper: {
    borderRadius: 10,
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(229, 201, 95, 0.8)',
  },
  signInText: {
    color: '#BDBDBD',
  },
  noAccountWrapper: {flexDirection: 'row', alignSelf: 'center'},
  noAccountText: {color: '#BDBDBD'},
  signUp: {color: 'rgba(229, 201, 95, 0.8)'},
});
