import { configureStore } from "@reduxjs/toolkit";
import moduleReducer from "./module";

const store = configureStore({
	reducer: {
		module: moduleReducer,
	},
});

export default store;
