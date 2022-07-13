import styles from "./Modal.module.scss";

/*
WHEN USING THIS MODEL PASS A JSX OBJECT INTO IT AS A CHILD
THEN IT WILL BNE DISPLAYED WHEN THE "useModal" HOOK IS USED
TO MAKE THE MODAL 
*/

const Modal = (props) => {
	return (
		<div onClick={props.onClick} className={`${styles.module}`}>
			{props.children}
		</div>
	);
};

export default Modal;
