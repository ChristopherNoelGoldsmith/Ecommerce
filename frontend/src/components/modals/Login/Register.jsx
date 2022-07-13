import styles from "./Login.module.scss";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import TextInput from "../../UI/TextInput";
import useLogin from "../../hooks/useLogin";
import useModal from "../../hooks/useModal";
import useInput from "../../hooks/useInput";
import Login from "./Login";

const Register = (props) => {
	const { loginStatus, loginOrRegister } = useLogin();
	const { closeModal, createModal } = useModal();
	const {
		inputState,
		passwordConfirmHandler,
		passwordHanlder,
		emailHanlder,
		usernameHandler,
	} = useInput();

	const registerHandler = async (event) => {
		event.preventDefault();
		const registrationStatus = await loginOrRegister({
			type: "register",
			user: inputState,
		});
		console.log(loginStatus);
		if (registrationStatus.status !== "SUCCESS") return;
		if (loginStatus) return closeModal();
	};

	const loginModalHandler = async () => {
		const modal = <Login />;
		return createModal(modal, true);
	};

	return (
		<Card>
			<section className={`${styles.login}`}>
				<form onSubmit={registerHandler} className={`${styles["login-form"]}`}>
					<TextInput
						id={"username"}
						placeholder={"USERNAME"}
						value={inputState.username || ""}
						onChange={usernameHandler}
					/>
					<TextInput
						id={"password"}
						placeholder={"PASSWORD"}
						type={"password"}
						value={inputState.password || ""}
						onChange={passwordHanlder}
					/>
					<TextInput
						id={"passwordConfirm"}
						placeholder={"PASSWORD CONFIRM"}
						type={"password"}
						value={inputState.passwordConfirm || ""}
						onChange={passwordConfirmHandler}
					/>
					<TextInput
						id={"email"}
						placeholder={"EMAIL"}
						type={"email"}
						value={inputState.email || ""}
						onChange={emailHanlder}
					/>
					<figure>
						<Button
							onClick={loginModalHandler}
							className={styles[styles["login-btn"]]}
							type={"button"}
						>
							Back
						</Button>

						<Button id="register" type={"submit"}>
							Register
						</Button>
					</figure>
				</form>
			</section>
		</Card>
	);
};
export default Register;
