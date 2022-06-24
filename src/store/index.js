import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import modalReducer from "./modal";

const store = configureStore({
	reducer: {
		modal: modalReducer,
		cart: cartReducer,
	},
});

export default store;
