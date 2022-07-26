import styles from "./CartFooter.module.scss";
import Button from "../../UI/Button";
import useCart from "../../hooks/useCart";

const CartFooter = (props) => {
	const { createCart } = useCart();

	const checkout = async (event) => {
		event.preventDefault();
		await createCart();
	};

	return (
		<section className={`${styles["cart-footer"]}`}>
			<form onSubmit={checkout}>
				<label htmlFor="checkout">
					<span>${props.totalCost}</span>
				</label>
				<span id="total-cost">{props.total}</span>
				<Button id="checkout" className={`${styles.checkout}`} type="submit">
					<span>Checkout</span> <i class="fa-solid fa-cart-shopping"></i>
				</Button>
			</form>
		</section>
	);
};

export default CartFooter;
