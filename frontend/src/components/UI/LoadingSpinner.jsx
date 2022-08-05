import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = (props) => {
	return (
		<section className={`${styles["spinner-container"]}`}>
			<div className={`${styles["spinner"]}`}>
				<div className={`${styles["spinner-inside"]}`}>
					{!props.content ? "Loading" : props.content}
				</div>
				<div className={`${styles["spinner-sector"]}`}></div>
			</div>
		</section>
	);
};

export default LoadingSpinner;
