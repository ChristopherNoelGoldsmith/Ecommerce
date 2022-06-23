/*

When passing any data through the cartActions
it must be passed as {target: , count:}

*/

import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/rampage.json";

//Used to get rid of middleware error created by custome slice

const initialState = { cartContents: [], totalCost: 0 };

const convertToDollarAmount = (number) => {
	const regExp = /\d+\.\d\d/;

	const numberToString = number.toString() + "0";
	const numberToDollars = numberToString.match(regExp);
	console.log(numberToDollars);
	return numberToDollars;
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
			//console.log(action.payload);
			//sends in item object with a count
			console.log(action.payload);
			//Multiplied by 1 to ensure count is a number.
			let itemCount = count * 1;
			let totalPrice = target.price * itemCount;

			//Checks the store for the item in the cart

			const targetItem = cartContents.find((item) => item.name === target.name);
			//If targetItem returns true creates a new state with the count and total price mutated.
			if (targetItem) {
				const newState = cartContents.map((item) => {
					if (target.name === item.name) {
						itemCount = item.count + itemCount;
						const total = target.price * itemCount;
						totalPrice = convertToDollarAmount(total);
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
			const newState = cartContents.forEach((item) => {
				if (item.name === target.name) {
					item.count = item.count + 1;
					item.total = convertToDollarAmount(item.price * item.count);
				}
			});
		},
		decrimentItem(state, action) {
			const { target } = action.payload;
			const { cartContents } = state;
			const newState = cartContents.forEach((item) => {
				if (item.name === target.name) {
					item.count = item.count - 1;
					item.total = convertToDollarAmount(item.price * item.count);
				}
			});
		},
		//for removing counts from the card state
		removeItem(state, action) {
			const { target } = action.payload;
			const { cartContents, totalCost } = state;
			console.log(target);
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

			const total = cartContents
				.map((item) => item.total)
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
