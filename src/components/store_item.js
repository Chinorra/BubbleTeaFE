import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import { addToOrder } from '../slices/order';

const Item = ({productname, price, image, id, userid, modalVisible, cb}) => {

    const dispatch = useDispatch()

    const handleAddToOrder = () => {
        dispatch(addToOrder({productname, price, image, id, userid}));
        cb(!modalVisible)
      }
    return (
    <Animatable.View style={styles.item}>
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
        <TouchableOpacity
          onPress={handleAddToOrder}
          style={styles.btn}>
          <Text style={styles.title}>Add</Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
)
};

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 8,
      borderRadius: 10,
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
      fontSize: 20,
    },
    price: {
      fontSize: 16,
      marginTop: 10,
    },
    btn: {
      backgroundColor: 'fff',
      borderWidth: 1,
      marginTop: 10,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 5,
    },
  });

  export default Item