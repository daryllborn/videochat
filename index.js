const express = require("express");
const app = express();

let listener = app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running on port: " + listener.address().port);
  });

app.use(express.static("public"));