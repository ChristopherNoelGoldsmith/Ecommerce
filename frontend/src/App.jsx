import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import useModal from "./components/hooks/useModal";
import data from "./assets/rampage.json";
import { useEffect } from "react";
import useLogin from "./components/hooks/useLogin";
console.log(data);
function App() {
	const { modal, modalVis } = useModal();
	const { persistLogin } = useLogin();
	useEffect(() => {
		persistLogin();
	}, []);

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
