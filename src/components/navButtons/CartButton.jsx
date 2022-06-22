import Button from "../UI/Button";
import Cart from "../module/Cart/Cart";

const CartButton = (props) => {
	const moduleHandler = () => {
		const cart = <Cart />;
		return props.populateModule(cart);
	};
	return (
		<Button onClick={moduleHandler}>
			<i className="fa-solid fa-cart-shopping"></i>
		</Button>
	);
};

export default CartButton;
