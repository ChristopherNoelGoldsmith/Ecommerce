import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./AddedToCart.module.scss";

/*
//////////////////////////////////
THE LOADING SPINNER THAT ACTIVATES
WHEN ADDING PRODUCTS TO THE CART
OR WHEN CHECKING OUT

TODO: ADD COLOR RED ON ERROR
//////////////////////////////////
*/

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
