import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {increment, decrement, addIce, addSugar} from '../slices/order';
import { addToCart } from '../slices/cart';
import RadioForm from 'react-native-simple-radio-button';

const Modall = ({modalVisible, cb}) => {
  const dispatch = useDispatch();
  const orderItem = useSelector(state => state.order);
  console.log('orderitem', orderItem);
  console.log(modalVisible);

  const [iceValue, setIceValue] = useState('');
  const [sugarValue, setSugarValue] = useState('');
  console.log('iceValue', iceValue, 'sugarValue', sugarValue);
  const ice_props = [
    {label: '0% ice', value: '0% ice'},
    {label: '30% ice', value: '30% ice'},
    {label: '50% ice', value: '50% ice'},
    {label: '70% ice', value: '70% ice'},
    {label: '100% ice', value: '100% ice'},
  ];

  const sugar_props = [
    {label: '0% sugar', value: '0% sugar'},
    {label: '30% sugar', value: '30% sugar'},
    {label: '50% sugar', value: '50% sugar'},
    {label: '70% sugar', value: '70% sugar'},
    {label: '100% sugar', value: '100% sugar'},
  ];

  const toppingData = [
    {type: 'ice', label: 'Ice', radioProps: ice_props, value: iceValue},
    {type: 'sugar', label: 'Sugar', radioProps: sugar_props, value: sugarValue},
  ];

  const Item = ({productname, price, image, id, userid, quantity}) => (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <Image src={image} style={styles.image} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{productname}</Text>
        <Text style={styles.price}>
          Price:{' '}
          {price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </Text>
        <View style={styles.btnList}>
          <TouchableOpacity
            onPress={() => dispatch(decrement({id}))}
            style={styles.btn}>
            <Text style={styles.title}>-</Text>
          </TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles.title}>{quantity}</Text>
          </View>

          <TouchableOpacity
            onPress={() => dispatch(increment({id}))}
            style={styles.btn}>
            <Text style={styles.title}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.modalText}>Add Item</Text>
              <Pressable
                onPress={() => cb(!modalVisible)}
                style={{marginLeft: '25%'}}>
                <Icon name="close" size={25} color="#900" />
              </Pressable>
            </View>
            <Item
              productname={orderItem.productname}
              price={orderItem.price}
              key={orderItem._id}
              image={orderItem.image}
              id={orderItem._id}
              userid={orderItem.userid}
              quantity={orderItem.quantity}
            />
            <FlatList
              style={styles.option}
              data={toppingData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.form}>
                  <View style={styles.topping}>
                    <Text>{item.label}</Text>
                  </View>
                  <RadioForm
                    radio_props={item.radioProps}
                    initial={item.value}
                    onPress={value => {
                      if (item.type === 'ice') {
                        setIceValue(value);
                        dispatch(addIce({value}));
                      } else if (item.type === 'sugar') {
                        setSugarValue(value);
                        dispatch(addSugar({value}));
                      }
                    }}
                  />
                </View>
              )}
            />

            <View style={styles.btnAdd}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  dispatch(addToCart(orderItem));
                  
                  cb(!modalVisible);
                }}>
                <Text style={styles.textStyle}>Add to Cart</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: '35%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  modalText: {
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Baloo2-Bold',
    fontSize: 20,
    marginLeft: '35%',
  },
  item: {
    flex: 0.3,
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 2,
    alignItems: 'flex-start',
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Baloo2-SemiBold',
  },
  price: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'Baloo2-SemiBold',
  },
  btn: {
    backgroundColor: 'fff',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 5,
  },
  btnList: {
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    marginLeft: 20,
  },
  form: {
    paddingBottom: 20,
  },
  topping: {
    backgroundColor: '#C0C0C0',
    width: 300,
    padding: 8,
    marginBottom: 8,
  },
  btnAdd: {
    paddingVertical: 15,
  },
});

export default Modall;
