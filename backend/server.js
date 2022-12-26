import http from "http";
import handler from "serve-handler";
import nanobuffer from "nanobuffer";

// these are helpers to help you deal with the binary data that websockets use
// import objToResponse from "./obj-to-response.js";
// import generateAcceptValue from "./generate-accept-value.js";
// import parseMessage from "./parse-message.js";

let connections = [];
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

msg.push({
  user: "brian",
  text: "hi",
  time: Date.now(),
});

// serve static assets
const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: "./frontend",
  });
});

// establish  websocket connection by hand
// server.addListener("upgrade",(req,socket)=>{
//   if(req.headers["upgrade"] !== "websocket"){
//     socket.end("400 Bad request ")
    
//     return;
//   }
//   connections.push(socket)

//   const acceptKey = req.headers["sec-websocket-key"];
//   const acceptValue = generateAcceptValue(acceptKey);
//   const headers = [
//     "HTTP/1.1 101 Web Socket Protocol Handshake",
//     "Upgrade: WebSocket",
//     "Connection: Upgrade",
//     `Sec-WebSocket-Accept: ${acceptValue}`,
//     "Sec-WebSocket-Protocol: json",
//     "\r\n",
//   ];
  
//   socket.write(headers.join("\r\n"));
//   socket.write(objToResponse({msg:getMsgs()}))

//   socket.on("data", (buffer) => {
//     const message = parseMessage(buffer)
//     if(message){
//       msg.push({
//         user:message.user,
//         text:message.text,
//         time:Date.now()
//       })
//       connections.forEach(socket=>{
//         socket.write(objToResponse({msg:getMsgs()}))

//       })
//     }
//   });
//   socket.addListener("end",(s)=>{
//     connections.filter(socket=>socket.id === s.id)
//   })
// })

/*
 *
 * your code goes here
 *
 */

const port = process.env.PORT || 9090;
server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
