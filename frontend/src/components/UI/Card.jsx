import styles from "./Card.module.scss";

const Card = (props) => {
	return (
		<section
			onClick={(e) => e.stopPropagation()}
			className={`${styles.card}`}
			{...props}
		>
			<label htmlFor={props.htmlFor}>{props.label}</label>
			<div>{props.children}</div>
		</section>
	);
};

export default Card;
