import styles from "./UserProfile.module.scss";
import Button from "../../UI/Button";
import useLogin from "../../hooks/useLogin";

const UserProfile = () => {
	const { logout } = useLogin();

	return (
		<section className={`${styles.profile}`}>
			<Button onClick={logout}>LOGOUT!</Button>
		</section>
	);
};

export default UserProfile;
