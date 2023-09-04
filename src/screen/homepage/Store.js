import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import authHeader from '../../services/auth-header';
import { useSelector} from 'react-redux';
import Modall from '../../components/store_modal';
import GetLocation from 'react-native-get-location'
import * as Animatable from 'react-native-animatable';
import Item from '../../components/store_item';


const {width: screenWidth} = Dimensions.get('window')

const Store = () => {
  const [text, setText] = useState('');
  const [item, setItem] = useState([]);
  const [location, setLocation] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [banner, setBanner] = useState([])

  const bannerRef = useRef(null)

  callbackFunction = childData => {
    setModalVisible(childData);
  };

  const {user} = useSelector(state => state.auth);
  const userid = user.user_id;

  useEffect(() => {
    getItemList().then(data => {
      setItem(data);
    });
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
  })
  .then(location => {
      console.log(location);
      setLocation(JSON.stringify(location))
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
  }, []);

  useEffect(() => {
    //get data from server (do after)
    const bannerImg = [
      {
        image: <Image source={require('../../static/banner1.webp')} resizeMode='contain' style={{width: screenWidth, height:'100%'}} />
      },
      {
        image: <Image source={require('../../static/banner5.jpeg')} resizeMode='contain' style={{width: screenWidth, height:'100%'}} />
      },
      {
        image: <Image source={require('../../static/banner4.jpeg')} resizeMode='contain' style={{width: screenWidth, height:'100%'}} />
      }
    ]

    setBanner(bannerImg)
  }, [])

  // let index = 0
  // const startAutoScroll = () => {
  //     timer = setInterval(() => {
  //       bannerRef.current.scrollTo({ x: index * screenWidth, y: 0, animated: true });
  //       index = (index + 1) % banner.length;
  //     }, 4000);
    
  // }
 
  // useEffect(() => {
  //   startAutoScroll()
  //   console.log('scrollinggg');
  // }, [])

  const getItemList = async () => {
    const response = await axios.get(`http://192.168.100.8:3000/user/product`, {
      headers: authHeader(),
    });
    const result = response.data;
    return result;
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.background}>
          <View>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.topText}>Your location: {location}</Text>
            <Text style={styles.topText}>What is your command?</Text>
          </View>
          <View>
            <TextInput
              placeholder="search"
              style={styles.search}
              value={text}
              onChangeText={text => setText(text)}
            />
          </View>
          <Text style={[styles.header, {marginTop: 15}]}>Banner</Text>
            <ScrollView
            horizontal
            pagingEnabled
            ref={bannerRef}
            contentContainerStyle={{width: screenWidth * banner.length, height: 300}}
            >
              {
                banner.map((item, index) => (
                  <View key={index.toString()}>
                  {item.image}
                  </View>
                )
                  )
                }
              </ScrollView>
          <View style={styles.list}>
            <Text style={styles.header}>Items</Text>
            {item.map((item, index) => {
              if (
                text == '' ||
                item.productname.toLowerCase().includes(text.toLowerCase())
              ) {
                return (
                  <Animatable.View animation='fadeInRight' delay={500 * index} key={item._id}>
                  <Item
                    productname={item.productname}
                    price={item.price}
                    image={item.image}
                    id={item._id}
                    userid={userid}
                    modalVisible={modalVisible} 
                    cb={callbackFunction}
                    />
                    </Animatable.View>
                );
              } 
            })}

            <Modall modalVisible={modalVisible} cb={callbackFunction} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  topText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Baloo2-Bold',
  },
  search: {
    justifyContent: 'center',
    borderWidth: 1,
    height: 40,
    borderRadius: 40,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
  list: {
    backgroundColor:'#FBBBFF'
  },
  header: {
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 30,
  },
});

export default Store;
