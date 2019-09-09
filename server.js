const connection = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const url = require("url");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "/client/build")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/blazers/:blazerId')
  .get(function(req, res, next) {
    connection.query(
      "SELECT * FROM `blazers` WHERE blazerId = ? LIMIT 3", req.params.userId,
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

// get request in node.js to route /api/hello
// the full url localhost:5000/api/hello is not needed because of the proxy configuration in the package.json folder
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/submit', (req, res) => {
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