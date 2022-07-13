import { useReducer } from "react";

/*
///////////////////////////////
CONTROLS THE STATE OF THE INPUT
///////////////////////////////
*/
const inputReducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case "PASSWORD":
			state.password = action.password;
			break;
		case "USERNAME":
			state.username = action.username;
			break;
		case "EMAIL":
			state.email = action.email;
			break;
		case "PASSWORDCONFIRM":
			state.passwordConfirm = action.passwordConfirm;
			break;
		default:
			alert("invalid value input");
	}
	return {
		username: state.username,
		password: state.password,
		passwordConfirm: state.passwordConfirm,
		email: state.email,
	};
};

const useInput = () => {
	const [inputState, dispatchInput] = useReducer(inputReducer, {});

	/*--------------------------------------------------------------------
    WHEN CREATING A FORM OR SERIES OF INPUTS YOU CAN PICK HANDLERS FROM THIS COMPONENT
    AND UTILIZE THE STATE RETURNED VIA "inputState" TO HANDLE ACTIONS IN THE DOM

    TO ADD MORE HANDLERS ADD A HANDLER BELOW AND PLUG IN THE VALUES INTO THE REDUCER ABOVE.
    FOLLOW THE STANDARDS OF THE OTHER HANDLERS!
    */ //------------------------------------------------------------------

	const usernameHandler = (event) => {
		const value = event.target.value;
		if (value.length >= 15) return;
		dispatchInput({ type: "USERNAME", username: value });
		return;
	};

	const passwordHanlder = (event) => {
		const value = event.target.value;
		if (value.length >= 15) return;
		dispatchInput({ type: "PASSWORD", password: value });
		return;
	};

	const passwordConfirmHandler = (event) => {
		const value = event.target.value;
		if (value.length >= 15) return;
		dispatchInput({ type: "PASSWORDCONFIRM", passwordConfirm: value });
		return;
	};

	const emailHanlder = (event) => {
		const value = event.target.value;
		dispatchInput({ type: "EMAIL", email: value });
		return;
	};

	return {
		inputState,
		usernameHandler,
		passwordHanlder,
		passwordConfirmHandler,
		emailHanlder,
	};
};

export default useInput;
