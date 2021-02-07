// packages
import io from 'socket.io-client';

// env
import { SOCKET_ENDPOINT } from '@env';

export default io(SOCKET_ENDPOINT, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: Infinity
});
