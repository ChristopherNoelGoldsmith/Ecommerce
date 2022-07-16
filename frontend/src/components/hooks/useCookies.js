import { useState, useEffect } from "react";
class CookieKeys {
	contructor() {}

	//!COPYPASTA
	//INSERT THE NAME OF A COOKIE AND IT WILL EXTRACT THE VALUE
	getCookieByName = (name) => {
		const match = document.cookie.match(
			new RegExp("(^| )" + name + "=([^;]+)")
		);
		return match ? match[2] : "";
	};

	//EXTRACTS KEYS FROM THE COOKIES IN THE BROSER AND APPENDS THEM TO THE OBJECT WITH THE VALUE
	getKeys(type = "create") {
		const regExpForKeys = /\w+(?==)/gi;
		const cookiesString = document.cookie;
		const cookieKeys = cookiesString.match(regExpForKeys);

		//CLEARS COOKIES IN OBJECT
		if (type === "clear") {
			cookieKeys.forEach((cookieKey) => {
				const cookieContent = this.getCookieByName(cookieKey);
				this[cookieKey] = "";
				document.cookie = `${cookieKey}=''`;
			});
		}

		//ADDS COOKIES TO OBJECTS
		cookieKeys.forEach((cookieKey) => {
			const cookieContent = this.getCookieByName(cookieKey);
			this[cookieKey] = cookieContent;
		});
	}
}

const useCookies = () => {
	const [cookies, setCookies] = useState();

	//TODO: TURN INTO A FUNCTIONAL BASED HOOK FOR CONSISTANCY

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
