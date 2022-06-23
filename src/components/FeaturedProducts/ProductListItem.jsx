//not finished
import styles from "./ProductListItem.module.scss";
import Card from "../UI/Card";
import ProductCartController from "../Utility/ProductCartController";
import useModule from "../hooks/useModule";
import useProductCounter from "../hooks/useProductCounter";

const ProductListItem = (props) => {
	const { createModule } = useModule();
	const {
		incrimentProductHandler,
		decrimentProductHandler,
		resetProductHandler,
		productAmount,
	} = useProductCounter();
	const productNameEdit = () => {
		if (props.productName.length > 25) {
			let trimmedName = props.productName.slice(0, 22);
			trimmedName = trimmedName + "...";
			return trimmedName;
		}
		return props.productName;
	};

	const productName = productNameEdit();

	const imageModuleHanlder = () => {
		const productImage = (
			<img
				className={`${styles["product-image"]}`}
				src={props.src}
				alt={props.productName}
			/>
		);

		return createModule(productImage);
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
							onClick={imageModuleHanlder}
							className={`${styles["product-image"]}`}
							src={props.src}
							alt={props.productName}
						/>
					</div>
					<div className="product-details">
						<ProductCartController
							productName={props.productName}
							productPrice={props.productPrice}
							productAmount={productAmount}
							productImage={props.src}
							decrimentProductHandler={decrimentProductHandler}
							incrimentProductHandler={incrimentProductHandler}
							resetProductHandler={resetProductHandler}
						/>
					</div>
				</figure>
			</Card>
		</li>
	);
};

export default ProductListItem;
