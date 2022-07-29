export const convertPricetoDollarAmount = (price) => {
	const string = `${price}`;
	const start = string.length <= 2 ? "00" : string.slice(0, string.length - 2);
	const end = string.slice(string.length - 2, string.length);
	console.log(string, 1, start, 2, end);
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
