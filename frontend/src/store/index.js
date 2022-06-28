import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import loginReducer from "./login";
import modalReducer from "./modal";

const store = configureStore({
	reducer: {
		modal: modalReducer,
		cart: cartReducer,
		login: loginReducer,
	},
});

export default store;
