import { useState } from "react";
import { useEffect } from "react";
import useProductCounter from "../hooks/useProductCounter";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
	return (
		<section className={`${styles["spinner-container"]}`}>
			<div className={`${styles["spinner"]}`}>
				<div className={`${styles["spinner-inside"]}`}>{"Loading"}</div>
			</div>
		</section>
	);
};

export default LoadingSpinner;
