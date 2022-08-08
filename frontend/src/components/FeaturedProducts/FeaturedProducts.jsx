import styles from "./FeaturedProducts.module.scss";
import useProduct from "../hooks/useProduct";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const DUMMY_TEXT =
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque tempore velit ipsam cum, officiis voluptatem porro sed temporibus harum itaque doloribus voluptates dignissimos quasi ea impedit quae neque sunt illum expedita dicta natus non accusantium at nobis? Ipsum provident accusantium veritatis culpa neque laborum laboriosam, rerum nemo sint repudiandae earum minus dolores eveniet eius corrupti odit exercitationem commodi dolore similique incidunt architecto explicabo minima molestiae. Voluptatem, velit qui iste corrupti atque quas labore aliquam dolore sequi adipisci, earum distinctio? Nam, beatae cum aspernatur, nobis non perferendis officia ipsam voluptates saepe id, odio iure tenetur sapiente? Quas totam dolorum deserunt quis!";

const FeaturedProducts = (props) => {
	const [featured, setFeatured] = useState();
	const { getProductList, getAllProducts } = useProduct();
	useEffect(() => {
		const fetchData = async () => {
			const loading = <LoadingSpinner />;

			setFeatured(loading);
			//TODO input function in api so that it can filter and sort for highest bought items
			const product = await getAllProducts(Math.ceil(Math.random() * 143), 1);
			const list = getProductList(product.data);
			setFeatured(list);
		};
		fetchData();
	}, []);
	return (
		<section className={`${styles["information"]}`}>
			<section className={`${styles["about-container"]}`}>
				<h3>About Us</h3>
				<p>{DUMMY_TEXT}</p>
			</section>
			<section className={`${styles["featured-container"]}`}>
				<div className={`${styles["background-piece-featured"]}`}></div>
				<ul>{featured}</ul>
				<Button className={styles["shop-btn"]}>
					<Link to={"/category"}>SHOP</Link>
				</Button>
			</section>
			<div className={`${styles["background-piece"]}`}></div>
			<div className={`${styles["background-piece2"]}`}></div>
		</section>
	);
};

export default FeaturedProducts;
