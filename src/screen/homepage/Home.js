import React, { useEffect, useRef } from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from './Cart';
import Profile from './Profile';
import Store from './Store';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Gacha from './Gacha';
import * as Animatable from 'react-native-animatable';


const TabButton = (props) => {
  const {item, onPress, accessibilityState} = props
  const focused = accessibilityState.selected
  const viewRef = useRef(null)

useEffect(() => {
  if (focused) {
    viewRef.current.animate({0: {scale: 1}, 1: {scale: 1.25}})
  } else {
    viewRef.current.animate({0: {scale: 1.25}, 1: {scale: 1}})
  }
}, [focused])

  return (
    <TouchableOpacity 
    style={styles.container}
    onPress={onPress}
    activeOpacity={1}>
      <Animatable.View 
      ref={viewRef}
      duration={500}
      style={styles.container}>
      <Icon name={item.icon} size={item.size} color={focused? '#85607A': '#D194C2'}/>
      <Animatable.Text style={{fontSize: 10, paddingTop: 5}}>
        {item.label}
      </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

const Home = () => {

  const TabArr = [
    {route: 'Store', label: 'Store', component: Store, icon: 'store', size: 25, color: '#565656', id: 1},
    {route: 'Cart', label: 'Cart', component: Cart, icon: 'shopping-basket', size: 25, color: '#565656', id: 2},
    {route: 'Gacha', label: 'Gacha', component: Gacha, icon: 'coins', size: 25, color: '#565656', id: 3},
    {route: 'Profile', label: 'Profile', component: Profile, icon: 'user-alt', size: 25, color: '#565656', id: 4}
  ]
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Store"
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          height: 60
        }
      }}
      >
      {
        TabArr.map((item, index) => {
          return (
            <Tab.Screen key={item.id} name={item.route} component={item.component} 
            options={{
              tabBarButton: (props) => (
              <TabButton {...props} item={item} />
              )
            }}
            />
          )
        })
      }
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
