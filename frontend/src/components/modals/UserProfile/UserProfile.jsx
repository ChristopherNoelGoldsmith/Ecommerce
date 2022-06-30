import styles from "./UserProfile.module.scss";
import Button from "../../UI/Button";
import useLogin from "../../hooks/useLogin";

const UserProfile = () => {
	const { loginState, logout } = useLogin();
	return (
		<section className={`${styles.profile}`}>
			<h2>{loginState.username}</h2>
			<Button onClick={logout}>LOGOUT!</Button>
		</section>
	);
};

export default UserProfile;
