import styles from "./ProductCartController.module.scss";
import Button from "../UI/Button";

const ProductCartController = (props) => {
	return (
		<form onSubmit={props.submithandler}>
			<label htmlFor="price">
				$ <span>{props.productPrice}</span>{" "}
			</label>
			<input type="none" readOnly value={props.productAmount} />
			<div className={`${styles["btn-container"]}`}>
				<Button
					type={"reset"}
					className={`${styles["add-btn"]}`}
					onClick={props.incrimentProductHandler}
				>
					+
				</Button>
				<Button
					type={"reset"}
					className={`${styles["remove-btn"]}`}
					onClick={props.decrimentProductHandler}
				>
					-
				</Button>
			</div>
			<Button className={`${styles["to-cart-btn"]}`} type={"submit"}>
				<i className="fa-solid fa-cart-plus"></i>
			</Button>
		</form>
	);
};

export default ProductCartController;
