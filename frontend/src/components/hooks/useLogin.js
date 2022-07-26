import { useDispatch, useSelector } from "react-redux/es/exports";
import { loginActions } from "../../store/login";
import useCookies from "./useCookies";

/*///////////////////////////////////////////////////////////////////
CONTROLS ALL LOGIN AND REGISTRATION FUNCTIONS WITHIN THE APPLICATION!
*/ ///////////////////////////////////////////////////////////////////

const useLogin = () => {
	const dispatch = useDispatch();
	const loginState = useSelector((store) => store.login);
	const mount = "https://allmightyccg.herokuapp.com/api/v1";
	const cookies = useCookies();

	const queryApi = async (query, userInfo) => {
		// API CONNECT 1 ) NORMAL API CONNECTION SENDING THE USERNAME/EMAIL AND PASSWORD
		try {
			const response = await fetch(`${mount}/users/${query}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userInfo),
			}).then((res) => res.json());

			//SECURITY 1 ) COOKIES
			document.cookie = `loginToken=${response.token}`;
			document.cookie = `user=${userInfo.username}`;

			// DISPLAY 1 ) SETS STATE OF USERNAME DISPLAY THROUGHOUT THE APP.
			dispatch(loginActions.login({ username: userInfo.username }));
			return response;
		} catch (err) {
			//console.log(err);
		}
	};

	//PRIMARY FUNCTION USED TO LOG THE USER IN.
	const loginOrRegister = async (query) => {
		// API CONNECT 1 ) NORMAL API CONNECTION SENDING THE USERNAME/EMAIL AND PASSWORD
		//NOTE: query should be either "register" or "login"
		const response = await queryApi(query.type, query.user);
		return response;
	};

	//CLEARS THE ACTIVE USER AND THE LOGINTOKEN.
	const logout = () => {
		cookies.getKeys("clear");
		dispatch(loginActions.logout());
		return;
	};

	const updatePassword = async (userInfo) => {
		//TODO make the fetch functions into a factory function
		/*
		////////////////////////////////////
		NOTE: Params needed
		* password
		* newPassword
		* passwordConfrim:newPasswordConfirm
		* the userToken found in cookies
		/////////////////////////////////////
		*/
		//deconstruction used to allias passwordCOnfirm as newPasswordConfirm
		//! turn cookie finding into its own function
		const { id, password, newPassword, newPasswordConfirm } = userInfo;
		const userData = {
			password: password,
			newPassword: newPassword,
			newPasswordConfirm: newPasswordConfirm,
		};
		try {
			const response = await fetch(`${mount}/users/update-password`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${id}`,
				},
				body: JSON.stringify(userData),
			}).then((res) => res.json());
			console.log(response);
			if (response) alert("PASSWORD CHANGED");
			return response;
		} catch (err) {
			console.log(err);
		}
	};

	const persistUserOnLogin = (username) => {
		if (!username || username === "null") return;
		console.log(username);
		return dispatch(loginActions.login({ username: username }));
	};

	return {
		loginOrRegister,
		persistUserOnLogin,
		logout,
		updatePassword,
		loginState,
	};
};

export default useLogin;
