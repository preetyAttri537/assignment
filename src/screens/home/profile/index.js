import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import CustomHeader from '../../../components/customHeader';

const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader
        showLeftNavigation
        title={'Profile'}
        navigation={navigation}
        showLogout
      />
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
