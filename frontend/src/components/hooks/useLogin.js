import { useDispatch, useSelector } from "react-redux/es/exports";
import { loginActions } from "../../store/login";

const useLogin = () => {
	const dispatch = useDispatch();
	const loginState = useSelector((store) => store.login);

	const login = async (userInfo) => {
		const { username, password } = userInfo;
		console.log(userInfo);
		const response = await fetch(`/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		}).then((res) => res.json());

		if (response.status !== "SUCCESS") return console.log(response.status);

		//EXTRACTS THE USERTOKEN FROM THE RESPONSE AND SETS IT TO LOCALSTORAGE FOR STATE PERSISTANCE
		const { token } = response;

		localStorage.setItem("userToken", token);
		dispatch(loginActions.login({ username: username }));
		console.log(`You have logged in: USERNAME:${username}, token: ${token}`);
		return response;
	};

	const logout = () => {
		localStorage.removeItem("userToken");
		dispatch(loginActions.logout());
		return;
	};

	const registerAccount = async (userInfo) => {
		const { username, password } = userInfo;
		const response = await fetch(`/user/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				password,
			}),
		}).then((res) => res.json());
		if (response.status !== "SUCCESS") return console.log("invalid user input");
		console.log(response);
		return response;
	};

	const persistLogin = async () => {
		const token = localStorage.getItem("userToken");
		console.log(token);
		if (!token) return;
		const response = await fetch("/user/persist", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ token: token }),
		}).then((res) => res.json());
		console.log(response);
		if (response.status !== "SUCCESS") return console.log("no persist");
		dispatch(loginActions.login({ username: response.username }));
		return console.log(
			`You have logged in: USERNAME:${response.username}, token: ${token}`
		);
	};

	return { login, logout, persistLogin, registerAccount, loginState };
};

export default useLogin;
