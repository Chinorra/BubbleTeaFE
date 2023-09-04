import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconCom from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { register } from '../slices/auth';
import { clearMessage } from '../slices/message';
import {LinearGradient} from 'react-native-linear-gradient';


const Register = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    email: Yup.string().required('This field is required'),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/,
        'Must Contain 7 Characters, One Uppercase, One Lowercase, One Number',
      ),
  });

  const handleLogin = (formValue) => {
    const {username, email, password} = formValue
    console.log(username, password);
    setLoading(true)
    try {
     dispatch(register({username, email, password}))
      navigation.navigate('Login')
      console.log('register success');
    } catch (e) {
      console.log('login error', e);
    } finally {
      setLoading(false)
    }
  }

  const navigation = useNavigation();
  return (
    <>
      <LinearGradient
    start={{x: 0, y: 1}}
    end={{x: 1, y: 0}}
    colors={[  '#D8FFBE', '#D6FF56', ]}
    style={styles.LinearGradient}
    >
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
      <Image
          source={require('../assets/images/register_img.jpeg')}
          style={styles.imgRegister}
        />
        <View style={styles.loginContainer}>
          <Text style={styles.solgan}>Register here!</Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
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
                {errors.username && touched.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <View style={styles.wrapInput}>
                <IconCom name="email" size={16} color="#900" />
                <TextInput
                  name="email"
                  placeholder="Email"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="default"
                />
                </View>
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <View style={styles.wrapInput}>
                <Icon name="lock" size={20} color="#900" />
                <TextInput
                  name="password"
                  placeholder="Password"
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                  </View>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  style={styles.btn}
                >
                  <Text style={styles.textBtn}>Register</Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 20,
                  }}>
                  <Text style={{fontSize: 14}}>Already have an account?</Text>
                  <TouchableOpacity
                    style={styles.navigate}
                    onPress={() => {
                      navigation.navigate('Login');
                    }}>
                    <Text style={{fontSize: 14, color: '#0D5C33'}}>
                      {' '}
                      Login here
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
  imgRegister: {
    height: 200,
    width: 300, 
    borderRadius: 10
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
  },
  solgan: {
    fontSize: 20, 
    fontFamily:'Baloo2-Bold'
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
    
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  navigate: {
    fontSize: 10,
  },
  btn: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: '#0D5C33',
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

export default Register;
