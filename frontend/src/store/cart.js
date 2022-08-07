/*
When passing any data through the cartActions
it must be passed as {target: , count:}
*/

import { createSlice } from "@reduxjs/toolkit";
import { addDecimalToPrice } from "../components/utilityScripts/priceUtil";
//Used to get rid of middleware error created by custome slice

const initialState = { cartContents: [], totalCost: 0, totalItems: 0 };

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
			let totalPrice = target.price * itemCount;

			//Checks the store for the item in the cart
			const targetItem = cartContents.find((item) => item.name === target.name);
			//If targetItem returns true creates a new state with the count and total price mutated.
			if (targetItem) {
				const newState = cartContents.map((item) => {
					if (target.name === item.name) {
						itemCount = item.count + itemCount;
						const total = target.price * itemCount;
						totalPrice = total;
						target.price = target.price;
						return {
							name: target.name,
							price: target.price,
							total: totalPrice,
							count: itemCount,
							image: target.image,
							id: target.id,
						};
					}
					return item;
				});
				state.cartContents = newState;
				return;
			}

			const item = {
				name: target.name,
				price: target.price,
				total: totalPrice,
				count: itemCount,
				image: target.image,
				id: target.id,
			};
			state.cartContents = [...cartContents, item];
			return;
		},

		incrimentItem(state, action) {
			const { target } = action.payload;
			const { cartContents } = state;
			cartContents.forEach((item) => {
				if (item.name === target.name && item.count < 99) {
					item.count = item.count + 1;
					item.total = addDecimalToPrice(item.price * item.count);
				}
			});
			return;
		},
		decrimentItem(state, action) {
			const { target } = action.payload;
			const { cartContents } = state;
			cartContents.forEach((item) => {
				if (item.name === target.name && item.count > 0) {
					item.count = item.count - 1;
					item.total = addDecimalToPrice(item.price * item.count);
				}
			});
			return;
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
			return;
		},
		//
		getTotalCost(state) {
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
			console.log(total);
			const trimmedTotal = addDecimalToPrice(total);
			state.totalCost = trimmedTotal;
			return;
		},
		getTotalNumberOfItems(state) {
			const total = state.cartContents
				.map((item) => item.count)
				.reduce((item1, item2) => {
					return item1 + item2;
				});
			state.totalItems = total;
			return;
		},
	},
});

const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;

export default cartReducer;
