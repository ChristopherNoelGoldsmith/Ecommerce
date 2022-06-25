//not finished
import styles from "./ProductListItem.module.scss";
import Card from "../UI/Card";
import ProductCartController from "../Utility/ProductCartController";
import useModal from "../hooks/useModal";
import useProductCounter from "../hooks/useProductCounter";
import ProductDescription from "../modals/ProductDescription";

const ProductListItem = (props) => {
	const { createModal } = useModal();
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

	// 	<ProductDescription
	// 	extension={props.extension}
	// 	name={props.productName}
	// 	text={props.text}
	// />

	const imageModalHanlder = () => {
		const productImage = (
			<Card className={styles["item-description"]}>
				<h3>{props.productName}</h3>
				<img
					className={`${styles["product-image"]}`}
					src={props.src}
					alt={props.productName}
				/>
			</Card>
		);

		return createModal(productImage);
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
							onClick={imageModalHanlder}
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
							icon={<i className="fa-solid fa-cart-plus"></i>}
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
