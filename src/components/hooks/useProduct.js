import { useDispatch, useSelector } from "react-redux/es/exports";
import { productActions } from "../../store/products";

const useProduct = () => {
	const product = useSelector((store) => store.product);
	const dispatch = useDispatch();

	const selectProducts = (productName) => {
		return dispatch(productActions.getProduct({productName: productName}));
	};

	return {
		selected: product.selected,
		allProducts: product.data,
		selectProduct: 
	}
};

export default useProduct;
