// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const path = require('path');
//
// // 初始化应用和服务器
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
//
// // 将当前目录设置静态文件目录，可以直接访问其中的文件
// app.use(express.static(__dirname));
//
// // 示例路由：当访问根路由（/）时，返回index.html文件。
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });
//
// // Socket.IO连接事件 -- 当客户端连接到服务器时，会触发一系列事件
// io.on('connection', (socket) => {
//
//   // 方便日志记录的函数
//   function log() {
//     const array = ['>>> Message from server: '];
//     for (let i = 0; i < arguments.length; i++) {
//       array.push(arguments[i]);
//     }
//     socket.emit('log', array);
//   }
//   //当收到客户端发的消息，想房间内其他客户端广播该消息
//   socket.on('message', (message) => {
//     log('Got message:', message);
//     // 在真实的应用中，应该只在房间内广播
//     socket.to(socket.room).emit('message', message);
//   });
//
//   // 处理客户端创建或加入房间的请求。根据房间内客户端的数量，决定是创建房间、加入房间还是提示房间已满。
//   socket.on('create or join', (room) => {
//     socket.room = room;  // 保存房间名称到socket对象
//     const clientsInRoom = io.sockets.adapter.rooms.get(room);
//     const numClients = clientsInRoom ? clientsInRoom.size : 0;
//
//     log('Room ' + room + ' has ' + numClients + ' client(s)');
//     log('Request to create or join room ' + room);
//
//     if (numClients === 0) {
//       socket.join(room);
//       socket.emit('created', room);
//     } else if (numClients === 1) {
//       io.sockets.in(room).emit('join', room);
//       socket.join(room);
//       socket.emit('joined', room);
//     } else { // 最多两个客户端
//       socket.emit('full', room);
//       log('Room ' + room + ' is full');
//     }
//   });
//
//   // 当客户端准备就绪时，向房间内的其他客户端广播这一信息
//   socket.on('ready', () => {
//     socket.broadcast.to(socket.room).emit('ready');
//   });
//
// });
//
// // 启动服务器
// const PORT = process.env.PORT || 2013;
// // 打印启动信息
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
//
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// 初始化应用和服务器
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 将当前目录设置静态文件目录，可以直接访问其中的文件
app.use(express.static(__dirname));

// 示例路由：当访问根路由（/）时，返回index.html文件。
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.IO连接事件 -- 当客户端连接到服务器时，会触发一系列事件
io.on('connection', (socket) => {

  // 方便日志记录的函数
  function log() {
    const array = ['>>> Message from server: '];
    for (let i = 0; i < arguments.length; i++) {
      array.push(arguments[i]);
    }
    socket.emit('log', array);
  }

  // 当收到客户端发的消息，向房间内其他客户端广播该消息
  socket.on('message', (message) => {
    log('Got message:', message);
    // 在真实的应用中，应该只在房间内广播
    socket.to(socket.room).emit('message', message);
  });

  // 处理客户端创建或加入房间的请求。根据房间内客户端的数量，决定是创建房间、加入房间还是提示房间已满。
  socket.on('create or join', (room) => {
    if (socket.rooms.has(socket.room)){

    }else{
      socket.room = room;  // 保存房间名称到socket对象
      const clientsInRoom = io.sockets.adapter.rooms.get(room);
      const numClients = clientsInRoom ? clientsInRoom.size : 0;

      log('Room ' + room + ' has ' + numClients + ' client(s)');
      log('Request to create or join room ' + room);

      if (numClients === 0) {
        socket.join(room);
        socket.emit('created', room);
      } else if (numClients === 1) {
        io.sockets.in(room).emit('join', room);
        socket.join(room);
        socket.emit('joined', room);
      } else { // 最多两个客户端
        socket.emit('full', room);
        log('Room ' + room + ' is full');
      }
    }
  });

  // 当客户端准备就绪时，向房间内的其他客户端广播这一信息
  socket.on('ready', () => {
    socket.broadcast.to(socket.room).emit('ready');
  });


});

// 启动服务器
const PORT = process.env.PORT || 2013;
// 打印启动信息
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
