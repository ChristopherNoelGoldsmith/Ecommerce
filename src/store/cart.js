import { createSlice } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import data from "../assets/rampage.json";

//Used to get rid of middleware error created by custome slice
const customeMiddleware = getDefaultMiddleware({
	serializableCheck: false,
});

const initialState = { cartContents: [], totalCost: 0 };

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
						totalPrice = target.price * itemCount;

						return {
							name: target.name,
							price: totalPrice,
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
				price: totalPrice,
				count: itemCount,
				image: target.image,
			};
			return (state = {
				cartContents: [...cartContents, item],
				totalCost: state.totalCost,
			});
		},

		//for remiving counts from the card state
		removeItem(state, action) {
			const { target, count } = action.payload;
			const { cartContents, totalCost } = state;
			console.log(target);
			const targetItem = cartContents.find((item) => item.name === target.name);
			if (!targetItem) return alert("Item is not in cart");
			const filteredCart = cartContents.filter(
				(item) => item.name !== target.name
			);

			return (state = {
				cartContents: filteredCart,
				totalCost: totalCost,
			});
		},
		//
		getTotalCost(state) {
			const { cartContents } = state;

			const total = cartContents
				.map((item) => item.price)
				.reduce((item1, item2) => {
					console.log(item1, item2);

					return item1 + item2;
				});
			console.log(cartContents);
			console.log(total);

			return (state = {
				cartContents: cartContents,
				totalCost: total,
			});
		},
	},
});

const cartReducer = cartSlice.reducer;

export const cartActions = cartSlice.actions;

export default cartReducer;
