import crimsonRampage from "../../assets/rampage.json";
import { useState } from "react";
import ProductListItem from "../FeaturedProducts/ProductListItem";

const useProduct = () => {
	const [products, setProducts] = useState();
	const [productsList, setProductsList] = useState();
	const mount = "/api/v1";
	const getAllProducts = async () => {
		const products = await fetch(`${mount}/products`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
		});
		const { data } = await products.json();
		setProducts(data);
		return data;
	};

	const getProductList = (product) => {
		const productList = product.map((cards, index) => {
			const { name, img, price, text, extension, _id } = cards;
			return (
				<ProductListItem
					productName={name}
					key={_id}
					src={img}
					productPrice={price}
					text={text}
					extension={extension}
				/>
			);
		});
		setProductsList(productList);
		return productList;
	};

	return {
		products,
		productsList,
		getProductList,
		getAllProducts,
	};
};

export default useProduct;
