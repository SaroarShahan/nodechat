const express = require("express");
const socketIO = require("socket.io");
const path = require("path");
const http = require("http");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

// setup app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");

  socket.emit("NewMgs", {
    from: "Saroar Hossain Shahan",
    text: "Helo",
    createAt: 55
  });

  socket.on("newMgsCreated", mgs => {
    console.log(mgs);
  });

  socket.on("disconnect", () => {
    console.log("Disconnect from server");
  });
});

server.listen(port, () => {
  console.log(`Server connected on ${port}`);
});
