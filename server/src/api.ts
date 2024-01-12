import express from "express";
import cors from "cors";
const app = express();
import http from "http";
import { Server } from "socket.io";
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connection initiated: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`user initiation failed: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("server hitting...");
});
