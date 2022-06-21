import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/rampage.json";

const initialState = [];

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {},
});

const cartReducers = productSlice.reducer;

export const cartActions = cartSlice.actions;

export default cartReducers;
