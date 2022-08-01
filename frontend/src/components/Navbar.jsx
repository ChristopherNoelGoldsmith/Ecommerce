import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import Button from "./UI/Button";
import ListItem from "./UI/ListItem";
import CartButton from "./navButtons/CartButton";
import ProfileButton from "./navButtons/ProfileButton";
import useModal from "./hooks/useModal";
import logo from "../assets/img/logo.png";

const Navbar = (props) => {
	const { closeModal } = useModal();
	return (
		<nav className={`${styles["navbar"]}`}>
			<section>
				<ul>
					<ListItem onClick={closeModal}>
						<Button>
							<Link to={"/"}>
								<img className={`${styles.logo}`} src={logo} alt="" />
							</Link>
						</Button>
					</ListItem>
					<ListItem onClick={closeModal}>
						<Link to={"/category"}>
							<Button>
								<span>All Items</span>
							</Button>
						</Link>
					</ListItem>
				</ul>

				<ul className={`${styles["user-btn-container"]}`}>
					<ListItem>
						<ProfileButton />
					</ListItem>
					<ListItem>
						<CartButton />
					</ListItem>
				</ul>
			</section>
		</nav>
	);
};

export default Navbar;
