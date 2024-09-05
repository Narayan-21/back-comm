import { WebSocket, WebSocketServer } from "ws";
import http from 'http';


const server = http.createServer(function(req,res){
    console.log((new Date()) + ' Received Request for ', req.url);
    res.end('hi there')
})

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws){
    ws.on("error", console.error);

    ws.on('message', function msg(data, isBinary){
        wss.clients.forEach(function each(client){
            if (client.readyState === WebSocket.OPEN){
                client.send(data, {binary: isBinary})
            }
        });
    });
    ws.send('Hello msg from the server')
});

server.listen(8080, function(){
    console.log((new Date()) + ' Server is listening on port 8080');
})