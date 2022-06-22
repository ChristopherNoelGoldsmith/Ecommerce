import { createSlice } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const initialState = {
	content: null,
	vis: false,
};

//Used to get rid of middleware error created by custome slice
const customeMiddleware = getDefaultMiddleware({
	serializableCheck: false,
});

const moduleSlice = createSlice({
	name: "module",
	initialState: initialState,
	reducers: {
		toggleVis(state) {
			state.vis = !state.vis;
			return state;
		},
		setContent(state, action) {
			state.content = action.payload;
			return state;
		},
	},
});

const moduleReducer = moduleSlice.reducer;

export const moduleActions = moduleSlice.actions;

export default moduleReducer;
