import Button from "../UI/Button";
import useModal from "../hooks/useModal";
import Login from "../modals/Login/Login";
import styles from "./ProfileButton.module.scss";
import ProfileButtonDropdown from "./ProfileButtonDropdown";

const ProfileButton = (props) => {
	const { createModal } = useModal();

	const modalHandler = () => {
		const login = <Login />;
		createModal(login);
		return;
	};

	return (
		<Button className={`${styles["profile-btn"]}`} onClick={modalHandler}>
			<i className="fa-solid fa-user"></i>
			<ProfileButtonDropdown />
		</Button>
	);
};

export default ProfileButton;
