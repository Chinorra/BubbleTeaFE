import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {decrement, increment, remove} from '../slices/cart';
import { useDispatch } from 'react-redux';

const Item = ({
    productname,
    price,
    image,
    quantity,
    id,
    ice,
    sugar,
    userid,
  }) => {
    const dispatch = useDispatch()

    const handleDecrement = () => {
        dispatch(decrement({id, userid, ice, sugar}));
              dispatch(remove());
    }

    const handleIncrement = () => {
        () => dispatch(increment({id, userid, ice, sugar}))
    }
    return (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <Image src={image} style={styles.image} />
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{productname}</Text>
        <Text style={styles.option}>
          {ice} {sugar}
        </Text>
        <Text style={styles.price}>Price: {price}</Text>
        <View style={styles.btnList}>
          <TouchableOpacity
            onPress={handleDecrement}
            style={styles.btn}>
            <Text style={styles.title}>-</Text>
          </TouchableOpacity>
          <View style={styles.btn}>
            <Text style={styles.title}>{quantity}</Text>
          </View>

          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.btn}>
            <Text style={styles.title}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    )
  };

  const styles = StyleSheet.create({
    
    item: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 8,
      borderRadius: 5,
      borderBottomWidth: 0.5,
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
    textInput: {
      padding: 10,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
    },
    option: {
      fontSize: 16,
      color: 'gray',
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
    btnList: {
      flexDirection: 'row',
    },
  });

  export default Item