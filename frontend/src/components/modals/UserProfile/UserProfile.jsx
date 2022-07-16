import styles from "./UserProfile.module.scss";
import Button from "../../UI/Button";
import useLogin from "../../hooks/useLogin";
import TextInput from "../../UI/TextInput";
import useInput from "../../hooks/useInput";
import Card from "../../UI/Card";
import useCookies from "../../hooks/useCookies";
import useModal from "../../hooks/useModal";

const UserProfile = () => {
	const { loginState, logout, updatePassword } = useLogin();
	const { closeModal } = useModal();
	const cookies = useCookies();

	const {
		inputState,
		passwordHanlder,
		passwordConfirmHandler,
		newPasswordHanlder,
	} = useInput();

	const updatePasswordHandler = async (event) => {
		event.preventDefault();
		//setCookie("loginToken");
		const passwordChanged = await updatePassword({
			id: cookies.loginToken,
			password: inputState.password,
			newPassword: inputState.newPassword,
			newPasswordConfirm: inputState.passwordConfirm,
		});

		if (passwordChanged.token) {
			logout();
			cookies.clear();
			closeModal();
		}
		return;
	};

	const logoutHandler = () => {
		closeModal();
		logout();
		return;
	};

	return (
		<Card>
			<section className={`${styles.profile}`}>
				<h2>{loginState.username}</h2>

				<form
					onSubmit={updatePasswordHandler}
					className={`${styles["change-password"]}`}
				>
					<h3>Change Your Passwrod</h3>
					<TextInput
						value={inputState.password}
						placeholder={"Current Password"}
						onChange={passwordHanlder}
					/>
					<TextInput
						value={inputState.newPassword}
						placeholder={"New Password"}
						onChange={newPasswordHanlder}
					/>
					<TextInput
						value={inputState.passwordConfirm}
						placeholder={"New Password Confirm"}
						onChange={passwordConfirmHandler}
					/>
					<Button type={"submit"}>Change Password</Button>
				</form>

				<Button type={"button"} onClick={logoutHandler}>
					LOGOUT!
				</Button>
			</section>
		</Card>
	);
};

export default UserProfile;
