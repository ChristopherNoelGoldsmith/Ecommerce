import styles from "./PageButtons.module.scss";
import Button from "./Button";

const generatePagenationbuttons = (props) => {
	const pages = [];
	const numberOfPages = Math.ceil(props.category.length / props.numberPerPage);
	for (let i = 0; i < numberOfPages; i++) {
		const key = `pagebtn${Math.random() * 500}`;
		const pageButton = (
			<Button
				key={key}
				onClick={() => props.setPageNumber(i + 1)}
				className={`${styles["page-btn"]}`}
			>
				{pages.length + 1}
			</Button>
		);

		pages.push(pageButton);
	}
	return pages;
};

const PageButtons = (props = null) => {
	const pages = generatePagenationbuttons(props);
	return <section>{pages}</section>;
};

export default PageButtons;
