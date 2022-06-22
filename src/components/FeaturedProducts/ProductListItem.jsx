//not finished
import styles from "./ProductListItem.module.scss";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ProductCartController from "../Utility/ProductCartController";
import { useState } from "react";

const ProductListItem = (props) => {
	const [productAmount, setAmount] = useState(0);

	const productNameEdit = () => {
		if (props.productName.length > 25) {
			let trimmedName = props.productName.slice(0, 22);
			trimmedName = trimmedName + "...";
			return trimmedName;
		}
		return props.productName;
	};

	const productName = productNameEdit();

	const submithandler = (event) => {
		event.preventDefault();
		/*add to card goes here */
	};

	const incrimentProductHandler = () => {
		return setAmount((amount) => ++amount);
	};

	const decrimentProductHandler = () => {
		return setAmount((amount) => --amount);
	};

	return (
		<li className={`${styles["product-list-item"]}`}>
			<Card>
				<figure>
					<label className={`${styles["product-name"]}`} htmlFor="product name">
						{productName}
					</label>
					<div className={`${styles["image-container"]}`}>
						<img
							className={`${styles["product-image"]}`}
							src={props.src}
							alt={props.productName}
						/>
					</div>
					<div className="product-details">
						<ProductCartController
							productPrice={props.productPrice}
							productAmount={productAmount}
							submithandler={submithandler}
							decrimentProductHandler={decrimentProductHandler}
							incrimentProductHandler={incrimentProductHandler}
						/>
					</div>
				</figure>
			</Card>
		</li>
	);
};

export default ProductListItem;
