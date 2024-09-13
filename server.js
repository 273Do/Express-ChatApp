// expressの読み込み
const express = require("express");

// expressの初期化
const app = express();
const http = require("http");

// httpサーバーの作成
const server = http.createServer(app);
const io = require("socket.io")(server);

// ポートの設定
const PORT = 3000;

// ルートパスにアクセスした時の処理
app.get("/", (req, res) => {
  // __dirnameはこのファイルが存在するディレクトリを表す
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // メッセージを受け取る(socket.onを指定keyはchat message)
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log("Server listening at port %d", PORT);
});
