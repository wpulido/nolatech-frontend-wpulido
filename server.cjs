// server.js
const io = require("socket.io")(3001, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("new-post", (post) => {
    socket.broadcast.emit("new-post", post);
  });

  socket.on("post-updated", (post) => {
    socket.broadcast.emit("post-updated", post);
  });
});
