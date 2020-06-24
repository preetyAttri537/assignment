import React, {useEffect} from 'react';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import ActivityIndicator from '../../components/activityIndicator';

const Initialize = ({navigation}) => {
  useEffect(() => {
    const chackUserIsLogin = async () => {
      let result = await AsyncStorage.getItem('User');
      if (!result) {
        /**
         * this reset the stack and push Login stack at 0
         */
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Login',
              },
            ],
          }),
        );
      } else {
        result = JSON.parse(result);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: result.isLogin ? 'Home' : 'Login',
              },
            ],
          }),
        );
      }
    };
    chackUserIsLogin();
  }, [navigation]);

  return <ActivityIndicator animating />;
};
export default Initialize;
