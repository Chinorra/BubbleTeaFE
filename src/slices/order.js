import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addToOrder: (state, action) => {
                return state={
                    ...action.payload,
                    quantity: 1
                }
            
        },
        addIce: (state, action) => {
            return state = {
                ...state,
                ice: action.payload.value
            }
        },
        addSugar: (state, action) => {
            return state = {
                ...state,
                sugar: action.payload.value
            }
        },
        increment: (state, action) => {
                return state = {
                    ...state,
                    quantity: state.quantity + 1
                }
            
        },
        decrement: (state, action) => {
            if (state.quantity === 0) {
                return state = {
                    ...state,
                    quantity: 0
                }
            } else {
                return state = {
                    ...state,
                    quantity: state.quantity - 1
                }
            }
        },
        remove: (state, action) => {
            console.log(state);
            console.log(action);
            const itemId = action.payload
            return state.filter(item => item.id !== itemId)
        },
        clear: (State) => {
            return {}
        }
    }
})

const { actions, reducer } = orderSlice

export const { addToOrder, addIce, addSugar, increment, decrement, remove, clear} = actions
export default reducer