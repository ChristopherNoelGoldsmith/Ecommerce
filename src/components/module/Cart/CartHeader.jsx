import styles from "./CartHeader.module.scss";

const CartHeader = (props) => {
	return (
		<header className={`${styles["cart-header"]}`}>
			<section>
				<h2>THANK YOU FOR SHOPPING WITH US!</h2>
			</section>
			<img src="current set" alt="current set" srcset="" />
		</header>
	);
};

export default CartHeader;
