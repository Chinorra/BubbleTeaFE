import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Item from '../../components/cart_item';
import Note from '../../components/cart_note';
import CartModal from '../../components/cart_modal';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);

  callbackFunction = childData => {
    setModalVisible(childData);
  };

  const cartItems = useSelector(state => state.cart);
  console.log(cartItems, 'carttt');
  const {user} = useSelector(state => state.auth);
  const userid = user.user_id;

  useEffect(() => {
    const userCartItems = cartItems.filter(item => item.userid === userid);
    const prices = userCartItems.map(item => item.price * item.quantity);
    const total = prices.reduce((sum, current) => sum + current, 0);
    const formattedTotal = total.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    const totalQuantity = userCartItems
      .map(item => item.quantity)
      .reduce((sum, current) => sum + current, 0);
    setTotalPrice(formattedTotal);
    setTotalQuantity(totalQuantity);
    console.log(formattedTotal);
  }, [cartItems]);

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.centeredView}>
            {cartItems.length == 0 && !modalVisible && (
              <>
                <View style={styles.mt35}>
                  <Text style={styles.title}>
                    Get something to fulfill your cart!
                  </Text>
                  <Animatable.Image
                    source={require('../../assets/images/cartImg.jpeg')}
                    style={styles.image}
                    animation="tada"
                  />
                </View>
              </>
            )}
            {cartItems.map(item => {
              if (item.userid == userid && item.quantity > 0) {
                return (
                  <Item
                    productname={item.productname}
                    price={item.price}
                    key={item.id}
                    image={item.image}
                    quantity={item.quantity}
                    id={item.id}
                    ice={item.ice}
                    sugar={item.sugar}
                    userid={userid}
                  />
                );
              }
            })}

            {cartItems.length > 0 && (
              <Note
                totalPrice={totalPrice}
                totalQuantity={totalQuantity}
                cb={callbackFunction}
                modalVisible={modalVisible}
              />
            )}
            {modalVisible && (
              <CartModal modalVisible={modalVisible} cb={callbackFunction} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  mt35: {
    marginTop: '35%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 40,
  },
});

export default Cart;
