import React, {useState, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomHeader from '../../../components/customHeader';
import PopUp from '../../../components/popUp';

const Portfolio = ({navigation}) => {
  const [list, setList] = useState([]);
  const [showPop, setPopup] = useState(false);

  /**
   * Add amount to the list depending on type is withdraw or submit
   */
  const addAmount = useCallback(
    type => {
      const array = [].concat(list);
      array.push({type: type});
      setList(array);
      setPopup(true);
    },
    [list],
  );
  return (
    <View style={styles.container}>
      <CustomHeader
        showLeftNavigation
        title={'Algorand'}
        centerIcon
        titleStyle={styles.titleStyle}
        backgroundColor={'#1F2021'}
        navigation={navigation}
      />
      <View style={styles.mainContainer}>
        {showPop && <PopUp list={list} setList={setList} setPopup={setPopup} />}
        <View style={styles.topView}>
          <Text style={styles.algo}>0.00 ALGO</Text>
          <Text style={styles.dollar}>$0.00</Text>
        </View>
        <View style={[styles.buttonWrapper, styles.rowDirection]}>
          <TouchableOpacity
            style={styles.depositButton}
            onPress={() => addAmount('deposit')}>
            <Text style={styles.depositButtonText}>DEPOSIT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addAmount('withdraw')}>
            <Text style={styles.depositButtonText}>WITHDRAW</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.buttonWrapper, styles.rowDirection]}>
          <Text style={styles.recentTransaction}>Recent Transactions</Text>
          <View style={[styles.allWrapper, styles.rowDirection]}>
            <Text style={styles.all}>All</Text>
            <Icon name="chevron-right" color={'#BDBDBD'} size={20} />
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          {list.map((item, index) => (
            <View style={styles.cardView} key={index}>
              <View style={[styles.rowDirection, styles.alignStart]}>
                <Icon
                  name={item.type === 'withdraw' ? 'percent' : 'arrow-collapse'}
                  color={'white'}
                  size={15}
                  style={
                    item.type === 'withdraw' ? styles.icon : styles.iconDeposit
                  }
                />
                <View style={[styles.rowDirection, styles.tradeWrapper]}>
                  <View>
                    <Text style={styles.tradeFee}>Trade Fee</Text>
                    <Text style={styles.date}>BCH-USD | Oct 14, 2019</Text>
                  </View>
                  <View style={styles.charges}>
                    <Text style={styles.tradeFee}>
                      {item.type === 'withdraw' ? '-' : '+'}${item.amount}
                    </Text>
                    <Text style={styles.date}>$0.00</Text>
                  </View>
                </View>
              </View>
              <View />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    backgroundColor: '#101010',
  },
  titleStyle: {color: 'white', fontSize: 20},
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  topView: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#1F2021',
    padding: 20,
  },
  algo: {
    color: 'white',
    fontSize: 25,
  },
  dollar: {
    paddingTop: 10,
    fontSize: 18,
    color: '#BDBDBD',
  },
  rowDirection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    marginVertical: 20,
  },
  depositButton: {
    borderRadius: 10,
    paddingVertical: 15,
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#E5C95F',
  },
  depositButtonText: {
    fontSize: 18,
    color: 'white',
  },
  button: {
    alignSelf: 'center',
    width: '40%',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'rgb(247,46,186)',
  },
  recentTransaction: {
    color: '#BDBDBD',
  },
  allWrapper: {
    width: '20%',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: '#1F2021',
  },
  all: {
    color: '#BDBDBD',
    fontSize: 12,
  },
  cardView: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#1F2021',
    padding: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  icon: {
    backgroundColor: 'rgb(247,46,186)',
    borderRadius: 2,
    padding: 2,
  },
  iconDeposit: {
    backgroundColor: '#E5C95F',
    borderRadius: 2,
    padding: 2,
  },
  tradeWrapper: {marginLeft: 10, flex: 1},
  alignStart: {alignItems: 'flex-start'},
  tradeFee: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  date: {
    marginTop: 5,
    color: '#BDBDBD',
    fontSize: 14,
  },
  charges: {alignItems: 'center'},
  modal: {
    margin: 40,
  },
});
