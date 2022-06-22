import styles from "./ProductCategoryPage.module.scss";
import useProduct from "../components/hooks/useProduct";
import ProductListItem from "../components/FeaturedProducts/ProductListItem";

const createProductList = (products) => {
	return products.map((cards) => {
		return (
			<ProductListItem
				productName={cards.name}
				key={cards.asset}
				src={cards.ultra_url_path}
				productPrice={cards.price}
			/>
		);
	});
};

const ProductCategoryPage = (props) => {
	const { crimsonRampage } = useProduct();
	const productList = createProductList(crimsonRampage);

	return (
		<section className={`${styles.category}`}>
			<ul>{productList}</ul>
		</section>
	);
};

export default ProductCategoryPage;
