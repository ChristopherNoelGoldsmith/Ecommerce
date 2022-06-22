import styles from "./FeaturedProducts.module.scss";
import ProductListItem from "./ProductListItem";
import useProduct from "../hooks/useProduct";

//placeholder
const createFeaturedProductList = (products) => {
	return products.map((cards, index) => {
		if (index > 4) return;
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

const FeaturedProducts = (props) => {
	const { crimsonRampage } = useProduct();
	const featuredProductList = createFeaturedProductList(crimsonRampage);

	return (
		<section className={`${styles["featured-product"]}`}>
			<ul>{featuredProductList}</ul>
		</section>
	);
};

export default FeaturedProducts;
