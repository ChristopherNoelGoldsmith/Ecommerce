import styles from "./Card.module.scss";

const Card = (props) => {
	return (
		<figure className={`${styles.card}`}>
			<label htmlFor={props.htmlFor}>{props.label}</label>
			<div>{props.children}</div>
		</figure>
	);
};

export default Card;
