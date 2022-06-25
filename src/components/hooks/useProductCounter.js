import { useState } from "react";

const useProductCounter = () => {
	const [productAmount, setAmount] = useState(0);

	const incrimentProductHandler = () => {
		if (productAmount >= 99) return;
		return setAmount((amount) => ++amount);
	};

	const decrimentProductHandler = () => {
		if (productAmount <= 0) return;
		return setAmount((amount) => --amount);
	};

	const resetProductHandler = () => {
		return setAmount((amount) => 0);
	};

	return {
		productAmount,
		incrimentProductHandler,
		decrimentProductHandler,
		resetProductHandler,
	};
};

export default useProductCounter;
