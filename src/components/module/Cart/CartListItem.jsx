import styles from "./CartListItem.module.scss";
import ProductCartController from "../../Utility/ProductCartController";

//DUMMY DATA

const CartListItem = (props) => {
	return (
		<li className={`${styles["cart-list-item"]}`} key={props.keys}>
			<figure>
				<label htmlFor={props.name}>
					<span>{props.name}</span>
				</label>
				<img src={props.image} alt={props.name} />
			</figure>
			<ProductCartController productPrice={props.price} />
		</li>
	);
};

export default CartListItem;
