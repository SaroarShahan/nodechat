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

  // socket.emit from admin text welcome to the chat app
  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the node chap app",
    createdAt: new Date().getTime()
  });

  // socket.broadcast.emit from admin text new user joined
  socket.broadcast.emit("newMessage", {
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime()
  });

  socket.on("createdMessage", mgs => {
    console.log(mgs);
    io.emit("newMessage", {
      from: mgs.from,
      text: mgs.text,
      createdAt: new Date().getTime()
    });

    // socket.broadcast.emit("newMessage", {
    //   from: mgs.from,
    //   text: mgs.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on("disconnect", () => {
    console.log("Disconnect from server");
  });
});

server.listen(port, () => {
  console.log(`Server connected on ${port}`);
});
