/*SYNTAX ISSUE

the slice refers to the products name and price as
'name' and 'price' but some funtions refer to them as
'productName' and 'productPrice'

Make the rest of the components standard to fit as
product[name of property]

*/

import styles from "./Cart.module.scss";
import data from "../../../assets/rampage.json";
import CartListItem from "./CartListItem";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import Card from "../../UI/Card";
import useCart from "../../hooks/useCart";

const createProductBuyList = (cartContents, onClickEvents) => {
	const { removeItem } = onClickEvents;

	return cartContents.map((item) => {
		const keys = Math.floor(Math.random() * 1000) + item.name;
		return (
			<CartListItem
				item={item}
				price={item.price}
				image={item.image}
				name={item.name}
				key={keys}
				productAmount={item.count}
				incrimentProductHandler={null}
				decrimentProductHandler={null}
				removeItem={removeItem}
			/>
		);
		//add the increase decrease buttons n shyt to this
	});
};

const Cart = () => {
	const { cart, removeItem } = useCart();
	const { cartContents, totalCost } = cart;
	const onClickEvents = { removeItem };
	console.log(totalCost);
	const productBuyList = createProductBuyList(cartContents, onClickEvents);
	return (
		<Card onClick={(e) => e.stopPropagation()} className={`${styles.cart}`}>
			<CartHeader />
			<ul>{productBuyList}</ul>
			<CartFooter totalCost={totalCost} />
		</Card>
	);
};

export default Cart;
