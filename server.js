try {
	require("dotenv").config();
} catch (Error) {
	null;
}

const http = require("http");
const app = require("./app")();
const server = http.createServer(app);
const port = process.env.PORT || 3333;

server.listen(port, () => {
	console.log(`server running at http://localhost:${port}`);
});
