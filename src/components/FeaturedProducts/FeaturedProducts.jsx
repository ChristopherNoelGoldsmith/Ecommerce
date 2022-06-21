import styles from "./FeaturedProducts.module.scss";
import ProductListItem from "./ProductListItem";
import { useSelector } from "react-redux";

//placeholder
const createFeaturedProductList = (products) => {
	return products.map((cards, index) => {
		if (index > 4) return;
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

const FeaturedProducts = (props) => {
	const data = useSelector((store) => store.product);
	const featuredProductList = createFeaturedProductList(data.data);

	return (
		<section className={`${styles["featured-product"]}`}>
			<ul>{featuredProductList}</ul>
		</section>
	);
};

export default FeaturedProducts;
