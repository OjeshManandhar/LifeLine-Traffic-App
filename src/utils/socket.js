// packages
import io from 'socket.io-client';

// env
import { SOCKET_ENDPOINT } from '@env';

export default io(SOCKET_ENDPOINT, {
  transports: ['websocket'] /* Needed for RN */,
  reconnection: false /* Remove this while using while with server */,
  // reconnection: true, /* Un-comment this while using with server */
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity
});
