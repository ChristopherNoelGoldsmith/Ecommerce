import styles from "./FeaturedProducts.module.scss";
import ProductListItem from "./ProductListItem";
import useProduct from "../hooks/useProduct";
import Card from "../UI/Card";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const FeaturedProducts = (props) => {
	const [featured, setFeatured] = useState();
	const { getProductList, getAllProducts } = useProduct();
	useEffect(() => {
		const fetchData = async () => {
			//TODO input function in api so that it can filter and sort for highest bought items
			const product = await getAllProducts(10, 5);
			const list = getProductList(product.data);
			setFeatured(list);
		};
		fetchData();
	}, []);
	return (
		<Card className={`${styles["featured-product"]}`}>
			<h2>HOT ITEMS!</h2>
			<ul>{<LoadingSpinner /> && featured}</ul>
		</Card>
	);
};

export default FeaturedProducts;
