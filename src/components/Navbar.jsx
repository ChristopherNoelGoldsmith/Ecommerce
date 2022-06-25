import styles from "./Navbar.module.scss";
import { Route, Routes, NavLink, Link } from "react-router-dom";
import Button from "./UI/Button";
import ListItem from "./UI/ListItem";
import CartButton from "./navButtons/CartButton";
import CategoryButton from "./navButtons/CategoryButton";
import ProfileButton from "./navButtons/ProfileButton";
import useModal from "./hooks/useModal";
import logo from "../assets/img/logo.png";

const Navbar = (props) => {
	const { closeModal } = useModal();

	const closeModalHandler = () => {
		closeModal();
		return;
	};

	return (
		<nav className={`${styles.navbar}`}>
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
						<Button>
							<NavLink to={"/category"}>
								<span>Crimson Rampage</span>
							</NavLink>
						</Button>
					</ListItem>
				</ul>

				<ul className={`user-btn-container`}>
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
