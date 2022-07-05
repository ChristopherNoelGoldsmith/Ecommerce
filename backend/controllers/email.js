const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
	// 1 ) CREATE TRANSPORTER
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USERNAME,
			pass: process.env.EMAIL_PASSWORD,
		},
		//for some email services you may need to activate a function such as "less secure app" in gmail
	});
	// 2 ) DEFINE EMAIL OPTIONS

	const mailOptions = {
		from: "allmightyccg < allmightyccg@gmail.com >",
		to: options.email,
		subject: options.subject,
		text: options.message,
		//html: add later
	};

	// 3 ) SEND EMAIL

	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
