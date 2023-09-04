import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {setMessage} from './message';
import authService from '../services/auth.service';


export const register = createAsyncThunk(
  'auth/register',
  async ({username, email, password}, thunkAPI) => {
    try {
      console.log('abc');
      const res = await authService.register(username, email, password);
      thunkAPI.dispatch(setMessage(res.data.message));
      // log
      console.log(res.data);
      return res.data;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setMessage(message));
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async ({username, password}, thunkAPI) => {
    try {
      const data = await authService.login(username, password);
      console.log('data: ', data);
      return {user: data}
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setMessage(message));
    }
  },
);

export const update = createAsyncThunk(
  'auth/update',
  async ({username, email, phone, address}, thunkAPI) => {
    try {
      const data = await authService.update(username, email, phone, address);
      console.log('update data', data);
      return {user: data}
    } catch (e) {
      const message =
      (e.response && e.response.data && e.response.data.message) ||
      e.message ||
      e.toString();
    thunkAPI.dispatch(setMessage(message));
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const data =await authService.logout();
    console.log('logout data', data);
    return {user: data}
  } catch (e) {
    const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      thunkAPI.dispatch(setMessage(message));
  }
});


//wait
const initialState = {
  user: null,
  isLoggedIn: false
}


const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload.user
      })
      .addCase(update.rejected, (state, action) => {
        console.error('Update rejected:', action.error);
      })
  },
});



const {reducer} = authSlice;
export default reducer;
