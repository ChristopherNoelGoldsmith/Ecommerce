import styles from "./ProfileButtonDropdown.module.scss";
import ListItem from "../UI/ListItem";

const ProfileButtonDropdown = (props) => {
	const loginState = false;

	return (
		<section className={`${styles["button-dropdown"]}`}>
			<ul>
				{loginState && <ListItem>Logout</ListItem>}
				{!loginState && <ListItem>Login</ListItem>}
			</ul>
		</section>
	);
};

export default ProfileButtonDropdown;
