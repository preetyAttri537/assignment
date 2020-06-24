import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import CustomDropdown from './customDropDown';
const InputField = ({
  onChangeText,
  placeholder,
  containerStyles,
  prefix,
  prefixData,
  onChangePrefix,
  error,
  value,
  secureTextEntry,
}) => {
  const [showLabel, setShowLabel] = useState(false);
  return (
    <View style={[styles.container, containerStyles]}>
      {value || showLabel ? (
        <Text style={styles.label}>{placeholder}</Text>
      ) : null}
      {prefix ? (
        <View style={styles.prefixWrapper}>
          <CustomDropdown
            containerStyles={styles.prefix}
            value={prefix}
            data={prefixData}
            itemColor="rgba(255,255,255,1)"
            selectedItemColor="rgba(255,255,255,1)"
            onChangeText={onChangePrefix}
          />
          <TextInput
            onFocus={() => setShowLabel(true)}
            onBlur={() => setShowLabel(false)}
            placeholder={showLabel ? '' : placeholder}
            placeholderTextColor={'#BDBDBD'}
            value={value}
            style={styles.inputFieldWithPrefix}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
          />
        </View>
      ) : (
        <TextInput
          onFocus={() => setShowLabel(true)}
          onBlur={() => setShowLabel(false)}
          placeholder={showLabel ? '' : placeholder}
          placeholderTextColor={'#BDBDBD'}
          value={value}
          style={styles.inputField}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: '100%',
    alignSelf: 'center',
  },
  label: {
    padding: 0,
    fontSize: 12,
    color: 'rgba(229, 201, 95, 0.8)',
  },
  inputField: {
    color: '#BDBDBD',
    padding: 0,
    paddingBottom: 10,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
  },
  inputFieldWithPrefix: {
    width: '85%',
    color: '#BDBDBD',
    paddingLeft: 10,
    margin: 0,
    paddingBottom: 5,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
  },
  error: {
    color: 'red',
    paddingTop: 6,
    fontSize: 14,
  },
  prefix: {width: '15%'},
  prefixWrapper: {flex: 1, flexDirection: 'row', alignItems: 'flex-end'},
});
