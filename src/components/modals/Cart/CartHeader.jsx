import styles from "./CartHeader.module.scss";
import image from "../../../assets/img/logo.png";

const CartHeader = (props) => {
	return (
		<header className={`${styles["cart-header"]}`}>
			<section>
				<h2>THANK YOU FOR SHOPPING WITH US!</h2>
			</section>
			<img src={image} alt="current set" srcset="" />
		</header>
	);
};

export default CartHeader;
