import styles from "./Cart.module.scss";
import data from "../../../assets/rampage.json";
import CartListItem from "./CartListItem";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import Card from "../../UI/Card";

const DUMMY_DATA = [
	data[4],
	data[1],
	data[10],
	data[11],
	data[12],
	data[100],
	data[4],
	data[1],
	data[10],
	data[11],
	data[12],
	data[100],
];

const createProductBuytList = () => {
	return DUMMY_DATA.map((item) => {
		const keys = Math.floor(Math.random()) + item.name;
		return (
			<CartListItem image={item.ultra_url_path} name={item.name} key={keys} />
		);
		//add the increase decrease buttons n shyt to this
	});
};

const Cart = (props) => {
	console.log(DUMMY_DATA);
	const product = DUMMY_DATA;

	const productBuyList = createProductBuytList();
	console.log(productBuyList);
	return (
		<Card className={`${styles.cart}`}>
			<CartHeader />
			<ul>{productBuyList}</ul>
			<CartFooter />
		</Card>
	);
};

export default Cart;
