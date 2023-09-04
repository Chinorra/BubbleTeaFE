import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/auth';
import messageReducer from './slices/message';
import cartReducer from './slices/cart'
import orderReducer from './slices/order'
import inventoryReducer from './slices/inventory'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    order: orderReducer,
    cart: cartReducer,
    inventory: inventoryReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }


const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
