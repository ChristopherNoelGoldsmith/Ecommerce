import styles from "./ProductCategoryPage.module.scss";
import useProduct from "../components/hooks/useProduct";
import ProductListItem from "../components/FeaturedProducts/ProductListItem";
import { useReducer, useState } from "react";
import PageButtons from "../components/UI/PageButtons";

const types = {
	INCRIMENT: "INCRIMENT",
	DECRIMENT: "DECRIMENT",
	SET: "SET",
	PAGE: "PAGE",
	NUMBER_OF_ITEMS: "NUMBER_OF_ITEMS",
};

const createProductList = (products, pageNumber, numberPerPage = 25) => {
	const startOfPage = pageNumber * numberPerPage;
	const endOfPage = startOfPage + numberPerPage;
	console.log(pageNumber, numberPerPage);
	return products.map((cards, index) => {
		if (index >= startOfPage && index < endOfPage) {
			return (
				<ProductListItem
					productName={cards.name}
					key={cards.asset}
					src={cards.ultra_url_path}
					productPrice={cards.price}
				/>
			);
		}
	});
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
	}
	return { pageNumber: state.pageNumber, numberPerPage: state.numberPerPage };
};

const ProductCategoryPage = (props) => {
	const { crimsonRampage } = useProduct();
	const [category, setCategory] = useState(crimsonRampage);
	const [pagesConfig, dispatchPages] = useReducer(configurePagesReducer, {
		pageNumber: 0,
		numberPerPage: 25,
	});
	const productList = createProductList(
		crimsonRampage,
		pagesConfig.pageNumber,
		pagesConfig.numberPerPage
	);

	const setPageNumber = (page) => {
		dispatchPages({ type: types.SET, pageNumber: page });
		return;
	};

	return (
		<section className={`${styles.category}`}>
			<ul>{productList}</ul>
			<PageButtons
				category={category}
				numberPerPage={pagesConfig.numberPerPage}
				setPageNumber={setPageNumber}
			/>
		</section>
	);
};

export default ProductCategoryPage;
