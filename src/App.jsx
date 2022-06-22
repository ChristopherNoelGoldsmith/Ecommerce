import "./App.css";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Module from "./components/module/Module";
import Cart from "./components/module/Cart/Cart";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import useModule from "./components/hooks/useModule";

const createModule = (content, event) => {
	return <Module onClick={event}>{content}</Module>;
};

function App() {
	const { module, moduleVis } = useModule();

	return (
		<div className="container">
			{moduleVis && module}
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
