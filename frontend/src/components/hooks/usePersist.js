/*
UNDER CONSTRUCTION NOT IMPLIMENTED YET!

PURPOSE OF HOOK IS TO PERSIS THE STATE OF THE PURCHASES
AND LOGIN.

IMPLIMENTATION AND CONSTRUCTION WILL BE POST FULL LOGIN
SETUP!
*/

import { useEffect } from "react";
import useLogin from "./useLogin";

const usePersist = () => {
	const { persistUserOnLogin } = useLogin();

	//TODO: AFTER CART API IS CREATED ADD PERSISTANCE INTO THIS HOOK
	const persistUser = useEffect((username) => {
		persistUserOnLogin();
		return;
	}, []);

	return persistUser;
};

export default usePersist;
