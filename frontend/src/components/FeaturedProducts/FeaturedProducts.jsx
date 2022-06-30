import styles from "./FeaturedProducts.module.scss";
import ProductListItem from "./ProductListItem";
import useProduct from "../hooks/useProduct";
import Card from "../UI/Card";
import { useEffect } from "react";
import { useState } from "react";

const featureFilter = (products) => {
	const filter = products.filter((product, index) => index < 5 && true);
	return filter;
};

const FeaturedProducts = (props) => {
	const [featured, setFeatured] = useState();
	const { getProductList, getAllProducts } = useProduct();
	useEffect(() => {
		const fetchData = async () => {
			const product = await getAllProducts();
			const list = getProductList(product);
			const filtered = featureFilter(list);
			console.log(filtered);
			setFeatured(filtered);
		};
		fetchData();
	}, []);
	return (
		<Card className={`${styles["featured-product"]}`}>
			<h2>HOT ITEMS!</h2>
			<ul>{featured}</ul>
		</Card>
	);
};

export default FeaturedProducts;
