import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/rampage.json";

const initialState = [];

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addItem(state, action) {
			if (state.find((item) => item.name === action.payload.name));
			const item = {
				name: action.payload.name,
				price: action.payload.name.action,
				count: state.count++ || 0,
				image: action.payload.image,
			};
			return (state = [...state, item]);
		},
	},
});

const cartReducers = productSlice.reducer;

export const cartActions = cartSlice.actions;

export default cartReducers;
