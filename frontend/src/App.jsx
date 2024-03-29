import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useEffect } from "react";

import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CartSuccess from "./pages/CartSuccess";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import useModal from "./components/hooks/useModal";
import useLogin from "./components/hooks/useLogin";
import useCookies from "./components/hooks/useCookies";
import useCart from "./components/hooks/useCart";

function App() {
	const { modal, modalVis } = useModal();
	const cookies = useCookies();
	const { persistUserOnLogin } = useLogin();
	const { clearCart } = useCart();
	/*
	///////////////////////////////////////////////////////////////////
	CHECKS COOKIES FOR A VALID LOGIN TOKEN THEN PERSIST THE LOGIN STATE
	///////////////////////////////////////////////////////////////////
	*/
	useEffect(() => {
		//PERSIST 1 ) CHECKS FOR USER IN COOKIES, RETURNS IF NOT FOUND
		if (!cookies) return;
		persistUserOnLogin(cookies.user);
		//ASYNC FUNCTION CREATED TO CALL CLEAR CART IN 'useEffect()'
		const asyncfn = async () => {
			//PERSIST 2 ) CLEARS CART UPON PERSISTANCE
			await clearCart();
		};
		asyncfn();
		return;
	}, [cookies]);

	return (
		<div>
			<Navbar />
			<div className="container">
				{modalVis && modal}
				<Routes>
					<Route path="/category" element={<ProductCategoryPage />} />
					<Route path="/" element={<HomePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/cart/success" element={<CartSuccess />} />
				</Routes>

				<Helmet>
					<meta charSet="utf-8" />
					<title>ALLMIGHTY CCG</title>
					<link
						rel="canonical"
						href="
						https://allmightyccg.netlify.app/"
					/>
				</Helmet>
			</div>
		</div>
	);
}

export default App;
