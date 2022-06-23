import styles from "./CartFooter.module.scss";
import Button from "../../UI/Button";

const CartFooter = (props) => {
	return (
		<section className={`${styles["cart-footer"]}`}>
			<form>
				<label htmlFor="checkout">
					Checkout: <span>${props.totalCost}</span>
				</label>
				<span id="total-cost">{props.total}</span>
				<Button id="checout" type="submit"></Button>
			</form>
		</section>
	);
};

export default CartFooter;
