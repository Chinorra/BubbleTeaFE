import React, {useState} from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image} from 'react-native';
const GachaModal = ({modalVisible, cb, data}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom:40}}>
              <Text>You have got a reward!</Text>
            </View>
            <View style={{alignItems:'center'}}>
            <Image source={{uri: data.image}} style={{width:100, height: 100}}/>
            <Text style={{paddingTop: 20}} >{data.name}</Text>
            </View>
            <View style={{marginTop:40}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => cb(!modalVisible)}>
              <Text style={styles.textStyle}>Continue!</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 90,
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
    marginTop: 20,
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

export default GachaModal;
