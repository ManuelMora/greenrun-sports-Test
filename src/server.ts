import http from 'http';
import debugLib from 'debug';
import app from './app';
import config from './config';

const port = config.port;
app.set('port', port);
const debug = debugLib('greenrun-sports:server');
const server = http.createServer(app);

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${(addr as any).port}`;
    debug(`Listening on ${bind}`);
}

server.listen(port);
server.on('listening', onListening);

export default server;
