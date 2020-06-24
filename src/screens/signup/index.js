import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

import CustomHeader from '../../components/customHeader';
import useFieldRequired from '../../hooks/useFieldRequired';
import CustomDropdown from '../../components/customDropDown';
import Input from '../../components/input';
const UnderLine = ({children}) => (
  <Text style={styles.underline}>{children}</Text>
);
const Signup = ({navigation}) => {
  const [
    firstName,
    onChangeFirstName,
    validateFirstName,
    firstNameError,
  ] = useFieldRequired();

  const [
    lastName,
    onChangeLastName,
    validateLastName,
    lastNameError,
  ] = useFieldRequired();

  const [email, onChangeEmail, validateEmail, emailError] = useFieldRequired();
  const [
    country,
    onChangeCountry,
    validateCountry,
    countryError,
  ] = useFieldRequired();
  const [
    password,
    onChangePassword,
    validatePassword,
    passwordError,
  ] = useFieldRequired();

  const [
    confirmPassword,
    onChangeconfirmPassword,
    validateConfirmPassword,
    confirmPasswordError,
  ] = useFieldRequired();
  const [
    termsCondition,
    onChangeTermsCondition,
    validateTermsCondition,
    termsConditionError,
  ] = useFieldRequired(false);

  const [prefix, onChangePrefix] = useFieldRequired('+91');

  const [
    mobile,
    onChangeMobile,
    validateMobile,
    mobileError,
  ] = useFieldRequired();

  const handleSignup = useCallback(async () => {
    const isEmailValid = validateEmail(value => {
      const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
      if (!value) {
        return 'Email is required.';
      } else if (!regex.test(value)) {
        return 'Please enter valid email';
      }
      return false;
    });
    const isValidFirstName = validateFirstName('Please enter first name');
    const isValidLastName = validateLastName('Please enter last name');
    const isValidMobile = validateMobile(value => {
      if (!value) {
        return 'Please enter mobile';
      } else if (!/^[0-9]*$/.test(value)) {
        return 'Please enter Numeric value';
      }
      return false;
    });
    const isValidCountry = validateCountry('Please enter country');
    const isValidPassword = validatePassword('Please enter password');
    validateTermsCondition('Please agree with aggrement');
    const isValidConfirmPassword = validateConfirmPassword(value => {
      if (!value) {
        return 'Please enter confirm password';
      } else if (value !== password) {
        return 'Confirm password should match password';
      } else {
        return false;
      }
    });
    if (
      !isEmailValid &&
      !isValidFirstName &&
      !isValidLastName &&
      !isValidMobile &&
      !isValidCountry &&
      !isValidPassword &&
      !isValidConfirmPassword &&
      termsCondition
    ) {
      const dataToStore = {
        firstName,
        lastName,
        email,
        country,
        password,
        mobile: `${prefix}${mobile}`,
      };
      let user = await AsyncStorage.getItem('User');
      if (user) {
        user = JSON.parse(user);
        if (user.email === email) {
          Alert.alert('Already exist');
        } else {
          AsyncStorage.setItem('User', JSON.stringify(dataToStore));
          navigation.navigate('Login');
        }
      } else {
        AsyncStorage.setItem('User', JSON.stringify(dataToStore));
        navigation.navigate('Login');
      }
    }
  }, [
    validateEmail,
    validateFirstName,
    validateLastName,
    validateMobile,
    validateCountry,
    validatePassword,
    validateTermsCondition,
    validateConfirmPassword,
    termsCondition,
    password,
    firstName,
    lastName,
    email,
    country,
    prefix,
    mobile,
    navigation,
  ]);

  return (
    <View style={styles.container}>
      <CustomHeader
        showLeftNavigation
        title={'Sign up'}
        navigation={navigation}
      />
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formWrapper}>
        <Input
          containerStyles={styles.input}
          placeholder={'First Name'}
          value={firstName}
          onChangeText={onChangeFirstName}
          error={firstNameError}
        />
        <Input
          containerStyles={styles.input}
          placeholder={'Last Name'}
          value={lastName}
          onChangeText={onChangeLastName}
          error={lastNameError}
        />
        <Input
          containerStyles={styles.input}
          placeholder={'Email Id'}
          value={email}
          onChangeText={onChangeEmail}
          error={emailError}
        />
        <CustomDropdown
          label={'Country'}
          containerStyles={styles.input}
          value={country}
          data={[{value: 'india'}, {value: 'usa'}, {value: 'uk'}]}
          itemColor="black"
          selectedItemColor="black"
          onChangeText={onChangeCountry}
          error={countryError}
        />
        <Input
          containerStyles={styles.input}
          placeholder={'Mobile Number'}
          value={mobile}
          onChangeText={onChangeMobile}
          error={mobileError}
          prefix={prefix}
          prefixData={[{value: '+91'}, {value: '+5'}]}
          onChangePrefix={onChangePrefix}
        />
        <Input
          containerStyles={styles.input}
          placeholder={'Password'}
          value={password}
          onChangeText={onChangePassword}
          error={passwordError}
          secureTextEntry
        />
        <Input
          containerStyles={styles.input}
          placeholder={'Confirm Password'}
          value={confirmPassword}
          onChangeText={onChangeconfirmPassword}
          error={confirmPasswordError}
          secureTextEntry
        />

        <View style={styles.footer}>
          <CheckBox
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            color={'#BDBDBD'}
            checked={termsCondition}
            onPress={() => onChangeTermsCondition(!termsCondition)}
            wrapperStyle={styles.checkBoxWrapper}
            containerStyle={styles.checkBoxContainer}
            size={30}
          />
          <View>
            <Text style={styles.termsCondition}>
              I certify that I am 18 years of age older. and agree to the
              <UnderLine> User Agreement</UnderLine> and
              <UnderLine> Privacy Policy</UnderLine>
            </Text>
          </View>
        </View>
        {termsConditionError && (
          <Text style={styles.error}>{termsConditionError}</Text>
        )}
        <TouchableOpacity style={styles.signInWrapper} onPress={handleSignup}>
          <Text style={styles.signUpText}>SIGN UP</Text>
        </TouchableOpacity>
        <View style={styles.alreadyMemeber}>
          <Text style={styles.alreadyMemeberText}>
            Already have an account yet?
          </Text>
          <TouchableOpacity>
            <Text style={styles.signIn}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  formWrapper: {
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
    marginTop: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(229, 201, 95, 0.6)',
  },
  signUpText: {
    color: '#BDBDBD',
  },
  footer: {
    marginTop: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  termsCondition: {
    marginRight: 50,
    fontSize: 12,
    color: '#BDBDBD',
  },
  error: {color: 'red', width: '100%', paddingLeft: 15},
  underline: {
    textDecorationLine: 'underline',
  },
  checkBoxWrapper: {
    width: 20,
    marginRight: 20,
  },
  checkBoxContainer: {padding: 0, margin: 0},
  rowDirection: {flexDirection: 'row'},
  alreadyMemeber: {flexDirection: 'row', alignSelf: 'center', marginTop: 20},
  alreadyMemeberText: {color: '#BDBDBD'},
  signIn: {color: 'rgba(229, 201, 95, 0.8)'},
});
