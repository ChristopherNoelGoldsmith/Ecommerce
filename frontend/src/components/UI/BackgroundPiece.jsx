import styles from "./BackgroundPiece.module.scss";

const BackgroundPiece = (props) => {
	return (
		<div className={`${styles["bg-container"]}`}>
			<div className={`${styles["bg-inner"]}`}></div>
		</div>
	);
};

export default BackgroundPiece;
