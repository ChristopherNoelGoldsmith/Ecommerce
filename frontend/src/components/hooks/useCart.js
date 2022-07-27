import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import useCookies from "./useCookies";
import { loadStripe } from "@stripe/stripe-js";

const useCart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((store) => store.cart);
	const cookies = useCookies();
	const mount = "https://allmightyccg.herokuapp.com/api/v1"; //	"http://localhost:1337/api/v1"; //
	/*
	/////////////////////////////////////////////////////////////////////////////////
	---------------FUNCTIONS HANDLING THE CART STORE FUNCTIONS-----------------------	
	/////////////////////////////////////////////////////////////////////////////////

	*/

	//RETURNS THE TOTAL FROM THE STORE
	const getTotals = () => {
		dispatch(cartActions.getTotalCost());
		dispatch(cartActions.getTotalNumberOfItems());
		return;
	};

	//ADDS AN ITEM TO THE STORE
	const addItem = (item) => {
		dispatch(cartActions.addItem(item));
		getTotals();
		return;
	};

	//INCREASES THE ITEM QUANTITY IN THE CART BY 1
	const incrimentItem = (item) => {
		dispatch(cartActions.incrimentItem(item));
		getTotals();
		return;
	};

	//DECREASES THE ITEM QUANTITY IN THE CART BY 1
	const decrimentItem = (item) => {
		dispatch(cartActions.decrimentItem(item));
		getTotals();
		return;
	};

	//REMOVES THE TARGET ITEM FROM THE STORE
	const removeItem = (item) => {
		dispatch(cartActions.removeItem(item));
		getTotals();
		return;
	};

	/*
	/////////////////////////////////////////////////////////////////////////////////
	--------------------------ASYNC FUNCTIONS----------------------------------------	
	/////////////////////////////////////////////////////////////////////////////////

	 * 1: WRITES THE PRODUCTS IN THE CART TO THE USERS PROFILE IN THE DATABASE
	 * 2: REDIRECTS THE USER TO THE CHECKOUT SCREEN TO COMPLETE THE TRANSACTION
	 * 'loginToken' IS USED TO VERYIFY USER ON SERVER SIDE
	TODO: PERSIST CART ON LOGIN.  ON LOGIN USE 'useEffect' HOOK TO EXTRACT CART FROM DB AND ADD IT TO THE CART STATE!
	 */
	const createCart = async () => {
		try {
			// STRIPE 1 ) LOADS STRIPE
			const stripe = await loadStripe(
				"pk_test_51LNCVkL4WOl3po2AOH348VofF0FucaDm2iKFDd2EBYkP7EgdKQcuVdmBPEOZHsXzY3kcgx8TOA9IZwxki6jY334Y00LHUcVhoI"
			);

			const { cartContents } = cart;
			const { loginToken } = cookies;
			console.log(cartContents);
			// DATA HANDLING 1 ) WRITES CART TO THE USER IN DATABASE
			const createUsersCart = await fetch(`${mount}/users/cart`, {
				headers: {
					Authorization: `Bearer ${loginToken}`,
					"Content-Type": "application/json",
				},
				method: "PATCH",
				body: JSON.stringify({
					cart: cartContents,
				}),
			}).then((res) => res.json());
			//STRIPE 2 ) REDIRECTS TO CHECKOUT WITH THE SESSION ID RETURNED BY 'createUsersCart'
			await stripe.redirectToCheckout({
				sessionId: createUsersCart.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	//SETS THE USERS CART TO AN EMPTY ARRAY IN THE DB
	const clearCart = async () => {
		try {
			const { loginToken } = cookies;
			await fetch(`${mount}/users/cart`, {
				headers: {
					Authorization: `Bearer ${loginToken}`,
					"Content-Type": "application/json",
				},
				method: "DELETE",
			});
		} catch (error) {
			console.log(error);
		}
	};

	//TODO: MAKE THIS
	const persistCart = () => {};

	return {
		cart,
		createCart,
		persistCart,
		addItem,
		removeItem,
		incrimentItem,
		decrimentItem,
		clearCart,
	};
};

export default useCart;
