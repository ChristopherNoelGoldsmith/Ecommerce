import styles from "./CartFooter.module.scss";
import Button from "../../UI/Button";

const CartFooter = (props) => {
	return (
		<section className={`${styles["cart-footer"]}`}>
			<form>
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
