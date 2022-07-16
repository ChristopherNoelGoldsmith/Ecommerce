import { useState, useEffect } from "react";
class CookieKeys {
	contructor() {}

	getCookieByName = (name) => {
		const match = document.cookie.match(
			new RegExp("(^| )" + name + "=([^;]+)")
		);
		return match ? match[2] : "";
	};

	getKeys() {
		const regExpForKeys = /\w+(?==)/gi;
		const cookiesString = document.cookie;
		const cookieKeys = cookiesString.match(regExpForKeys);
		cookieKeys.forEach((cookieKey) => {
			const cookieContent = this.getCookieByName(cookieKey);
			this[cookieKey] = cookieContent;
		});
	}
}

const useCookies = () => {
	const [cookies, setCookies] = useState();

	useEffect(() => {
		const createCookieJar = () => {
			const cookieJar = new CookieKeys();
			cookieJar.getKeys();
			console.log(cookieJar);
			setCookies(cookieJar);
			return cookies;
		};
		createCookieJar();
	}, []);

	return cookies;
};

export default useCookies;
