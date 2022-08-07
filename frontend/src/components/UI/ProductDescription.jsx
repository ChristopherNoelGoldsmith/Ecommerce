import Card from "./Card";
import styles from "./ProductDescription.module.scss";
import ProductCartController from "../Utility/ProductCartController";

const ProductDescription = (props) => {
	const productCartController = props.createProductCartController();
	//TODO: decouple product desc from list item completely
	return (
		<Card>
			<section className={styles["item-description"]}>
				<figure>
					<label>{props.productName}</label>
					<img
						className={`${styles["product-image"]}`}
						src={props.src}
						alt={props.productName}
					/>
				</figure>

				<section className={styles["description"]}>
					<p>{props.text}</p>

					<div className={styles["cart-controller"]}>
						{productCartController}
					</div>
				</section>
			</section>
		</Card>
	);
};

export default ProductDescription;
