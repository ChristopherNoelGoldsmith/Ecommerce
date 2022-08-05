import styles from "./Modal.module.scss";
import Button from "../UI/Button";
/*
WHEN USING THIS MODEL PASS A JSX OBJECT INTO IT AS A CHILD
THEN IT WILL BNE DISPLAYED WHEN THE "useModal" HOOK IS USED
TO MAKE THE MODAL 
*/

const Modal = (props) => {
	return (
		<div onClick={props.onClick} className={`${styles["modal"]}`}>
			<div className={`${styles["modal-container"]}`}>
				<Button className={`${styles["close-btn"]}`}>X</Button>
				{props.children}
			</div>
		</div>
	);
};

export default Modal;
