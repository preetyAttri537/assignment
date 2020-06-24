import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const ActivityIndicatorComponent = ({animating}) => {
  return (
    <View style={styles.loadingContainer}>
      <View style={[styles.loadingSubContainer]}>
        <ActivityIndicator
          color={'#101010'}
          animating={animating}
          size="large"
        />
      </View>
    </View>
  );
};
export default ActivityIndicatorComponent;

const styles = StyleSheet.create({
  loadingContainer: {
    borderWidth: 1,
    backgroundColor: '#101010',
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
  loadingSubContainer: {
    backgroundColor: 'white',
    height: 80,
    width: 80,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
