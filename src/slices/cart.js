import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const {id, userid, ice, sugar} = action.payload;
            console.log(state, 'cart state');
            console.log('payload', action.payload);
            const find = state.find(item => item.id === id && item.userid === userid && item.ice === ice && item.sugar === sugar)
            console.log(find, 'find');
            if (find) {
                return state.map(item => 
                    item.id === id && item.userid === userid && item.ice === ice && item.sugar === sugar
                    ? {
                        ...item,
                        quantity: item.quantity + action.payload.quantity
                    }
                    : item
                )
            } else {
                state.push({
                    ...action.payload,
                    quantity: action.payload.quantity
                })
            }
        },
        increment: (state, action) => {
            const {id, userid, ice, sugar} = action.payload;
            return state.map(item =>
                (item.id === id && item.userid === userid && item.ice === ice && item.sugar === sugar)
                ? {
                    ...item,
                    quantity: item.quantity + 1
                }
                : item
                )
        },
        decrement: (state, action) => {
            const {id, userid, ice, sugar} = action.payload;
            return state.map(item =>
                (item.id === id && item.userid === userid && item.ice === ice && item.sugar === sugar)
                ? {
                    ...item,
                    quantity: item.quantity - 1
                }
                : item
                )
        },
        remove: (state, action) => {
            return state.filter(item => item.quantity !== 0)
        },
        clear: (State) => {
            return []
        }
    }
})

const { actions, reducer } = cartSlice

export const { addToCart, increment, decrement, remove, clear} = actions
export default reducer