import styles from "./CartButton.module.scss";
import Button from "../UI/Button";
import Cart from "../modals/Cart/Cart";
import useModal from "../hooks/useModal";
import useCart from "../hooks/useCart";
import { convertPricetoDollarAmount } from "../utilityScripts/priceUtil";

const CartButton = (props) => {
	const { createModal } = useModal();
	const { cart } = useCart();

	const itemsInCart = cart.totalItems;
	const cartTotal = cart.totalCost;
	const cartClass = itemsInCart > 0 ? styles.cart : "";
	const formattedPrice = convertPricetoDollarAmount(cartTotal);

	const modalHandler = () => {
		const cart = <Cart />;
		return createModal(cart);
	};

	return (
		<Button
			className={cartClass}
			cart-count={itemsInCart}
			cart-total={`$${formattedPrice}`}
			onClick={modalHandler}
		>
			<i className="fa-solid fa-cart-shopping"></i>
		</Button>
	);
};

export default CartButton;
