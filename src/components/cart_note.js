import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToInventory} from '../slices/inventory';
import {clear} from '../slices/cart';


const Note = ({totalPrice, totalQuantity, cb, modalVisible}) => {
  const [textNote, setTextNote] = useState('');
  
  const handlePayment = () => {
    dispatch(clear());
    cb(!modalVisible)
    dispatch(addToInventory({quantity: totalQuantity}));
  }

    const dispatch = useDispatch()
    return (
    <>
      <View
        style={styles.container}>
        <TextInput
          placeholder="Note..."
          style={styles.textInput}
          onChangeText={value => setTextNote(value)}
          value={textNote}
          keyboardType="default"
          multiline
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={handlePayment}
          style={styles.btnPay}>
          <Text style={styles.title}>Total: {totalPrice}</Text>
          <Text style={styles.title}>Thanh toan</Text>
        </TouchableOpacity>
      </View>
    </>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#fff',
        width: '95%',
        height: 50,
        borderWidth: 1,
      },
    title: {
        fontSize: 20,
        textAlign: 'center',
      },
    btnPay: {
        backgroundColor: 'orange',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 110,
        paddingVertical: 5,
        borderRadius: 5,
      }
})

export default Note