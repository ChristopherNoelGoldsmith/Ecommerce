import styles from "./Module.module.scss";

const Module = (props) => {
	return (
		<div className={`${styles.module}`}>
			<section>{props.children}</section>
		</div>
	);
};

export default Module;
