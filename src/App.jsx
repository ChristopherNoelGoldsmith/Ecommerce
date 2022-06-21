import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Module from "./components/module/Module";
import Cart from "./components/module/Cart/Cart";

function App() {
	return (
		<div>
			<Module>
				<Cart />
			</Module>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</div>
	);
}

export default App;
