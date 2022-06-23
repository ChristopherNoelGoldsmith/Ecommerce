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

	const incrimentItem = (item) => {
		dispatch(cartActions.incrimentItem(item));
		getTotalCost();
		return;
	};

	const decrimentItem = (item) => {
		dispatch(cartActions.decrimentItem(item));
		getTotalCost();
		return;
	};

	const removeItem = (item) => {
		dispatch(cartActions.removeItem(item));
		getTotalCost();
		return;
	};

	//console.log(cart);

	return { cart, addItem, removeItem, incrimentItem, decrimentItem };
};

export default useCart;
