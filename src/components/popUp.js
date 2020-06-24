import React, {useCallback} from 'react';
import {Text, StyleSheet, View, TouchableOpacity, Modal} from 'react-native';

import useFieldRequired from '../hooks/useFieldRequired';
import Input from './input';
const Popup = ({list, setList, setPopup}) => {
  const [
    amount,
    onChangeAmount,
    validateAmount,
    amountError,
  ] = useFieldRequired();

  const addAmount = useCallback(() => {
    const isValid = validateAmount(value => {
      if (!value) {
        return 'Please enter amount';
      } else if (!/^[0-9]*$/.test(value)) {
        return 'Please enter Numeric value';
      } else {
        return false;
      }
    });
    if (!isValid) {
      const array = [].concat(list);
      array[array.length - 1].amount = amount;
      setList(array);
      setPopup(false);
    }
  }, [amount, list, setList, setPopup, validateAmount]);
  return (
    <Modal visible={true} transparent>
      <View style={styles.container}>
        <View style={styles.popUp}>
          <Text>Enter numeric value</Text>
          <Input
            containerStyles={styles.input}
            placeholder={'Amount'}
            value={amount}
            onChangeText={onChangeAmount}
            error={amountError}
            secureTextEntry
          />

          <View style={[styles.buttonWrapper, styles.rowDirection]}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setPopup(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={addAmount}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default Popup;

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  popUp: {
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    backgroundColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    width: '80%',
    height: 300,
    justifyContent: 'space-between',
  },

  buttonWrapper: {
    marginVertical: 20,
  },
  cancelButton: {
    borderRadius: 10,
    paddingVertical: 15,
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#E5C95F',
  },
  button: {
    alignSelf: 'center',
    width: '40%',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'rgb(247,46,186)',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },

  rowDirection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
