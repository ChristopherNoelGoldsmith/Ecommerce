import styles from "./Cart.module.scss";
import data from "../../../assets/rampage.json";

const DUMMY_DATA = data[1];

const Cart = (props) => {
	console.log(DUMMY_DATA);
	const product = DUMMY_DATA;
	return (
		<section className={`${styles.cart}`}>
			<div>
				<img
					name={DUMMY_DATA.name}
					src={DUMMY_DATA.ultra_url_path}
					alt=""
					srcset=""
				/>
			</div>
			<section className={`${styles.details}`}>
				<figure className={styles.extenstion}>
					{" "}
					<label htmlFor="">{DUMMY_DATA.extension}</label>
				</figure>
				<label htmlFor={DUMMY_DATA.name}>{DUMMY_DATA.name}</label>
			</section>
		</section>
	);
};

export default Cart;
