import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import moduleReducer from "./module";

const store = configureStore({
	reducer: {
		module: moduleReducer,
		cart: cartReducer,
	},
});

export default store;
