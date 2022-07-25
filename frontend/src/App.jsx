import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import useModal from "./components/hooks/useModal";
import usePersist from "./components/hooks/usePersist";
import useLogin from "./components/hooks/useLogin";
import useCookies from "./components/hooks/useCookies";
import { useEffect } from "react";

function App() {
	const { modal, modalVis } = useModal();
	const cookies = useCookies();
	const { persistUserOnLogin } = useLogin();
	/*
	///////////////////////////////////////////////////////////////////
	CHECKS COOKIES FOR A VALID LOGIN TOKEN THEN PERSIST THE LOGIN STATE
	///////////////////////////////////////////////////////////////////
	*/
	useEffect(() => {
		if (!cookies) return;
		persistUserOnLogin(cookies.user);
		return;
	}, [cookies]);
	return (
		<div className="container">
			{modalVis && modal}
			<Navbar />
			<Routes>
				<Route path="/category" element={<ProductCategoryPage />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</div>
	);
}

export default App;
