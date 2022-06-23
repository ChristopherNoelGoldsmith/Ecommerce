const fs = require("fs");
const rampage = require("../assets/rampage.json");

const fileToEdit = {
	type: "EDIT",
	file: rampage,
	path: `${__dirname}/../assets/rampage.json`,
};

const editFiles = (params) => {
	if (params.type === "EDIT") {
		fs.readFile(params.path, (err, data) => {
			data = JSON.parse(data);
			console.log(data);
			const editedData = data.map((item) => {
				const purchaseCount = Math.floor(Math.random() * 1000);
				item.purchaseCount = purchaseCount;
				return item;
			});
			data = JSON.stringify(editedData);
			console.log(editedData);
			fs.writeFile(params.path, data, "utf-8", (err, data2) => {
				if (err) return console.log(err);
				console.log(data2);
				return data2;
			});
		});
	}
};

editFiles(fileToEdit);
