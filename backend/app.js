const  express = require("express")
const dotenv =require( "dotenv")
const connectToMongoDB = require("./db/connectToMongoDb.js")
const cookieParser = require("cookie-parser")
const messageRoutes=require("./routes/message.routes.js")
const  authRoutes = require( "./routes/auth.routes.js")
const  userRoutes = require( "./routes/user.routes.js")
const Server=require("socket.io").Server
const cors=require("cors")
const createServer=require("http").createServer

dotenv.config()
const app=express()
const PORT=process.env.PORT||5000
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json())
app.use(cookieParser())


app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
app.use("/api",userRoutes)

server.listen(PORT,(err)=>{
    connectToMongoDB()
    if(err){
        console.log('Error form connecting server');
    }else{
        console.log('server running successfully',PORT);
    }
})

io.on("connection",(socket)=>{
    console.log("------------------------------------------")
    console.log("user connected ",socket.id)
    socket.on("online-user",(id)=>{
      io.emit("get-online-user",id)
    })
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
})
