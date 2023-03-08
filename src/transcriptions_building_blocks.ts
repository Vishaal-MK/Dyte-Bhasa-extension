
let ws: WebSocket;



function getWebSocket() {
    return ws;
}
function setWebSocket(newWS: WebSocket) {
    ws = newWS;
}


export {
    getWebSocket,
    setWebSocket,
    
};
