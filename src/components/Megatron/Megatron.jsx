//import MegatronList from "../UI/ListItem";
import styles from "./Megatron.module.scss";

const Megatron = (props) => {
	return (
		<section className={`${styles["megatron"]}`}>
			<div className={`${styles["image-container"]}`}></div>
		</section>
	);
};

export default Megatron;
