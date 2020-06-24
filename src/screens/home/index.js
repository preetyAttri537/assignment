import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';

import Markets from './markets';
import More from './more';
import Profile from './profile';
import Portfolio from './portfolio';
import Orders from './orders';

const Tab = createBottomTabNavigator();

export default function Home(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#1F2021',
          margin: 0,
          height: 70,
          paddingBottom: 15,
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          elevation: 0,
          shadowColor: '#5bc4ff',
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
        },
        activeTintColor: '#E5C95F',
        inactiveTintColor: 'white',
        labelStyle: {
          fontSize: 12,
        },
      }}
      initialRouteName={'Portfolio'}>
      <Tab.Screen
        name="Markets"
        component={Markets}
        options={{
          tabBarLabel: 'Markets',
          tabBarIcon: ({color, size}) => (
            <Icon name="linechart" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarLabel: 'Portfolio',
          tabBarIcon: ({color, size}) => (
            <Icon name="piechart" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({color, size}) => (
            <Icon name="menuunfold" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        props={props.navigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icons name="user" color={color} size={18} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        props={props.navigation}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({color, size}) => (
            <Icons name="more-vertical" color={color} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
