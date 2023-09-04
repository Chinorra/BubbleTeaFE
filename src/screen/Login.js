import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {clearMessage} from '../slices/message';
import {login} from '../slices/auth';
import {LinearGradient} from 'react-native-linear-gradient';

const Login = props => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true)


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/, ' '),
  });

  const handleLogin = async (formValue) => {
    const {username, password} = formValue;
    console.log(username, password);
    setLoading(true);
    try {
      const res = await dispatch(login({username, password}));
      console.log('res', res);
      if (res) {
        console.log('login success');
      }
    } catch (e) {
      Alert.alert('login error');
      console.log('login error', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LinearGradient
    start={{x: 0, y: 1}}
    end={{x: 1, y: 0}}
    colors={['#e6b980', '#eacda3']}
    style={styles.LinearGradient}
    >

      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/login_img.jpg')}
          style={styles.imgLogin}
          />
          </View>
        <View style={styles.loginContainer}>
          <Text style={styles.solgan}>
          Login to join with us!
          </Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isValid,
            }) => (
              <>
                <View style={styles.wrapInput}>
                <Icon name="user" size={20} color="#900" />
                <TextInput
                  name="username"
                  placeholder="Username"
                  style={styles.textInput}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  keyboardType="default"
                />
                
                </View>
                <View style={styles.wrapInput}>
                <Icon name="lock" size={20} color="#900" />
                <TextInput
                  name="password"
                  placeholder="Password"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity 
                onPress={() => setSecureTextEntry(state => !state)}
                >
                  {
                    secureTextEntry ?
                    <Icon name="eye-slash" size={20} color="#900"/>
                    :
                    <Icon name="eye" size={20} color="#900"/>
                  }
                </TouchableOpacity>
                </View>
                
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={styles.btn}>
                  <Text style={styles.textBtn}>Login</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 20,
                  }}>
                  <Text style={{fontSize: 14}}>Haven't had account yet?</Text>
                  <TouchableOpacity
                    style={styles.navigate}
                    onPress={() => {
                      navigation.navigate('Register');
                    }}>
                    <Text style={{fontSize: 14, color: '#8F4526'}}>
                      {' '}
                      Register here
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    paddingVertical: '20%',
    
  },
  loginContainer: {
    flex: 2,
    width: '80%',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
    
  },
  imgLogin: {
    height: 200,
    width: 300, 
    borderRadius: 10
  },
  solgan: {
    fontSize: 20, 
    fontFamily: 'Baloo2-Bold'
  },
  wrapInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 10,
  },
  textInput: {
   paddingLeft: 10,
    width: '85%'
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  navigate: {},
  btn: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: '#B79079',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    padding: 10,
  },
  textBtn: {
    textAlign: 'center',
    fontWeight: '700', 
    fontSize: 16, 
    color: '#fff'
  },
});

export default Login;
