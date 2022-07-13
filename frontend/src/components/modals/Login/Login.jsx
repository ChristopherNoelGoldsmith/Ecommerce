import styles from "./Login.module.scss";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import TextInput from "../../UI/TextInput";
import { checkValidity } from "./loginUtilities";
import useLogin from "../../hooks/useLogin";
import useModal from "../../hooks/useModal";
import Register from "./Register";
import useInput from "../../hooks/useInput";

//TODO have css styles to make inputs red when invalid input is added

const Login = (props) => {
	const { loginOrRegister } = useLogin();
	const { closeModal, createModal } = useModal();
	const { inputState, usernameHandler, passwordHanlder } = useInput();
	const loginHandler = async (event) => {
		event.preventDefault();
		//VALIDATION 1 )
		const checkIfValid = checkValidity(inputState);
		if (!checkIfValid) return;
		//LOGIN 1 )
		const loginStatus = await loginOrRegister({
			type: "login",
			user: inputState,
		});
		if (loginStatus) return closeModal();
		// INVALID LOGIN 1 )
		//TODO: change to pop up or modal
		return alert("INVALID LOGIN INFORMATION");
	};
	//FOR CHANGING TO THE REGISTRATION MODAL
	const registerModalHandler = async () => {
		const modal = <Register />;
		return createModal(modal, true);
	};
	return (
		<Card>
			<section className={`${styles.login}`}>
				<form onSubmit={loginHandler} className={`${styles["login-form"]}`}>
					<TextInput
						id={"username"}
						placeholder={"USERNAME"}
						value={inputState.username || ""}
						onChange={usernameHandler}
					/>
					<TextInput
						id={"username"}
						placeholder={"PASSWORD"}
						type={"password"}
						value={inputState.password || ""}
						onChange={passwordHanlder}
					/>
					<figure>
						<Button className={styles[styles["login-btn"]]} type={"submit"}>
							LOGIN
						</Button>

						<Button
							id="register"
							type={"button"}
							onClick={registerModalHandler}
						>
							No Account?
						</Button>
					</figure>
				</form>
			</section>
		</Card>
	);
};
export default Login;
