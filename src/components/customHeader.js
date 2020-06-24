import React from 'react';
import {View, StyleSheet, Text, StatusBar, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';

const CustomHeader = ({
  title,
  showLeftNavigation,
  navigation,
  onPress,
  centerIcon,
  titleStyle,
  backgroundColor = '#101010',
  showLogout,
}) => {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      {showLeftNavigation && (
        <Icon
          name="chevron-left"
          color={'#BDBDBD'}
          size={40}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              BackHandler.exitApp();
            }
          }}
        />
      )}
      <View style={styles.titleWrapper}>
        {centerIcon && (
          <Icon
            name="cards-diamond"
            color={'#EEB743'}
            size={20}
            style={styles.icon}
            onPress={onPress}
          />
        )}
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      <Icon
        name={showLogout ? 'logout' : 'chevron-left'}
        color={showLogout ? 'white' : backgroundColor}
        size={showLogout ? 30 : 40}
        onPress={async () => {
          if (showLogout) {
            let result = await AsyncStorage.getItem('User');
            result = JSON.parse(result);
            const dataToStore = {
              ...result,
              isLogin: false,
            };
            AsyncStorage.setItem('User', JSON.stringify(dataToStore));
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
          }
        }}
      />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  title: {
    color: '#BDBDBD',
    fontSize: 28,
  },
  icon: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
