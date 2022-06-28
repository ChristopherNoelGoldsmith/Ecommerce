//make this into a mini library
export const regExp = {
	hasNumber: /\d/,
	hasLetter: /\w/,
	hasUppercase: /[A-Z]/,
	hasLowerCase: /[a-z]/,
	hasSpecialCharacter: /\W/,
	hasWhiteSpace: /\s/,
};

//PLACEHOLDER FUNCTION UNTIL POPUP MODAL IS CREATED
export const notValidHanlder = (message) => {
	alert(message);
	return false;
};

export const checkValidity = (action) => {
	const username = action.username;
	const password = action.password;

	//USERNAME CHECKS AND PASSWORD CHECKS
	if (username.length < 5)
		return notValidHanlder("USERNAME MUST BE AT LEAST 5 CHARACTERS");
	if (regExp.hasWhiteSpace.test(username))
		return notValidHanlder("USERNAME CANNOT HAVE SPACES!");
	if (regExp.hasSpecialCharacter.test(username))
		return notValidHanlder("USERNAME CANNOT CONTAIN SPECIAL CHARACTERS!");
	if (password.length < 5)
		return notValidHanlder("USERNAME MUST BE AT LEAST 5 CHARACTERS");
	//PASSWORD CHECKS
	if (!regExp.hasSpecialCharacter.test(password))
		return notValidHanlder(
			"PASSWORD MUST CONTAIN AT LEAST 1 SPECIAL CHARACTER!"
		);
	if (regExp.hasWhiteSpace.test(password))
		return notValidHanlder("PASSWORD CANNOT HAVE SPACES!");
	if (
		!regExp.hasUppercase.test(password) ||
		!regExp.hasLowerCase.test(password)
	)
		return notValidHanlder(
			"PASSWORD HAVE BOTH LOWERCASE AND UPPERCASE CHARACTERS!"
		);
	return true;
};
