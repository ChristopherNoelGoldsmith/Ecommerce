import styles from "./Modal.module.scss";

const Modal = (props) => {
	return (
		<div onClick={props.onClick} className={`${styles.module}`}>
			{props.children}
		</div>
	);
};

export default Modal;
