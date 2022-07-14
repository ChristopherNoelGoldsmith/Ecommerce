import { useState } from "react";

const useCookies = () => {
	const [cookies, setCookies] = useState();

	const getCookieByName = (name) => {
		const match = document.cookie.match(
			new RegExp("(^| )" + name + "=([^;]+)")
		);
		return match ? setCookies(match[2]) : "";
	};

	return [cookies, getCookieByName];
};

export default useCookies;
