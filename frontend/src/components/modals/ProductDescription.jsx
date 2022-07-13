import { useEffect, useState } from "react";
/*
will ideally pass
props.name
props.extension
props.text
*/
//TODO make this
const createDescriptionList = (props, className = "") => {
	const list = [];
	for (let each in props) {
		list.push(each);
	}
	return list.map((listItem) => {
		const item = props[listItem];
		return <li className={className}>{item}</li>;
	});
};

const ProductDescription = (props) => {
	const description = createDescriptionList(props);

	return (
		<section>
			<ul>{description}</ul>
		</section>
	);
};

export default ProductDescription;
