import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();
import Login from '../screens/login';
import Signup from '../screens/signup';
import Home from '../screens/home';
import InitialScreen from '../screens/initialScreen';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName={InitialScreen}>
        <Screen
          name="Inital"
          component={InitialScreen}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};
export default RootNavigator;
