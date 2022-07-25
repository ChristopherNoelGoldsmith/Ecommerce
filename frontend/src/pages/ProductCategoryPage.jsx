import styles from "./ProductCategoryPage.module.scss";
import useProduct from "../components/hooks/useProduct";
import { useState } from "react";
import PageButtons from "../components/UI/PageButtons";
import { useEffect } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
/*
//------------------------------------------------------------------
PAGE FOR THE CATEGORIES ACCESSED THROUGH THE NAVBAR OR OTHER MEANS.
DISPLAYS DATA FROM THE API VIA THE "extension" PROPERY OF THE PRODUCTS
//------------------------------------------------------------------
*/

const ProductCategoryPage = (props) => {
	const { getProductList, getAllProducts } = useProduct();
	const [numberOfPages, setNumberOfPages] = useState();
	const [page, setPage] = useState();

	//ONLOAD 1 ) Initialization
	useEffect(() => {
		const fetchData = async () => {
			const loading = <LoadingSpinner />;

			setPage(loading);

			//API 1 ) MAKES INITIAL DATACALL FROM THE SERVER FOR THE GIVEN CATEGORY
			//TODO: ADD CATEGORY OPTION ON getAllProducts()
			const products = await getAllProducts();
			//JSX 2 ) ASSEMBLES JSX LIST OF THE PRODUCT DATA
			const productList = await getProductList(products.data);

			// JSX 3 ) SETS JSX TO PAGE
			setPage(productList);

			// PAGENATION 1 ) SETS THE PAGENATIION BUTTONS
			setNumberOfPages(products.pages);
		};
		fetchData();
	}, []);

	//PAGENATION ) SETS PAGENATION ONCLICK EVENT FOR PAGE BUTTONS
	const setPageNumber = async (page) => {
		//REMINDER: PAGE AND LIMIT ARE THE PARAMS
		const products = await getAllProducts(page);
		const productList = await getProductList(products.data);
		setPage(productList);
		setNumberOfPages(products.pages);
		return;
	};

	return (
		<section className={`${styles.category}`}>
			<ul>{page}</ul>
			<PageButtons
				numberPerPage={numberOfPages}
				setPageNumber={setPageNumber}
			/>
		</section>
	);
};

export default ProductCategoryPage;
