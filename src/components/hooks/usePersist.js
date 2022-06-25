/*
UNDER CONSTRUCTION NOT IMPLIMENTED YET!

PURPOSE OF HOOK IS TO PERSIS THE STATE OF THE PURCHASES
AND LOGIN.

IMPLIMENTATION AND CONSTRUCTION WILL BE POST FULL LOGIN
SETUP!
*/

import { useState } from "react";

const usePersist = () => {
	const [persistState, setPersist] = useState();

	const persistUser = () => {
		localStorage.setItem("user", persistState);
	};

	return [persistUser];
};
