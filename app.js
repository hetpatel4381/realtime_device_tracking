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
app.use(express.static(path.join(__dirname, "public"))); // Corrected to app.use

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
