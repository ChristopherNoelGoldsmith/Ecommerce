const Product = require("../models/product");

class APIFeatures {
	/* 
	/// 0 ) the first param contains the data from the query | req.query goes in second param.
	
	example -> const query = new APIFeatures([Query Object] ,req.query ).[method]

	This class is the primary filter for API features giving full funtionallity to the query string being paseed
	through the 
	*/
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	// 1 ) Filtering the query string and converting some values to be compatable with mongoose
	filter() {
		const queryObj = { ...this.queryString };
		// A ) Basic URL filtering - Removed Unwanted Fields
		const excludeFields = ["page", "sort", "limit", "fields"];
		excludeFields.forEach((el) => delete queryObj[el]);
		// B ) Advanced URL filtering - changes conditionalse (ex: gte) to mongoDB format (ex: $gte)
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
		queryStr = JSON.parse(queryStr);
		this.query = this.query.find(this.queryString);
		return this;
	}

	// 2 Sorting via mongo db input to sort --{string, + or -}--
	sort() {
		if (this.query.sort) this.query = this.query.sort(this.queryString.sort);
		return this;
	}

	// 3 ) Fields
	fields() {
		if (this.queryString.fields) {
			// A ) Converts fields to be compatable with mongo db. --String String String...--
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			this.query.select("-__v");
		}
		return this;
	}

	// 4 ) Pagenation
	pagenation = async () => {
		//Limit is the max amount per page, and skip represent the number of items skipped before the page starts
		// all items multiplied by 1 to be sure they are Numbers
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 25;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		if (this.queryString.page) {
			const numberOfItems = await Product.countDocuments();
			console.log(numberOfItems);
			this.numberOfPages = Math.ceil(numberOfItems / limit);
			if (skip > numberOfItems) throw new Error("THIS PAGE DOES NOT EXIST!");
		}
		return this;
	};

	// 5 ) initiation function running all params through the above funtions
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
