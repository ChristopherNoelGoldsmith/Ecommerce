class APIFeatures {
	/// 1 ) the first param contains the data from the query | req.query goes in second param.
	/* 
	
	*/
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		console.log("filter");
		const queryObj = { ...this.queryString };
		// 1 ) Basic URL filtering - Removed Unwanted Fields
		const excludeFields = ["page", "sort", "limit", "fields"];
		excludeFields.forEach((el) => delete queryObj[el]);
		// 2 ) Advanced URL filtering - changes conditionalse (ex: gte) to mongoDB format (ex: $gte)
		let queryStr = JSON.stringify(queryObj);
		this.queryString = queryStr.replace(
			/\b(gt|gte|lt|lte)\b/g,
			(match) => `$${match}`
		);
		this.queryString = JSON.parse(queryStr);
		this.query = this.query.find(this.queryString);
	}

	sort() {
		if (this.query.sort) this.query = this.query.sort(this.queryString.sort);
		return;
	}

	// 3 ) Fields
	fields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			this.query.select("-__v");
		}
	}

	pagenation = async () => {
		// 4 Pagenation
		//Limit is the max amount per page, and skip represent the number of items skipped before the page starts
		// all items multiplied by 1 to be sure they are Numbers
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 25;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		if (this.queryString.page) {
			const numberOfItems = await Product.countDocuments();
			if (skip > numberOfItems) throw new Error("THIS PAGE DOES NOT EXIST!");
		}
	};

	init = () => {
		this.filter();
		this.sort();
		this.fields();
		this.pagenation();
		return this.query;
	};
}

const model = APIFeatures;

module.exports = model;
