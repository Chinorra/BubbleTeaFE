import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout, update} from '../../slices/auth';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {store} from '../../store';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import authHeader from '../../services/auth-header';

const Profile = () => {
  const dispatch = useDispatch();

  const user = store.getState();
  const {username, email, user_id, phone, address, avatar} = user.auth.user

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.number(),
    address: Yup.string(),
  });

  const initialValues = {
    username: username,
    email: email,
    phone: phone,
    address: address,
  };

  const [imageObj, setImageObj] = useState(avatar);
  console.log(imageObj, 'imgobj');
  const [isDisable, setIsDisable] = useState(false);

  const handleUpload = async image => {
    const data = new FormData();
    try {
      data.append('avatar', {
        name: image.fileName,
        type: image.type,
        uri: image.uri.replace('file://', ''),
        // uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
      });


      const res = await axios.post(
        `http://192.168.100.8:3000/user/upload/${user_id}`,
        data,
        {headers: authHeader()}
      );
     
      console.log('Axios response:', res.data);
    
    } catch (e) {
      console.log('error: ', e);
    }
  };

  useEffect(() => {
    if (imageObj == null) {
      return;
    } else {
      handleUpload(imageObj);
    }
  }, [imageObj]);

  const handleChangeAvatar = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        allowsEditing: true,
        quality: 0.8,
      },
      response => {
        if (response.didCancel == true) {
          return;
        } else {
          console.log('response', response);
          setImageObj(response.assets[0]);
        }
      },
    );
  };

  const handleChangeProfile = () => {
    setIsDisable(true);
  };

  const handleSubmitProfile = async formValue => {
    const {username, email, phone, address} = formValue;
    console.log(formValue, 'formvalue');
    setIsDisable(false);
    try {
      const res = await dispatch(update({username, email, phone, address}));
      console.log('res', res);
      if (res) {
        console.log('update successful');
        return
      }
    } catch (e) {
      Alert.alert('update error');
    }
  };

  const handleChangePassword = () => {};

  const handleLogout = async () => {
    try {
      await dispatch(logout());
    } catch (e) {
      console.log('logout error');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={handleChangeAvatar}>
              {imageObj == null ? (
                <Image
                  source={require('../../static/default.jpg')}
                  style={styles.avatar}
                />
              ) : (
                <Image source={{uri: imageObj.uri}} style={styles.avatar} />
              )}
            </TouchableOpacity>
            {/* <View style={styles.btnChangeProfile}>
            {
              isDisable ?
              <Button title="Save" onPress={handleSubmitProfile} style={styles.btnHeader}/>
              :

              <Button title="Change" onPress={handleChangeProfile} style={styles.btnHeader} color='#000'/>
            }
              </View> */}
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmitProfile}>
            {({handleSubmit, handleChange, handleBlur, values}) => (
              <>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  name="username"
                  style={styles.textInput}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  keyboardType="default"
                  editable={isDisable}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                  name="email"
                  style={styles.textInput}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="default"
                  editable={isDisable}
                />

                <Text style={styles.label}>Phone</Text>
                <TextInput
                  name="phone"
                  style={styles.textInput}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  keyboardType="default"
                  editable={isDisable}
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                  name="address"
                  style={styles.textInput}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  keyboardType="default"
                  editable={isDisable}
                />

                {isDisable ? (
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                      styles.button,
                      {backgroundColor: '#000', borderColor: '#000'},
                    ]}>
                    <Text style={[styles.text, {color: '#fff'}]}>Save</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleChangeProfile}
                    style={[
                      styles.button,
                      {backgroundColor: '#000', borderColor: '#000'},
                    ]}>
                    <Text style={[styles.text, {color: '#fff'}]}>Change Profile</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </Formik>
          <TouchableOpacity onPress={handleLogout} style={styles.button}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  container: {
    flex: 1,
    backgroundColor: '#FC3E47',
  },
  header: {
    flex: 1,
  },
  profileContainer: {
    flex: 7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  profileHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 100,
    marginTop: -60,
    marginLeft: '45%',
  },
  btnChangeProfile: {
    marginRight: 10,
  },
  btnHeader: {},
  label: {
    alignSelf: 'flex-start',
    marginLeft: '15%',
    color: '#808080',
  },
  textInput: {
    height: 40,
    width: '70%',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    fontWeight: 'bold',
  },
  button: {
    height: 40,
    width: '70%',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#D13B40',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    color: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#D13B40',
  },
});

export default Profile;
