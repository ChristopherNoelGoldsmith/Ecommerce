import { useDispatch, useSelector } from "react-redux/es/exports";
import { loginActions } from "../../store/login";

/*///////////////////////////////////////////////////////////////////
CONTROLS ALL LOGIN AND REGISTRATION FUNCTIONS WITHIN THE APPLICATION!
*/ ///////////////////////////////////////////////////////////////////

const useLogin = () => {
	const dispatch = useDispatch();
	const loginState = useSelector((store) => store.login);
	const mount = "https://allmightyccg.herokuapp.com/api/v1";

	const queryApi = async (query, userInfo) => {
		// API CONNECT 1 ) NORMAL API CONNECTION SENDING THE USERNAME/EMAIL AND PASSWORD
		try {
			console.log(query, userInfo);
			const response = await fetch(`${mount}/users/${query}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userInfo),
			}).then((res) => res.json());

			//SECURITY 1 ) COOKIES
			document.cookie = `loginToken=${response.token}`;
			console.log(response);
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
		document.cookie = `loginToken=''`;
		dispatch(loginActions.logout());
		return;
	};

	return { loginOrRegister, logout, loginState };
};

export default useLogin;
