import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDropdown = ({
  data = [],
  label,
  onChangeText,
  containerStyles,
  error,
  value,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    return () => {
      setShowPicker(false);
    };
  }, []);
  return (
    <View style={[styles.container, containerStyles]}>
      {value ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={styles.pickerStyle}
        onPress={() => setShowPicker(true)}>
        <Text style={styles.text}>{value ? value : label}</Text>
        <Icon name="chevron-right" color={'#BDBDBD'} size={19} />
      </TouchableOpacity>
      {showPicker && (
        <View style={styles.popUpStyle}>
          {data.map((item, index) => (
            <TouchableOpacity
              style={styles.item}
              key={index}
              onPress={() => {
                onChangeText(item.value);
                setShowPicker(false);
              }}>
              <Text>{item.label ? item.label : item.value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    alignSelf: 'center',
  },
  label: {
    padding: 0,
    fontSize: 12,
    color: 'rgba(229, 201, 95, 0.8)',
  },
  pickerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text: {color: '#BDBDBD'},
  item: {backgroundColor: 'white', padding: 10},
  popUpStyle: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
    zIndex: 2,
    borderRadius: 5,
  },
  margin: {
    marginTop: 8,
  },
  error: {
    color: 'red',
    paddingTop: 6,
    fontSize: 14,
  },
});

export default CustomDropdown;
