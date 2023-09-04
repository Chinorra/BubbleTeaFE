import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/';

const register = async (username, email, password) => {
  const res = await axios.post(API_URL + 'register', {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  try {
    const res = await axios.post(API_URL + 'login', {
      username,
      password,
    });
    console.log('resss',res);
    if (res.data.accessToken) {
      return res.data;
    } else {
      console.log('Login error');
      return null;
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

const update = async (username, email, phone, address) => {
  try {
    console.log('updateee');
    const res = await axios.patch(API_URL + 'user/update', {
      username,
      email,
      phone,
      address
    },
    {headers: authHeader() }
    )
    console.log('update res', res);
    if (res.data) {
      return res.data
    } else {
      console.log('update errorr');
      return 
    }
  } catch (error) {
    console.log('update errorrr', error);
    throw error
  }
}

const logout = async () => {
  try {
    console.log('Logout successful');
    return {};
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

const authService = {
  register,
  login,
  update,
  logout,
};

export default authService;
