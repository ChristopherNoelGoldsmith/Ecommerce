/*
--example of the objects contained within the product array

asset: "mha01/164.png"
attack_zone: "mid"
block_modifier: 2
block_zone: "mid"
control: 3
damage: 6
difficulty: 5
extension: "My Hero Academia"
extension_short: "mha01"
formats: (3) ['retro', 'standard', 'My Hero Academia']
keywords: ['Ranged']
name: "20 Meter Tongue Strike"
numero: 164
numero_image: 164
rarity: "common"
resources: (3) ['water', 'air', 'life']
speed: 4
text: "Enhance: If your character is committed, commit 1 rival foundation."
type: "attack"

*/

import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/rampage.json";

const initialState = {
	data,
	selected: [],
};

const productSlice = createSlice({
	name: "products",
	initialState: initialState,
	reducers: {
		getProduct(state, action) {
			if (action === null) return;
			return (state.selected = [
				...state.selected,
				data.find(data.name == action.payload.productName),
			]);
		},
		removeProduct(state, action) {
			if (action == null) return;
			return (state.selected = state.selected.filter(
				(product) => product.name !== action.payload.productName
			));
		},
	},
});

const productReducers = productSlice.reducer;

export const productActions = productSlice.actions;

export default productReducers;
