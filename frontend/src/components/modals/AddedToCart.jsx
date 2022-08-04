import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./AddedToCart.module.scss";

const AddedToCart = (props) => {
	const cart = <i className="fa-solid fa-cart-shopping"></i>;
	return (
		<section className={`${styles.added}`}>
			<div className={`${styles.animations}`}>
				<figure>
					<LoadingSpinner content={cart} />
				</figure>
			</div>
		</section>
	);
};

export default AddedToCart;
