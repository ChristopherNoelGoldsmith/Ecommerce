import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./products";

const store = configureStore({
	reducer: {
		product: productReducers,
	},
});

export default store;
