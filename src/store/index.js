import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./products";
import moduleReducer from "./module";

const store = configureStore({
	reducer: {
		product: productReducers,
		module: moduleReducer,
	},
});

export default store;
