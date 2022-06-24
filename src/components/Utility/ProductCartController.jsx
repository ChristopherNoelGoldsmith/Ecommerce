/*
ADD OPTION TO CHANGE TYPE OF BUTTON WITH FIT WITH
ITS TYPE OF FUNCTION
*/

import styles from "./ProductCartController.module.scss";
import Button from "../UI/Button";
import useCart from "../hooks/useCart";

const ProductCartController = (props) => {
	const { addItem } = useCart();
	const addItemHandler = (event) => {
		event.preventDefault();
		//targets first value of the event object which is the count input
		const itemCountValue = event.target[0].value;

		//converts props into format for the cartSlice in the store provided by the useCart hook.
		const item = {
			name: props.productName,
			price: props.productPrice,
			count: props.productAmount,
			image: props.productImage,
		};
		if (props.removeItem) return props.removeItem({ target: item });
		addItem({ target: item, count: itemCountValue });
		props.resetProductHandler();
		return;
	};
	return (
		<form onSubmit={addItemHandler}>
			<label htmlFor="price">
				$ <span>{props.productPrice}</span>
			</label>
			<input type="none" name={"count"} readOnly value={props.productAmount} />
			<div className={`${styles["btn-container"]}`}>
				<Button
					type={"reset"}
					className={`${styles["add-btn"]}`}
					onClick={props.incrimentProductHandler}
				>
					+
				</Button>
				<Button
					type={"reset"}
					className={`${styles["remove-btn"]}`}
					onClick={props.decrimentProductHandler}
				>
					-
				</Button>
			</div>
			<Button className={`${styles["to-cart-btn"]}`} type={"submit"}>
				{props.icon}
			</Button>
		</form>
	);
};

export default ProductCartController;
