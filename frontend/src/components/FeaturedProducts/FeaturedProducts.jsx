import styles from "./FeaturedProducts.module.scss";
import ProductListItem from "./ProductListItem";
import useProduct from "../hooks/useProduct";
import Card from "../UI/Card";

//placeholder
const createFeaturedProductList = (products) => {
	const genRandomNum = () => {
		const num = Math.floor(Math.random() * products.length);
		if (num + 4 > products.length) return randomNum();
		return num;
	};
	const randomNum = genRandomNum();
	return products.map((cards, index) => {
		if (index > randomNum || index < randomNum - 4) return;
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
