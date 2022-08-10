import Card from "./Card";
import styles from "./ProductDescription.module.scss";
import ProductCartController from "../Utility/ProductCartController";
import useProductCounter from "../hooks/useProductCounter";

const ProductDescription = (props) => {
	//TODO: decouple product desc from list item completely

	const {
		incrimentProductHandler,
		decrimentProductHandler,
		resetProductHandler,
		productAmount,
	} = useProductCounter();
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
						<ProductCartController
							productId={props.productId}
							productName={props.productName}
							productPrice={props.productPrice}
							productAmount={productAmount}
							icon={<i className="fa-solid fa-cart-plus"></i>}
							decrimentProductHandler={decrimentProductHandler}
							incrimentProductHandler={incrimentProductHandler}
							resetProductHandler={resetProductHandler}
						/>
					</div>
				</section>
			</section>
		</Card>
	);
};

export default ProductDescription;
