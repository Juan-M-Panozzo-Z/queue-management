import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import http from "http";
import path from "path";
import mongoose from "mongoose";
import { Server } from "socket.io";

dotenv.config();
const { DATABASE_URL } = process.env;

// routes
import usersRoutes from "./routes/users.js";
import queueRoutes from "./routes/queues.js";
import messageRoutes from "./routes/messages.js";
import { ventanilla, tv, lineup, err404 } from "./routes/views.js";

// models for socket.io middleware
import Queue from "./models/Queue.js";

// Express config
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Mongoose config using .env
mongoose
  .connect(DATABASE_URL || "mongodb://localhost:27017/queue-management-system")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));

// Middlewares config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Socket.io config
io.on("connection", (socket) => {
  socket.on("ventanilla", (msg) => {
    switch (msg) {
      case "next":
        (async () => {
          try {
            const queue = await Queue.find({ isWaiting: true })
              .sort({ createdAt: 1 })
              .limit(1)
              .select("idup");
            const { _id, idup } = queue[0];
            io.emit("tv", idup);
            console.log(`Se llamo el turno con el idup: ${queue[0].idup}`);
            await Queue.findByIdAndUpdate(_id, {
              isWaiting: false,
            });
          } catch {
            console.log("No hay turnos en fila");
          }
        })();
        break;
      case "recall":
        (async () => {
          try {
            const queue = await Queue.find({ isWaiting: false })
              .sort({ createdAt: -1 })
              .limit(1)
              .select("idup");
            const { idup } = queue[0];
            io.emit("tv", idup);
            console.log(`Se volvió a llamar al turno: ${idup}`);
          } catch {
            console.log("No hay ningun turno anterior");
          }
        })();
        break;
      case "msg":
        break;
      default:
        break;
    }
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
