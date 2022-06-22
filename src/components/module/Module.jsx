import styles from "./Module.module.scss";

const Module = (props) => {
	return (
		<div onClick={props.onClick} className={`${styles.module}`}>
			{props.children}
		</div>
	);
};

export default Module;
