import express from "express";
import http from "http";
import { Server as socketio } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new socketio(server);

app.set("view engine", "ejs");
app.set(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  // Example of receiving a message from a client
  socket.on("message", (msg) => {
    console.log("message received:", msg);
    // Broadcast the message to all connected clients
    io.emit("message", msg);
  });
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

server.listen(3000);
