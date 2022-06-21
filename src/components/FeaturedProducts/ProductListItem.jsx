//not finished
import styles from "./ProductListItem.module.scss";
import Button from "../UI/Button";
import Card from "../UI/Card";
import { useState } from "react";

const ProductListItem = (props) => {
	const [productAmount, setAmount] = useState(0);

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
						{props.productName}
					</label>
					<div className={`${styles["image-container"]}`}>
						<img
							className={`${styles["product-image"]}`}
							src={props.src}
							alt={props.productName}
						/>
					</div>
					<div className="product-details">
						<form onSubmit={submithandler}>
							<label htmlFor="price">
								$ <span>{props.productPrice}</span>{" "}
							</label>
							<input type="none" readOnly value={productAmount} />
							<div className={`${styles["btn-container"]}`}>
								<Button
									type={"reset"}
									className={`${styles["add-btn"]}`}
									onClick={incrimentProductHandler}
								>
									+
								</Button>
								<Button
									type={"reset"}
									className={`${styles["remove-btn"]}`}
									onClick={decrimentProductHandler}
								>
									-
								</Button>
							</div>
							<Button className={`${styles["to-cart-btn"]}`} type={"submit"}>
								Add
							</Button>
						</form>
					</div>
				</figure>
			</Card>
		</li>
	);
};

export default ProductListItem;
