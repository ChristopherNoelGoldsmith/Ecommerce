import styles from "./FeaturedProducts.module.scss";
import ProductListItem from "./ProductListItem";
import useProduct from "../hooks/useProduct";
import Card from "../UI/Card";

//placeholder
const createFeaturedProductList = (products) => {
	return products
		.sort((item1, item2) => {
			if (item1.purchaseCount < item2.purchaseCount) {
				return -1;
			}
			if (item1.purchaseCount > item2.purchaseCount) {
				return 1;
			}
			return 0;
		})
		.map((cards, index) => {
			if (index > 4) return;
			return (
				<ProductListItem
					productName={cards.name}
					key={cards.asset}
					src={cards.ultra_url_path}
					productPrice={cards.price}
					text={cards.text}
					extension={cards.extension}
				/>
			);
		});
};

const FeaturedProducts = (props) => {
	const { crimsonRampage } = useProduct();
	const featuredProductList = createFeaturedProductList(crimsonRampage);

	return (
		<Card className={`${styles["featured-product"]}`}>
			<h2>HOT ITEMS!</h2>
			<ul>{featuredProductList}</ul>
		</Card>
	);
};

export default FeaturedProducts;
