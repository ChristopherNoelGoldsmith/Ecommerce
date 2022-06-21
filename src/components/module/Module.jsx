import styles from "./Module.module.scss";

const Module = (props) => {
	return <div className={`${styles.module}`}>{props.children}</div>;
};

export default Module;
