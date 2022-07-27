import LoadingSpinner from "../components/UI/LoadingSpinner";
import styles from "./CartSuccess.module.scss";

const CartSuccess = (props) => {
	//RETURNS USER TO HOME PAGE

	setTimeout(() => {
		return (window.location.href = "https://allmightyccg.netlify.app/");
	}, 1000);

	return (
		<section className={`${styles["thank-you"]}`}>
			<figure>
				<h1>THANK YOU FOR YOUR PURCHASE!</h1>
				<LoadingSpinner />
			</figure>
		</section>
	);
};

export default CartSuccess;
