const app=require("express")()
const Server=require("socket.io").Server
const createServer=require("http").createServer
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });


module.exports={server,io}