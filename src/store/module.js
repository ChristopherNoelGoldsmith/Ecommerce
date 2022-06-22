import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	content: null,
	vis: false,
};

const moduleSlice = createSlice({
	name: "module",
	initialState: initialState,
	reducers: {
		toggleVis(state) {
			state.vis = !state.vis;
			return;
		},
		setContent(state, action) {
			state.content = action.payload;
			return;
		},
	},
});

const moduleReducer = moduleSlice.reducer;

export const moduleActions = moduleSlice.actions;

export default moduleReducer;
