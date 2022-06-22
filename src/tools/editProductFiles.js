const fs = require("fs");
const rampage = require("../assets/rampage.json");

const fileToEdit = {
	type: "EDIT",
	file: rampage,
	path: "../assets/rampage.json",
};

const editFiles = (params) => {
	if (params.type === "EDIT") {
		fs.readFile(params.path, (err, data) => {
			data = JSON.parse(data);
			//adds prices
			const editedData = data.map((item) => {
				const cents = () => {
					let money = Math.floor(Math.random() * 99);
					money = money.toString();
					if (money.length < 2) return (money = `${money}0`);
					return money;
				};
				const price = `${Math.floor(Math.random() * 80)}.${cents()}`;
				console.log(price);
				item.price = price;
				return item;
			});
			data = JSON.stringify(data);
			fs.writeFile(params.path, data, "utf-8", (err, data2) => {
				if (err) return console.log(err);
				console.log(data2);
				return data2;
			});
		});
	}
};

editFiles(fileToEdit);
