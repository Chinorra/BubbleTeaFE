import React from 'react';
import Login from './screen/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screen/Register';
import Home from './screen/homepage/Home';
import { useSelector } from 'react-redux';
import { config, GluestackUIProvider } from '@gluestack-ui/themed';

const MainStack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()

const AuthStackContainer = () => {
  return (
    <AuthStack.Navigator 
    screenOptions={{
      headerShown: false,
    }}>
      <AuthStack.Screen name='Login' component={Login} />
      <AuthStack.Screen name='Register' component={Register} />
    </AuthStack.Navigator>
  )
}

const HomeStackContainer = () => {
  return (
    <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    >
      <HomeStack.Screen name='Home' component={Home}/>
    </HomeStack.Navigator>
  )
}


function App() {
  const authData = useSelector(state => state.auth.isLoggedIn)
  return (
    <GluestackUIProvider config={config.theme}>

    <NavigationContainer>
      <MainStack.Navigator 
      screenOptions={{
        headerShown: false,
      }}>
        {
          authData 
          ? <MainStack.Screen name='HomeScreen' component={HomeStackContainer}/>
          : <MainStack.Screen name='Auth' component={AuthStackContainer}/>
        }
      </MainStack.Navigator>
    </NavigationContainer>
    </GluestackUIProvider>

  );
}

export default App;

