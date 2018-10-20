// (function() {
//   "use strict";

const socket = io();

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("newMessage", mgs => {
  console.log(mgs);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
// })();
