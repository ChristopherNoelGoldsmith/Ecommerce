import Button from "../UI/Button";
import useModal from "../hooks/useModal";
import Login from "../modals/Login/Login";
import styles from "./ProfileButton.module.scss";
import ProfileButtonDropdown from "./ProfileButtonDropdown";
import useLogin from "../hooks/useLogin";
import UserProfile from "../modals/UserProfile/UserProfile";

const ProfileButton = (props) => {
	const { createModal } = useModal();
	const { loginState } = useLogin();
	const modalHandler = () => {
		if (loginState.loginStatus === true) {
			const login = <UserProfile />;
			createModal(login);
			return;
		}
		const login = <Login />;
		createModal(login);
		return;
	};

	return (
		<Button
			username={loginState.username || "LOGIN"}
			className={`${styles["profile-btn"]}`}
			onClick={modalHandler}
		>
			<i className="fa-solid fa-user"></i>
			<ProfileButtonDropdown />
		</Button>
	);
};

export default ProfileButton;
