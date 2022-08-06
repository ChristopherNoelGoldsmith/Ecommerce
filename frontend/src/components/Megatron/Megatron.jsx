//import MegatronList from "../UI/ListItem";
import styles from "./Megatron.module.scss";

const Megatron = (props) => {
	return (
		//HERO TEXT
		<section className={`${styles["megatron"]}`}>
			<div className={`${styles["image-container"]}`}>
				ALLMIGHTY CCG! <span>Located in Las Vegas Nevada</span>
			</div>
		</section>
	);
};

export default Megatron;
