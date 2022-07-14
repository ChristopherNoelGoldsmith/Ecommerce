import styles from "./UserProfile.module.scss";
import Button from "../../UI/Button";
import useLogin from "../../hooks/useLogin";
import TextInput from "../../UI/TextInput";
import useInput from "../../hooks/useInput";
import Card from "../../UI/Card";
import useCookies from "../../hooks/useCookies";

const UserProfile = () => {
	const { loginState, logout, updatePassword } = useLogin();
	const [cookies, setCookie] = useCookies();
	const {
		inputState,
		passwordHanlder,
		passwordConfirmHandler,
		newPasswordHanlder,
	} = useInput();

	const updatePasswordHandler = (event) => {
		event.preventDefault();
		setCookie("loginToken");
		return updatePassword({
			id: cookies,

			password: inputState.password,
			newPassword: inputState.newPassword,
			newPasswordConfirm: inputState.passwordConfirm,
		});
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

				<Button type={"button"} onClick={logout}>
					LOGOUT!
				</Button>
			</section>
		</Card>
	);
};

export default UserProfile;
