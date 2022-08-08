//! BUG TO BE FIXED.  PRICES STARTING WITH 00. SUCH AS 00.79 TRANSLATE TO 79.00 WHICH ADDED TO CART

export const convertPricetoDollarAmount = (price) => {
	const string = `${price}`;

	//FOR PROPERLY FORMATTING PRICES THAT INCRIMENT IN THE CART AFTER THEY HAVE BEEN CONVERTED TO DECIMAL
	if (string.match(/\./)) {
		const splitString = string.split(".");

		const [start, end] = splitString;
		if (start === "00" || end === "00") return;
		if (end.length < 2) return start + "." + end + "0";

		return string;
	}

	//FOR EVEN DOLLAR AMOUNTS LIKE 7 DOLLARS AND 0 CENTS
	if (string.length === 1) {
		return string + ".00";
	}
	const start = string.length <= 2 ? "00" : string.slice(0, string.length - 2);
	const end = string.slice(string.length - 2, string.length);
	const result = start + "." + end;
	return result;
};

export const addDecimalToPrice = (number) => {
	//RegExp DETERMINE WEATHER NUMBER NEEDS TO BE MUTATED
	const regExp = /\d+\.\d\d/;
	const regExpForSingleCents = /\d+\.\d/;

	// CONVERSION 1 ) CONVERTS NUMBER TO STRING FOR MUTATION WITH '0'
	let numberToString = number.toString();

	//CONVERSION 2 ) CHECKS THE STRING WITH THE STANDARD RegExp FOR CHECKING FOR CENTS
	if (!numberToString.match(regExp)) {
		//checks to see if cents is a single nubmer like .1 and adds a 0 to the end making it .10 for cents
		const checkForMissingCents = numberToString.match(regExpForSingleCents);
		if (checkForMissingCents) numberToString = numberToString + "0";
		if (!checkForMissingCents) numberToString = numberToString + ".00";
	}
	const numberToDollars = numberToString.match(regExp);
	return numberToDollars[0];
};

//TRIMS ANY NAME AFTER A CERTAIN NUMBER OF CHARACTERS
export const trimName = (props, limit = 20) => {
	if (props.productName.length > 25) {
		let trimmedName = props.productName.slice(0, limit);
		trimmedName = trimmedName + "...";
		return trimmedName;
	}
	return props.productName;
};
