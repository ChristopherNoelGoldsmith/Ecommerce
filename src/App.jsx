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
	const [moduleState, setModuleState] = useState("");
	const [moduleVis, setVis] = useState(false);

	const toggleModuleVis = () => setVis((module) => !module);

	const populateModule = (content) => {
		const toggle = toggleModuleVis();
		const moduleContent = createModule(content, toggle);
		return setModuleState(moduleContent);
	};

	return (
		<div className="container">
			{moduleVis && moduleState}
			<Navbar populateModule={populateModule} />
			<Routes>
				<Route
					path="/category"
					element={<ProductCategoryPage populateModule={populateModule} />}
				/>
				<Route
					path="/"
					element={<HomePage populateModule={populateModule} />}
				/>
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</div>
	);
}

export default App;
