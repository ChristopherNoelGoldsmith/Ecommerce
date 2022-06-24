import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

const useCart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((store) => store.cart);

	const getTotals = () => {
		dispatch(cartActions.getTotalCost());
		dispatch(cartActions.getTotalNumberOfItems());
		return;
	};

	const addItem = (item) => {
		dispatch(cartActions.addItem(item));
		getTotals();
		return;
	};

	const incrimentItem = (item) => {
		dispatch(cartActions.incrimentItem(item));
		getTotals();
		return;
	};

	const decrimentItem = (item) => {
		dispatch(cartActions.decrimentItem(item));
		getTotals();
		return;
	};

	const removeItem = (item) => {
		dispatch(cartActions.removeItem(item));
		getTotals();
		return;
	};

	//console.log(cart);

	return {
		cart,
		addItem,
		removeItem,
		incrimentItem,
		decrimentItem,
	};
};

export default useCart;
