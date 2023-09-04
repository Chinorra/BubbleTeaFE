import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ticket: 0,
    items: []
}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: initialState,
    reducers: {
        summon: (state, action) => {
            const {id, userid} = action.payload;
            console.log(state, 'invent state');
            console.log('invent payload', action.payload);
            const find = state.items.find(item => item.id === id && item.userid === userid)
            console.log(find, 'find');
            
            if (find) {
                state.items = state.items.map(item => 
                    item.id === id && item.userid === userid
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
                )
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1
                })
            }
             state.ticket -= 1
        },
        addToInventory: (state, action) => {
            return state = {
                ...state,
                ticket: state.ticket + action.payload.quantity
            }
        },
        clear: (state, action) => {
            state.items = state.items.map(item => ({
                ...item,
                quantity: 0
            }))
            state.ticket = 0
        }
    }
})

const { actions, reducer } = inventorySlice

export const {summon, addToInventory, clear} = actions
export default reducer