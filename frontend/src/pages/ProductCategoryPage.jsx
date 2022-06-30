import styles from "./ProductCategoryPage.module.scss";
import useProduct from "../components/hooks/useProduct";
import { useReducer, useState } from "react";
import PageButtons from "../components/UI/PageButtons";
import { useEffect } from "react";

const types = {
	INCRIMENT: "INCRIMENT",
	DECRIMENT: "DECRIMENT",
	SET: "SET",
	PAGE: "PAGE",
	NUMBER_OF_ITEMS: "NUMBER_OF_ITEMS",
};

const pageHandler = (products, pageNumber, numberPerPage = 25) => {
	const startOfPage = pageNumber * numberPerPage;
	const endOfPage = startOfPage + numberPerPage;
	console.log(products);
	const thisPage = products.slice(startOfPage, endOfPage);
	return thisPage;
};

const configurePagesReducer = (state, action) => {
	switch (action.type) {
		case types.INCRIMENT:
			state.pageNumber++;
			break;
		case types.DECRIMENT:
			state.pageNumber--;
			break;
		case types.SET:
			state.pageNumber = action.pageNumber - 1;
			break;
		case types.NUMBER_OF_ITEMS:
			state.numberPerPage = action.numberPerPage;
			break;
		default:
			console.log("invalid case");
			break;
	}
	return { pageNumber: state.pageNumber, numberPerPage: state.numberPerPage };
};

/*
setCategory: the category of data being fetched from the server. Navbar category or a search.
pagesConfig: takes the length of the categorhy and provides pagenation via the array slice method,
	and passes its function to the page buttons.
*/

const ProductCategoryPage = (props) => {
	const { getProductList, getAllProducts } = useProduct();
	const [category, setCategory] = useState([]);
	const [pagesConfig, dispatchPages] = useReducer(configurePagesReducer, {
		pageNumber: 0,
		numberPerPage: 25,
	});
	const [page, setPage] = useState();

	//for pagenation
	const thisPage = (products) => {
		const page = pageHandler(
			products,
			pagesConfig.pageNumber,
			pagesConfig.numberPerPage
		);
		setPage(page);
	};
	//Initialization
	useEffect(() => {
		const fetchData = async () => {
			const products = await getAllProducts();
			const productsList = await getProductList(products);
			setCategory(productsList);
			thisPage(productsList);
			console.log(category);
		};
		fetchData();
	}, []);

	//handler function for pagenation
	const setPageNumber = (page) => {
		dispatchPages({ type: types.SET, pageNumber: page });
		thisPage(category);
		return;
	};

	return (
		<section className={`${styles.category}`}>
			<ul>{page}</ul>
			<PageButtons
				category={category}
				numberPerPage={pagesConfig.numberPerPage}
				setPageNumber={setPageNumber}
			/>
		</section>
	);
};

export default ProductCategoryPage;
