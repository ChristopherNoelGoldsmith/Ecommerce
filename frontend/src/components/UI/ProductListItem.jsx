//not finished
import styles from "./ProductListItem.module.scss";
import Card from "./Card";
import ProductCartController from "../Utility/ProductCartController";
import useModal from "../hooks/useModal";
import useProductCounter from "../hooks/useProductCounter";
import ProductDescription from "./ProductDescription";
import { trimName } from "../utilityScripts/priceUtil";

const ProductListItem = (props) => {
	const { createModal } = useModal();
	const {
		incrimentProductHandler,
		decrimentProductHandler,
		resetProductHandler,
		productAmount,
	} = useProductCounter();

	const productName = trimName(props);

	const createProductCartController = () => {
		return (
			<ProductCartController
				productId={props.productId}
				productName={props.productName}
				productPrice={props.productPrice}
				productAmount={productAmount}
				productImage={props.src}
				icon={<i className="fa-solid fa-cart-plus"></i>}
				decrimentProductHandler={decrimentProductHandler}
				incrimentProductHandler={incrimentProductHandler}
				resetProductHandler={resetProductHandler}
			/>
		);
	};

	const productCartController = createProductCartController();

	const imageModalHanlder = () => {
		console.log(props);
		return createModal(
			<ProductDescription
				text={props.text}
				productName={props.productName}
				src={props.src}
				createProductCartController={createProductCartController}
			/>
		);
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
					<div className="product-details">{productCartController}</div>
				</figure>
			</Card>
		</li>
	);
};

export default ProductListItem;
