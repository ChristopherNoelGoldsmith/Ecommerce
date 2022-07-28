import styles from "./Navbar.module.scss";
import { NavLink, Link } from "react-router-dom";
import Button from "./UI/Button";
import ListItem from "./UI/ListItem";
import CartButton from "./navButtons/CartButton";
import CategoryButton from "./navButtons/CategoryButton";
import ProfileButton from "./navButtons/ProfileButton";
import useModal from "./hooks/useModal";
import logo from "../assets/img/logo.png";
import { useState } from "react";

const Navbar = (props) => {
	const { closeModal } = useModal();
	const [navClass, setNavClass] = useState(null);
	const [scrollPos, setScrollPos] = useState();

	window.onscroll = () => {
		let currentScrollPos = window.pageYOffset;
		setScrollPos(window.pageYOffset);
		if (currentScrollPos <= scrollPos) {
			return setNavClass(null);
		}
		return setNavClass("hidden");
	};

	return (
		<nav className={`${styles["navbar"]} ${styles[navClass]}`}>
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
						<NavLink to={"/category"}>
							<Button>
								<span>All Items</span>
							</Button>
						</NavLink>
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
