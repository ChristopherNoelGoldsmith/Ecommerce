import styles from "./Login.module.scss";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import TextInput from "../../UI/TextInput";
import { checkValidity } from "./loginUtilities";
import { useReducer } from "react";
import useLogin from "../../hooks/useLogin";
import useModal from "../../hooks/useModal";

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

const Login = (props) => {
	const [authState, dispatchAuth] = useReducer(loginReducer, {});
	const { login, registerAccount } = useLogin();
	const { closeModal } = useModal();
	const usernameHandler = (event) => {
		const value = event.target.value;
		if (value.length >= 15) return;
		dispatchAuth({ type: "USERNAME", username: value });
		return;
	};

	const passwordHanlder = (event) => {
		const value = event.target.value;
		if (value.length >= 15) return;
		dispatchAuth({ type: "PASSWORD", password: value });
		return;
	};

	const loginHandler = async (event) => {
		event.preventDefault();
		//BASIC VALIDATION -- MOVE TO SERVER!
		const checkIfValid = checkValidity(authState);
		if (!checkIfValid) return;
		//USER LOGIN!
		const loginStatus = await login(authState);
		if (loginStatus) return closeModal();
		//SHOULD ONLY TRIGGER IF INVALID LOGIN INFORMATION
		//OR A SERVER ISSUE
		console.log("login fail");
	};
	const registerHandler = async () => {
		const resistrationStatus = await registerAccount(authState);
		if (resistrationStatus.status !== "SUCCESS")
			return console.log("registration error");
		const loginStatus = await login(authState);
		if (loginStatus) return closeModal();
		console.log("registration failed");
	};
	return (
		<Card>
			<section className={`${styles.login}`}>
				<form onSubmit={loginHandler} className={`${styles["login-form"]}`}>
					<TextInput
						id={"username"}
						placeholder={"USERNAME"}
						value={authState.username || ""}
						onChange={usernameHandler}
					/>
					<TextInput
						id={"username"}
						placeholder={"PASSWORD"}
						value={authState.password || ""}
						onChange={passwordHanlder}
					/>
					<figure>
						<Button className={styles[styles["login-btn"]]} type={"submit"}>
							LOGIN
						</Button>

						<Button id="register" type={"button"} onClick={registerHandler}>
							Register
						</Button>
					</figure>
				</form>
			</section>
		</Card>
	);
};
export default Login;
