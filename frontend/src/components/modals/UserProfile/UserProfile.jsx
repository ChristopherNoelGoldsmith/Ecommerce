import styles from "./UserProfile.module.scss";
import Button from "../../UI/Button";
import useLogin from "../../hooks/useLogin";
import TextInput from "../../UI/TextInput";
import useInput from "../../hooks/useInput";
import Card from "../../UI/Card";

const UserProfile = () => {
	const { loginState, logout } = useLogin();
	return (
		<Card>
			<section className={`${styles.profile}`}>
				<h2>{loginState.username}</h2>

				<form className={`${styles["change-password"]}`}>
					<h3>Change Your Passwrod</h3>
					<TextInput placeholder={"Current Password"} />
					<TextInput placeholder={"New Password"} />
					<TextInput placeholder={"New Password Confirm"} />
					<Button type={"submit"}>Change Password</Button>
				</form>

				<Button onClick={logout}>LOGOUT!</Button>
			</section>
		</Card>
	);
};

export default UserProfile;
