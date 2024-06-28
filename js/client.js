// var isInitiator;
// var localStream;
// var pc;
// var remoteStream;
//
// //通过prompt弹出输入框获取房间名，并使用socket.io与服务端建立WebSocket连接
// const room = prompt('Enter room name:');
// const socket = io.connect();
//
// const configuration = {
//  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
// };
//
// const constraints = {
//  video: true,
//  audio: true
// };
//
// // 获取本地视频流
// async function getMediaStream() {
//  try {
//   const stream = await navigator.mediaDevices.getUserMedia(constraints);
//   localStream = stream;
//   document.getElementById('localVideo').srcObject = stream;
// // 如果房间不空，则发送 "create or join" 消息
//   if (room !== '') {
//    console.log('Joining room ' + room);
//    socket.emit('create or join', room);
//   }
//   updateRemoteStream(stream)
//  } catch (error) {
//   console.error('Error accessing media devices.', error);
//  }
// }
//
// // 获取桌面共享流
// async function getDisplayStream() {
//  try {
//   const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//   localStream = stream;
//   document.getElementById('localVideo').srcObject = stream;
// // 如果房间不空，则发送 "create or join" 消息
//   if (room !== '') {
//    console.log('Joining room ' + room);
//    socket.emit('create or join', room);
//   }
//   updateRemoteStream(stream)
//  } catch (error) {
//   console.error('Error accessing display media.', error);
//  }
// }
//
// // 更新远程客户端的流
// function updateRemoteStream(stream) {
//  if (pc) {
//   stream.getTracks().forEach(track => {
//    pc.addTrack(track, stream);
//   });
//  }
// }
//
// // 在这里选择是获取摄像头流还是桌面共享流
// document.getElementById('videoButton').addEventListener('click', getMediaStream);
// document.getElementById('screenButton').addEventListener('click', getDisplayStream);
//
// socket.on('created', (room) => {
//  console.log('Created room ' + room);
//  isInitiator = true;
// });
//
// socket.on('joined', (room) => {
//  console.log('Joined room ' + room);
//  createPeerConnection(isInitiator);
//  socket.emit('ready');
// });
//
// socket.on('full', (room) => {
//  console.log('Room ' + room + ' is full');
// });
//
// socket.on('log', (array) => {
//  console.log.apply(console, array);
// });
//
// socket.on('ready', () => {
//  if (isInitiator) {
//   createPeerConnection(isInitiator);
//   pc.createOffer()
//       .then(offer => pc.setLocalDescription(offer))
//       .then(() => {
//        socket.emit('message', pc.localDescription);
//       });
//  }
// });
//
// socket.on('message', (message) => {
//  if (message.type === 'offer') {
//   pc.setRemoteDescription(new RTCSessionDescription(message))
//       .then(() => pc.createAnswer())
//       .then(answer => pc.setLocalDescription(answer))
//       .then(() => {
//        socket.emit('message', pc.localDescription);
//       });
//  } else if (message.type === 'answer') {
//   pc.setRemoteDescription(new RTCSessionDescription(message));
//  } else if (message.type === 'candidate') {
//   const candidate = new RTCIceCandidate({
//    sdpMLineIndex: message.label,
//    candidate: message.candidate
//   });
//   pc.addIceCandidate(candidate);
//  }
// });
//
// //创建点对点的连接
// function createPeerConnection(isInitiator) {
//  pc = new RTCPeerConnection(configuration);
//  pc.onicecandidate = event => {
//   if (event.candidate) {
//    socket.emit('message', {
//     type: 'candidate',
//     label: event.candidate.sdpMLineIndex,
//     id: event.candidate.sdpMid,
//     candidate: event.candidate.candidate
//    });
//   }
//  };
//  pc.ontrack = event => {
//   if (!remoteStream) {
//    remoteStream = event.streams[0];
//    document.getElementById('remoteVideo').srcObject = remoteStream;
//   }
//  };
//  localStream.getTracks().forEach(track => {
//   pc.addTrack(track, localStream);
//  });
// }

var isInitiator;
var localStream;
var pc;
var remoteStream;

// 通过prompt弹出输入框获取房间名，并使用socket.io与服务端建立WebSocket连接
const room = prompt('Enter room name:');
const socket = io.connect();

const configuration = {
 iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

const constraints = {
 video: true,
 audio: true
};

// 获取本地视频流
async function getMediaStream() {
 try {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  localStream = stream;
  document.getElementById('localVideo').srcObject = stream;

  if (room !== '') {
   console.log('Joining room ' + room);
   socket.emit('create or join', room);
  }

  updateRemoteStream(stream);
 } catch (error) {
  console.error('Error accessing media devices.', error);
 }
}

// 获取桌面共享流
async function getDisplayStream() {
 try {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  localStream = stream;
  document.getElementById('localVideo').srcObject = stream;

  if (room !== '') {
   console.log('Joining room ' + room);
   socket.emit('create or join', room);
  }

  updateRemoteStream(stream);
 } catch (error) {
  console.error('Error accessing display media.', error);
 }
}

// 更新远程客户端的流
function updateRemoteStream(stream) {
 if (pc) {
  stream.getTracks().forEach(track => {
   pc.addTrack(track, stream);
  });
 }
}

// 在这里选择是获取摄像头流还是桌面共享流
document.getElementById('videoButton').addEventListener('click', getMediaStream);
document.getElementById('screenButton').addEventListener('click', getDisplayStream);

socket.on('created', (room) => {
 console.log('Created room ' + room);
 isInitiator = true;
});

socket.on('joined', (room) => {
 console.log('Joined room ' + room);
 createPeerConnection(isInitiator);
 socket.emit('ready');
});

socket.on('full', (room) => {
 console.log('Room ' + room + ' is full');
});

socket.on('log', (array) => {
 console.log.apply(console, array);
});

socket.on('ready', () => {
 if (isInitiator) {
  createPeerConnection(isInitiator);
  pc.createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .then(() => {
       socket.emit('message', pc.localDescription);
      });
 }
});

socket.on('message', (message) => {
 if (message.type === 'offer') {
  pc.setRemoteDescription(new RTCSessionDescription(message))
      .then(() => pc.createAnswer())
      .then(answer => pc.setLocalDescription(answer))
      .then(() => {
       socket.emit('message', pc.localDescription);
      });
 } else if (message.type === 'answer') {
  pc.setRemoteDescription(new RTCSessionDescription(message));
 } else if (message.type === 'candidate') {
  const candidate = new RTCIceCandidate({
   sdpMLineIndex: message.label,
   candidate: message.candidate
  });
  pc.addIceCandidate(candidate);
 }
});

// 创建点对点的连接
function createPeerConnection(isInitiator) {
 pc = new RTCPeerConnection(configuration);
 pc.onicecandidate = event => {
  if (event.candidate) {
   socket.emit('message', {
    type: 'candidate',
    label: event.candidate.sdpMLineIndex,
    id: event.candidate.sdpMid,
    candidate: event.candidate.candidate
   });
  }
 };
 pc.ontrack = event => {
  if (!remoteStream) {
   remoteStream = event.streams[0];
   document.getElementById('remoteVideo').srcObject = remoteStream;
  }
 };

 if (localStream) {
  localStream.getTracks().forEach(track => {
   pc.addTrack(track, localStream);
  });
 }
}
