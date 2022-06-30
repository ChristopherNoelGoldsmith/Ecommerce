const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: `${__dirname}/config.env` });
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`hello from the server on PORT:${PORT}`));
