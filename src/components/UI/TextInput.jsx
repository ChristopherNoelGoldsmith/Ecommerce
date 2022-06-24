import styles from "./TextInput.module.scss";

const TextInput = (props) => {
	return (
		<figure className={`${styles["text-input"]} ${props.className}`}>
			{props.children}
			<input type={"text"} className={`${styles["login-input"]}`} {...props} />
		</figure>
	);
};

export default TextInput;
