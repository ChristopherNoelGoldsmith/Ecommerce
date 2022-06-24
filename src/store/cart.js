/*

When passing any data through the cartActions
it must be passed as {target: , count:}

*/

import { createSlice } from "@reduxjs/toolkit";

//Used to get rid of middleware error created by custome slice

const initialState = { cartContents: [], totalCost: 0 };

const convertToDollarAmount = (number) => {
	const regExp = /\d+\.\d\d/;
	const regExpForSingleCents = /\d+\.\d/;
	let numberToString = number.toString();
	if (!numberToString.match(regExp)) {
		//checks to see if cents is a single numer like .1 and adds a 0 to the end making it .10 for cents
		const checkForMissingCents = numberToString.match(regExpForSingleCents);
		if (checkForMissingCents) numberToString = numberToString + "0";
		if (!checkForMissingCents) numberToString = numberToString + ".00";
	}
	const numberToDollars = numberToString.match(regExp);
	return numberToDollars[0];
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addItem(state, action) {
			const { target, count } = action.payload;
			const { cartContents } = state;
			//Handles invalid counts;
			if (count < 1 || false) return;
			//sends in item object with a count
			//Multiplied by 1 to ensure count is a number.
			let itemCount = count * 1;
			let totalPrice = convertToDollarAmount(target.price * itemCount);

			//Checks the store for the item in the cart

			const targetItem = cartContents.find((item) => item.name === target.name);
			//If targetItem returns true creates a new state with the count and total price mutated.
			if (targetItem) {
				const newState = cartContents.map((item) => {
					if (target.name === item.name) {
						itemCount = item.count + itemCount;
						const total = target.price * itemCount;
						totalPrice = convertToDollarAmount(total);
						target.price = convertToDollarAmount(target.price);
						return {
							name: target.name,
							price: target.price,
							total: totalPrice,
							count: itemCount,
							image: target.image,
						};
					}
					return item;
				});
				return {
					cartContents: newState,
					totalCost: state.totalCost,
				};
			}

			const item = {
				name: target.name,
				price: target.price,
				total: totalPrice,
				count: itemCount,
				image: target.image,
			};
			return (state = {
				cartContents: [...cartContents, item],
				totalCost: state.totalCost,
			});
		},
		incrimentItem(state, action) {
			const { target } = action.payload;
			const { cartContents } = state;
			cartContents.forEach((item) => {
				if (item.name === target.name) {
					item.count = item.count + 1;
					item.total = convertToDollarAmount(item.price * item.count);
				}
			});
		},
		decrimentItem(state, action) {
			const { target } = action.payload;
			const { cartContents } = state;
			cartContents.forEach((item) => {
				if (item.name === target.name) {
					item.count = item.count - 1;
					item.total = convertToDollarAmount(item.price * item.count);
				}
			});
		},
		//for removing counts from the card state
		removeItem(state, action) {
			const { target } = action.payload;
			const { cartContents } = state;
			const targetItem = cartContents.find((item) => item.name === target.name);
			if (!targetItem) return alert("Item is not in cart");
			const filteredCart = cartContents.filter(
				(item) => item.name !== target.name
			);

			state.cartContents = filteredCart;
		},
		//
		getTotalCost(state) {
			/*
			ERROR
			when removing last item from cart
			price does not set to 0
			
			*/

			const { cartContents } = state;

			if (cartContents.length === 0) {
				return {
					cartContents: state.cartContents,
					totalCost: "0.00",
				};
			}

			const total = cartContents
				.map((item) => item.total * 1)
				.reduce((item1, item2) => {
					return item1 + item2;
				});
			const trimmedTotal = convertToDollarAmount(total);
			state.totalCost = trimmedTotal;
		},
	},
});

const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;

export default cartReducer;
