const express = require("express");
const { join } = require("path");
const port = 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("*", (req, res, next) => {
  // Logger
  let time = new Date();
  console.log(
    `${req.method} to ${
      req.originalUrl
    } at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  );
  next();
});

app.get("/build.js", (req, res) => {
  if (req.header("Accept-Encoding").includes("br")) {
    // sending brotli compressed file
    res.set("Content-Encoding", "br");
    res.set("Content-Type", "application/javascript");
    res.sendFile(join(__dirname, "dist", "build.js.br"));
  } else if (req.header("Accept-Encoding").includes("gz")) {
    // sending gzip compressed file
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", "application/javascript");
    res.sendFile(join(__dirname, "dist", "build.js.gz"));
  } else {
    // if client doesn't support either, send uncompressed file
    res.sendFile(join(__dirname, "dist", "build.js"));
  }
});

app.use((req, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});

app.listen(port, "0.0.0.0", (req, res) => {
  console.log(`Listetning on localhost:${port}`);
});
