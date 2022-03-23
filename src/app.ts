import express from "express";
import { router } from "./routes";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import signale from "signale";
import { GITHUB_CLIENT_ID } from "./constants";
const app = express();

app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  signale.info("User connected on socket id:", socket.id);
});

app.use(express.json());

app.use(router);

app.get("/github", (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
  );
});

app.get("/signin/callback", (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

export { serverHttp, io };
