import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import CustomHeader from '../../../components/customHeader';

const Market = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CustomHeader
        showLeftNavigation
        title={'Market'}
        navigation={navigation}
      />
      <Text style={styles.text}>Market</Text>
    </View>
  );
};
export default Market;

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
