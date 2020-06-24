import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import CustomHeader from '../../../components/customHeader';

const More = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader showLeftNavigation title={'More'} navigation={navigation} />
      <Text style={styles.text}>More</Text>
    </View>
  );
};
export default More;

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
