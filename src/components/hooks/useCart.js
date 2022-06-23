import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

const useCart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((store) => store.cart);

	const getTotalCost = () => {
		dispatch(cartActions.getTotalCost());
		return;
	};

	const addItem = (item) => {
		dispatch(cartActions.addItem(item));
		getTotalCost();
		return;
	};

	const removeItem = (item) => {
		dispatch(cartActions.removeItem(item));
		getTotalCost();
		return;
	};

	console.log(cart);

	return { cart, addItem, removeItem };
};

export default useCart;
