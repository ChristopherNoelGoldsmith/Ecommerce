import styles from "./Card.module.scss";

/*
GENERAL JSX TO USE AS A WRAPPER TO MANY OF THE COMPONENTS IN THIS APP
*/

const Card = (props) => {
	return (
		<section
			onClick={(e) => e.stopPropagation()}
			{...props}
			className={`${styles.card} ${props.className}`}
		>
			<label htmlFor={props.htmlFor}>{props.label}</label>
			<div className={`${styles["overlay"]}`}></div>
			<div>{props.children}</div>
		</section>
	);
};

export default Card;
