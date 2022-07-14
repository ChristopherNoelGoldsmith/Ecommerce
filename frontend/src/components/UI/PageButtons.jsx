import styles from "./PageButtons.module.scss";
import Button from "./Button";

const generatePagenationbuttons = (props) => {
	// OUTPUT 1 ) @pages is the holder of the page buttons.
	const pages = [];

	const numberOfPages = props.numberPerPage;
	const generatePages = () => {
		// CANCEL TRIP 1 ) CANCELS RECCURSION ON AN INVALID NUMBER OF PAGES OR UPON MEETING THE NUMBER
		if (pages.length >= numberOfPages || !numberOfPages) return;

		//TODO: CREATE DEDICATED FUNCTION FOR ALL KEYS IN COMPONENTS
		const key = `pagebtn${Math.random() * 500}`;
		const pageNumber = pages.length + 1;

		// JSX 2 ) ADDED TO THE pages ARRAY WHILE RECCURSION IS HAPPENING
		const pageButton = (
			<Button
				key={key}
				onClick={() => props.setPageNumber(pageNumber)}
				className={`${styles["page-btn"]}`}
			>
				{pages.length + 1}
			</Button>
		);
		pages.push(pageButton);

		return generatePages();
	};
	//RECCURSION INITIATION
	generatePages();
	return pages;
};

// JSX 1 ) FUNCTION WHICH RETURNS THE JSX FOR THE FINAL COMPONENT
const PageButtons = (props = null) => {
	const pages = generatePagenationbuttons(props);
	return <section>{pages}</section>;
};

export default PageButtons;
