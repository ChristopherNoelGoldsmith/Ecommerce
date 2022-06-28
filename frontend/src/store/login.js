import { createSlice } from "@reduxjs/toolkit";

const initialState = { loginStatus: false, username: "" };

const loginSlice = createSlice({
	name: "login",
	initialState: initialState,
	reducers: {
		logout(state) {
			state.loginStatus = false;
			state.username = "";
		},
		login(state, actions) {
			const { username } = actions.payload;
			state.loginStatus = true;
			state.username = username;
		},
	},
});

const loginReducer = loginSlice.reducer;

export const loginActions = loginSlice.actions;

export default loginReducer;
