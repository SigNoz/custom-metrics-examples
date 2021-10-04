const express = require("express");
const { countAllRequests } = require("./monitoring");
const app = express();
app.use(countAllRequests());

const PORT = process.env.PORT || "8080";

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});