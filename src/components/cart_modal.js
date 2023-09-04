import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
} from 'react-native';
import MapView from 'react-native-maps';
const CartModal = ({modalVisible, cb}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.center}>
              {/* <MapView
                style={{flex: 1, width: '400%', height: '40%'}}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -12.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              /> */}
              <Text style={styles.text}>Your order is coming soon!</Text>
              <Image
                source={require('../assets/images/payImg.jpeg')}
                style={styles.image}
              />
              <Text style={styles.mt20}>You have got ticket to summon!</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => cb(!modalVisible)}>
              <Text style={styles.textStyle}>Got it</Text>
            </Pressable>
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
    marginTop: 22,
  },
  mt20: {
    marginTop: 20,
  },
  center: {
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 60,
    paddingVertical: 40,
    alignItems: 'center',
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
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 50,
  },
  image: {
    width: 160, 
    height: 120
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CartModal;
