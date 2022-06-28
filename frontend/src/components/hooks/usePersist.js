/*
UNDER CONSTRUCTION NOT IMPLIMENTED YET!

PURPOSE OF HOOK IS TO PERSIS THE STATE OF THE PURCHASES
AND LOGIN.

IMPLIMENTATION AND CONSTRUCTION WILL BE POST FULL LOGIN
SETUP!
*/

import { useEffect } from "react";
import useLogin from "./useLogin";
//import useCart from "./useCart";

const usePersist = () => {
	const { persistLogin } = useLogin();
	//const { persistCart } = useCart();

	const persistUser = useEffect(() => {
		persistLogin();
		//persistCart(); ---Needs to be built!
	});

	return persistUser;
};

export default usePersist;
