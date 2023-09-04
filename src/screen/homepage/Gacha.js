import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {summon, clear} from '../../slices/inventory';
import * as Animatable from 'react-native-animatable';
import GachaModal from '../../components/gacha_modal';

export default function Gacha() {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPrize, setCurrentPrize] = useState({})

  const inventory = useSelector(state => state.inventory);
  const ticket = inventory.ticket;
  const items = inventory.items;
  const {user} = useSelector(state => state.auth);
  const userid = user.user_id;
  const dispatch = useDispatch();
  console.log(inventory);

  callbackFunction = childData => {
    setModalVisible(childData);
  };

  const data = [
    {id: 1, userid: userid, name: 'Bookmark', image: 'https://epic7x.com/wp-content/uploads/2019/01/Covenant-Bookmark.png'},
    {id: 2, userid: userid, name: ' Skystone', image: 'https://epic7x.com/wp-content/uploads/2019/01/Skystone.png'},
    {id: 3, userid: userid, name: '50% coupon', image: 'https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-50--coupon-icon-image_1144359.jpg'}
  ]

  const handleSubmit = () => {
    let result = Math.random() * 100;
    if (result < 70) {
      dispatch(summon(data[0]));
      setCurrentPrize(data[0])
    } else if (result < 90) {
      dispatch(summon(data[1]));
      setCurrentPrize(data[1])
    } else {
      dispatch(summon(data[2]));
      setCurrentPrize(data[2])
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View >
          <View style={{flex: 1, flexDirection: 'row'}}>
            {items.map(item => (
              <View key={item.id} style={{padding: 20, flexDirection: 'row', height: 40}}>
                <Image source={{uri: item.image}} style={{width: 40, height: 40}}/>
                <Text style={{height: 40, marginTop: 10}}>
                  : {item.quantity}
                </Text>
              </View>
            ))}
          </View>
          <View style={{flex: 6, justifyContent: 'center', alignItems:'center'}}>
              {!modalVisible && 
              <Animatable.Image source={require('../../assets/images/gift.png')}
              animation="slideInDown" iterationCount='infinite' direction="alternate" duration={2000}
              style={{width:80, height: 80, }} />}
              {modalVisible && <GachaModal modalVisible={modalVisible} cb={callbackFunction} data={currentPrize}/>}
          </View>
          <View style={{flex: 1,alignItems: 'center',position: 'absolute', bottom: 20, right: -30, left: -30}}>
            <View>
              <TouchableOpacity
              style={styles.btn}
                disabled={ticket === 0 ? true : false}
                onPress={() => {
                  handleSubmit();
                  setModalVisible(true)
                }}>
                <Text style={styles.textStyle}>Summon ({ticket})</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(clear());
                }}>
                <Text>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 5,
    backgroundColor: '#2196F3',
    borderColor: '#1963B8'
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});
