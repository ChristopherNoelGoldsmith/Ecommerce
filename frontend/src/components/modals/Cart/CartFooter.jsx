import styles from "./CartFooter.module.scss";
import Button from "../../UI/Button";
import useCart from "../../hooks/useCart";
import useModal from "../../hooks/useModal";
import AddedToCart from "../AddedToCart";

const CartFooter = (props) => {
	const { createCart } = useCart();
	const { modalWithCondition } = useModal();

	const addedToCartHandler = async (fn) => {
		const jsx = <AddedToCart />;
		await modalWithCondition(jsx, { callback: fn });
		return;
	};

	const checkout = async (event) => {
		event.preventDefault();
		//have message when not logged in
		await addedToCartHandler(createCart);
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
