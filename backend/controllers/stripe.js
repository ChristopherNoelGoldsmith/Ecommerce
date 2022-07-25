const dotenv = require("dotenv");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const catchAsyncFunction = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");

//
// ? https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=checkout#create-product-prices-upfront

/*
//////////////////////////////
For item creation within stripe. The item created 
in stripe should share the same id as the products in the DB,
so you can use them interchagable in the code.

If item exists within stripe already an error will be thrown
//////////////////////////////
*/

exports.createItem = catchAsyncFunction(async (product, currency = "usd") => {
	//STRIPE 1 ) CREATE PRODUCT IN STRIPE
	console.log("poop");
	await stripe.products.create({
		id: product.id,
		name: product.name,
	});

	//STRIPE 2 ) ASSIGNS PRODUCT ID, UNIT AMOUNT, AND PRICE TO PRODUCT IN STRIPE
	console.log("poop2");

	await stripe.prices.create({
		product: product.id,
		unit_amount: product.price,
		currency: currency,
	});
});

/*
//////////////////////////////
CREATES A CHECOUT SESSION

MODE = CURRENCY TO PAY WITH. DEFAULT IS USD

URL = OBJECT WITH ENPOINTS AFTER THE SESSION IS COMPETED
//////////////////////////////
*/

exports.checkoutSession = catchAsyncFunction(
	async (cart, mode = "payment", url) => {
		//STRIPE 1 ) FORMATS THE ITEMS IN THE CART TO FIT THE CHECKOUT SESSION
		const promisedLineItems = cart.map(async (product, index) => {
			const { id, count } = product;
			console.log(id);
			const prices = await stripe.prices.list({
				product: id,
				active: true,
			});
			const [priceData] = prices.data;
			return {
				price: priceData.id,
				quantity: count || 1,
				//currency: priceData.currency,
			};
		});
		const lineItems = await Promise.all(promisedLineItems);
		if (!lineItems)
			return new AppError("AN ERROR HAS OCCOURED WITH STRIPE", 500);
		console.log(lineItems);
		//STRIPE 2 ) CREATES CHECOUT SESSION THE REDIRECTS THE USER TO THE PROPER URL
		stripe.checkout.sessions.create({
			line_items: lineItems,
			mode: mode,
			success_url: "https://youtube.com",
			cancel_url: "https://youtube.com",
		});
	}
);
