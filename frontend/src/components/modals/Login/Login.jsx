import styles from "./Login.module.scss";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import TextInput from "../../UI/TextInput";
import { useReducer } from "react";

const loginReducer = (state, action) => {
	switch (action.type) {
		case "PASSWORD":
			state.password = action.password;
			break;
		case "USERNAME":
			state.username = action.username;
			break;
		default:
			alert("invalid value input");
	}
	return {
		username: state.username,
		password: state.password,
	};
};

//make this into a mini library
const regExp = {
	hasNumber: /\d/,
	hasLetter: /\w/,
	hasUppercase: /[A-Z]/,
	hasLowerCase: /[a-z]/,
	hasSpecialCharacter: /\W/,
	hasWhiteSpace: /\s/,
};

//PLACEHOLDER FUNCTION UNTIL POPUP MODAL IS CREATED
const notValidHanlder = (message) => {
	alert(message);
	return false;
};

const checkValidity = (action) => {
	const username = action.username;
	const password = action.password;

	//USERNAME CHECKS
	if (username.length < 5)
		return notValidHanlder("USERNAME MUST BE AT LEAST 5 CHARACTERS");
	if (regExp.hasWhiteSpace.test(username))
		return notValidHanlder("USERNAME CANNOT HAVE SPACES!");
	if (regExp.hasSpecialCharacter.test(username))
		return notValidHanlder("USERNAME CANNOT CONTAIN SPECIAL CHARACTERS!");
	if (password.length < 5)
		return notValidHanlder("USERNAME MUST BE AT LEAST 5 CHARACTERS");
	//PASSWORD CHECKS
	if (!regExp.hasSpecialCharacter.test(password))
		return notValidHanlder(
			"PASSWORD MUST CONTAIN AT LEAST 1 SPECIAL CHARACTER!"
		);
	if (regExp.hasWhiteSpace.test(password))
		return notValidHanlder("PASSWORD CANNOT HAVE SPACES!");
	if (
		!regExp.hasUppercase.test(password) ||
		!regExp.hasLowerCase.test(password)
	)
		return notValidHanlder(
			"PASSWORD HAVE BOTH LOWERCASE AND UPPERCASE CHARACTERS!"
		);
	return true;
};

const Login = (props) => {
	const [loginState, dispatchLogin] = useReducer(loginReducer, {});

	const usernameHandler = (event) => {
		const value = event.target.value;
		if (value.length >= 15) return;
		dispatchLogin({ type: "USERNAME", username: value });
		return;
	};

	const passwordHanlder = (event) => {
		const value = event.target.value;
		if (value.length >= 15) return;
		dispatchLogin({ type: "PASSWORD", password: value });
		return;
	};

	const loginHandler = (event) => {
		event.preventDefault();
		const checkIfValid = checkValidity(loginState);
		if (!checkIfValid) return;
		return alert("yay you logged in kinda"); //have login functions here
	};
	console.log(regExp);
	console.log(loginState);
	return (
		<Card>
			<section className={`${styles.login}`}>
				<form onSubmit={loginHandler} className={`${styles["login-form"]}`}>
					<TextInput
						id={"username"}
						placeholder={"USERNAME"}
						value={loginState.username || ""}
						onChange={usernameHandler}
					/>
					<TextInput
						id={"username"}
						placeholder={"PASSWORD"}
						value={loginState.password || ""}
						onChange={passwordHanlder}
					/>
					<Button className={styles[styles["login-btn"]]} type={"submit"}>
						LOGIN
					</Button>
				</form>
			</section>
		</Card>
	);
};
export default Login;
