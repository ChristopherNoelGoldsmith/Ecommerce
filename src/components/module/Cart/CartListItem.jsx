import styles from "./CartListItem.module.scss";
import ProductCartController from "../../Utility/ProductCartController";

//DUMMY DATA

const CartListItem = (props) => {
	console.log(props.total);

	return (
		<li className={`${styles["cart-list-item"]}`} key={props.keys}>
			<figure>
				<label htmlFor={props.name}>
					<span>{props.name}</span>
				</label>
				<img src={props.image} alt={props.name} />
			</figure>
			<ProductCartController
				item={props.item}
				productName={props.name}
				image={props.image}
				productAmount={props.productAmount}
				productPrice={props.total}
				incrimentProductHandler={props.incrimentProductHandler}
				decrimentProductHandler={props.decrimentProductHandler}
				removeItem={props.removeItem}
			/>
		</li>
	);
};

export default CartListItem;
