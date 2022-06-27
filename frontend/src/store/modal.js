import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	content: null,
	vis: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState: initialState,
	reducers: {
		toggleVis(state) {
			state.vis = !state.vis;
		},
		setContent(state, action) {
			state.content = action.payload;
		},
		closeModal(state) {
			state.vis = false;
		},
	},
});

const modalReducer = modalSlice.reducer;

export const modalActions = modalSlice.actions;

export default modalReducer;
