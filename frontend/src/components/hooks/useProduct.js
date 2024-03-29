import { useState } from "react";
import ProductListItem from "../UI/ProductListItem";

// class ProductsQuery {
// 	constructor(products) {
// 		this.query = "https://allmightyccg.herokuapp.com/api/v1/products";
// 	}

// 	addField(newField) {
// 		if (!this.query.match("?")) this.query = this.query + "&";
// 		return (this.query = this.query + newField);
// 	}

// 	page(page) {
// 		this.mount();
// 		return this.addField(`&page=${page}`);
// 	}

// 	limit(limit) {
// 		this.mount();
// 		return (this.query = this.query + `&limit=${limit}`);
// 	}

// 	category(cat) {
// 		this.mount();
// 		return (this.query = this.query + `&category=${cat}`);
// 	}

// 	name(name) {
// 		this.mount();
// 		return (this.query = this.query + `&name=${name}`);
// 	}
// }

const useProduct = () => {
	const [products, setProducts] = useState();
	const [productsList, setProductsList] = useState();
	const mount = "https://allmightyccg.herokuapp.com/api/v1";

	/*
	///////////
	USED FOR SENDING QUERIES TO THE SERVER AND OBTAINING PRODUCTS

	DEFAULT SETTING IS FIRST PAGE WITH 25 ITEM LIMIT AND NO PRODUCTS FILTERED
	///////////
	*/
	const getAllProducts = async (page = 1, limit = 25, filter = null) => {
		// QUERY 1 ) FILTER FOR THE URL
		const queryFilter = filter ? `&category${filter}` : "";

		// QUERY 2 ) QUERIES THE PRODUCTS COLLECTION
		const products = await fetch(
			`${mount}/products?&page=${page}&limit=${limit}${queryFilter}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				method: "GET",
			}
		);

		// QUERY 3 ) RETURNS THE RESULT OF THE QUERY AND A NUMBER FOR PAGENATION
		const { data, pages } = await products.json();
		setProducts(data);
		return { data, pages };
	};

	//GENERATES THE JSX FOR THE ITEMS RETURNED BY QUERIES
	const getProductList = (product) => {
		const productList = product.map((cards) => {
			const { name, img, price, text, extension, _id } = cards;
			return (
				<ProductListItem
					productId={_id}
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
	/* 
? NOTES ON RETURNED ITEMS
/////////////////////////////////////////////////////////////////
* products: Holds the raw data returned by the query.
* productList: Holds the JSX list generated by 'getProductsList'
/////////////////////////////////////////////////////////////////
*/

	return {
		products,
		productsList,
		getProductList,
		getAllProducts,
	};
};

export default useProduct;
