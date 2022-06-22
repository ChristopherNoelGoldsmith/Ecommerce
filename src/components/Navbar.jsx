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
						<Button>
							<Link to={"/"}>
								<i className="fa-solid fa-house-user"></i>
							</Link>
						</Button>
					</ListItem>
					<ListItem>
						<Button>
							<span>My Hero Academia</span>
						</Button>
					</ListItem>
					<ListItem>
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
						<CartButton populateModule={props.populateModule} />
					</ListItem>
				</ul>
			</section>
		</nav>
	);
};

export default Navbar;
