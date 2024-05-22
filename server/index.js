const express = require("express");

const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.set("port", PORT);

app.use(
  cors({
    optionsSuccessStatus: 200,
    origin: `https://localhost:${app.get("port")}`,
    credentials: true,
  })
);

app.get("/sse", (req, res) => {
  if (!res) return;

  res.writeHead(200, {
    "access-control-allow-origin": "*",
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
    connection: "keep-alive",
  });

  let counter = 0;

  const intervalId = setInterval(() => {
    counter++;

    let time = getTime();
    res.write(`data: ${time}\n\n`);

    if (counter === 3600) {
      clearInterval(intervalId);
      res.write(`data: close\n\n`);
    }
  }, 1000);

  req.on("close", () => {
    res.end();
  });

  // res.send("hello world!!");
});

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});

const getTime = () => {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
};
