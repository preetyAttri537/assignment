import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import CustomHeader from '../../../components/customHeader';

const Order = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader
        showLeftNavigation
        title={'Order'}
        navigation={navigation}
      />
      <Text style={styles.text}>Order</Text>
    </View>
  );
};
export default Order;

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
