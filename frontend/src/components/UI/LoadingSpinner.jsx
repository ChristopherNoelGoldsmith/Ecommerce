import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
	return (
		<section className={`${styles["spinner-container"]}`}>
			<div className={`${styles["spinner"]}`}>
				<div className={`${styles["spinner-inside"]}`}>{"Loading"}</div>
				<div className={`${styles["spinner-sector"]}`}>{"Loading"}</div>
			</div>
		</section>
	);
};

export default LoadingSpinner;
