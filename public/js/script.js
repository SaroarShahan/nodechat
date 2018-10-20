(function() {
  "use strict";

  const socket = io();

  socket.on("connect", () => {
    console.log("Connected to server");

    socket.emit("newMgsCreated", {
      to: "Shahan",
      text: "Hi"
    });
  });

  socket.on("NewMgs", mgs => {
    console.log(mgs);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from server");
  });
})();
