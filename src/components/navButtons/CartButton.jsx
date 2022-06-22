import Button from "../UI/Button";
import Cart from "../module/Cart/Cart";
import useModule from "../hooks/useModule";

const CartButton = (props) => {
	const { createModule } = useModule();

	const moduleHandler = () => {
		const cart = <Cart />;
		return createModule(cart);
	};
	return (
		<Button onClick={moduleHandler}>
			<i className="fa-solid fa-cart-shopping"></i>
		</Button>
	);
};

export default CartButton;
