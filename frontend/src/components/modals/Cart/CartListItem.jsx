import styles from "./CartListItem.module.scss";
import ProductCartController from "../../Utility/ProductCartController";

const CartListItem = (props) => {
	return (
		<li className={`${styles["cart-list-item"]}`} key={props.keys}>
			<figure>
				<img src={props.image} alt={props.name} />
				<label htmlFor={props.name}>
					<span>{props.name}</span>
				</label>
			</figure>
			<ProductCartController
				item={props.item}
				productName={props.name}
				image={props.image}
				productAmount={props.productAmount}
				productPrice={props.total}
				icon={<i class="fa-solid fa-xmark"></i>}
				incrimentProductHandler={props.incrimentProductHandler}
				decrimentProductHandler={props.decrimentProductHandler}
				removeItem={props.removeItem}
			/>
		</li>
	);
};

export default CartListItem;
