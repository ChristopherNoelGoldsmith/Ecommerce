import styles from "./Navbar.module.scss";
import { Route, Routes, NavLink, Link } from "react-router-dom";
import Button from "./UI/Button";
import ListItem from "./UI/ListItem";
import CartButton from "./navButtons/CartButton";
import CategoryButton from "./navButtons/CategoryButton";
import ProfileButton from "./navButtons/ProfileButton";

const Navbar = (props) => {
	return (
		<nav>
			<section>
				<ul>
					<ListItem>
						<Button>My Hero Academia</Button>
					</ListItem>
					<ListItem>
						<Button>Crimson Rampage</Button>
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
