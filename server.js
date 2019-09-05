const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const url = require("url");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/client/build")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get request in node.js to route /api/hello
// the full url localhost:5000/api/hello is not needed because of the proxy configuration in the package.json folder
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.listen(port, () => console.log(`Express Server running on port ${port}`));

process.on("SIGINT", () => {
  // config.disconnectDB();
  process.exit(0);
});