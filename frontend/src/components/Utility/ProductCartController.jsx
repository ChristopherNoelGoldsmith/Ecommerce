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
		console.log(props.productId);
		//converts props into format for the cartSlice in the store provided by the useCart hook.
		const item = {
			name: props.productName,
			price: props.productPrice,
			count: props.productAmount,
			image: props.productImage,
			id: props.productId,
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
			<figure className={`${styles["product-btns"]}`}>
				<input
					type="none"
					name={"count"}
					className={`${styles["product-input"]}`}
					readOnly
					value={props.productAmount}
					added-to-cart={props.productAmount}
				/>
				<span></span>
				<div className={`${styles["btn-container"]}`}>
					<Button
						type={"reset"}
						className={`${styles["add-btn"]}`}
						onClick={props.incrimentProductHandler}
					>
						<i className="fa-solid fa-caret-up"></i>
					</Button>
					<Button
						type={"reset"}
						className={`${styles["remove-btn"]}`}
						onClick={props.decrimentProductHandler}
					>
						<i className="fa-solid fa-caret-down"></i>
					</Button>
				</div>
				<Button className={`${styles["to-cart-btn"]}`} type={"submit"}>
					{props.icon}
				</Button>
			</figure>
		</form>
	);
};

export default ProductCartController;
