import express from "express";
import bodyParser from "body-parser";
import http from "http";
import path from "path";
import mongoose from "mongoose";
import { Server } from "socket.io";

// routes
import usersRoutes from "./routes/users.js";
import queueRoutes from "./routes/queues.js";
import messageRoutes from "./routes/messages.js";
import { ventanilla, tv, lineup, err404 } from "./routes/views.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Mongoose config
mongoose
  .connect(
    "mongodb+srv://jmpz:residentEvil4Remake@cluster0.pab21ft.mongodb.net/turnero_test"
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));

// Middlewares config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Socket.io config
io.on("connection", (socket) => {
  socket.on("ventanilla", (msg) => {
    switch (msg) {
      case "next":
        io.emit("tv", msg);
        break;
      case "previous":
        break;
      case "recall":
        break;
      case "msg":
        break;
      default:
        break;
    }

    io.emit("ventanilla", msg);
    console.log(`Evento escuchado: ${msg}`);
  });
});

// Static files
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/video", express.static(path.join(__dirname, "public/video")));

// API
app.use("/api/users", usersRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/messages", messageRoutes);

// Views
app.use("/", ventanilla);
app.use("/", tv);
app.use("/", lineup);
app.use("*", err404);

// Server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`
  BIENVENIDO A QUEUE MANAGEMENT SYSTEM
  -------------------------------------------
  
  Servidor corriendo en el puerto ${PORT}
  
  http://localhost:${PORT}
  
  >  APIs:
  http://localhost:${PORT}/api/users
  http://localhost:${PORT}/api/queues
  http://localhost:${PORT}/api/messages
  http://localhost:${PORT}/api/lineup

  >  Views:
  http://localhost:${PORT}/ventanilla
  http://localhost:${PORT}/tv
  
  Para salir presione CTRL + C
  -------------------------------------------
  `);
});
