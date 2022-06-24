import Button from "../UI/Button";
import useModal from "../hooks/useModal";
import Login from "../modals/Login/Login";

const ProfileButton = (props) => {
	const { createModal } = useModal();

	const modalHandler = () => {
		const login = <Login />;
		createModal(login);
		return;
	};

	return (
		<Button onClick={modalHandler}>
			<i className="fa-solid fa-user"></i>
		</Button>
	);
};

export default ProfileButton;
