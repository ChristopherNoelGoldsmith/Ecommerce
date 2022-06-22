import styles from "./ProductCategoryPage.module.scss";
import { useSelector } from "react-redux/es/exports";
import ProductListItem from "../components/FeaturedProducts/ProductListItem";

const createProductList = (products) => {
	return products.map((cards) => {
		return (
			<ProductListItem
				productName={cards.name}
				key={cards.asset}
				src={cards.ultra_url_path}
				productPrice={"10.00"}
			/>
		);
	});
};

const ProductCategoryPage = (props) => {
	const data = useSelector((store) => store.product);
	const productList = createProductList(data.data);

	return (
		<section className={`${styles.category}`}>
			<ul>{productList}</ul>
		</section>
	);
};

export default ProductCategoryPage;
