import io from 'socket.io-client';

let socket;
const baseurl = 'http://102.37.211.135:4173';

// Function to set up the socket connection based on the current user
const setupSocketConnection = async () => {
  if (socket) {
    socket.disconnect(); // Disconnect previous socket if it exists
  }
  socket = io(baseurl);
  socket?.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });
  socket?.on('disconnect', () => {
    console.log('Socket disconnected');
  });
  socket?.on('error', error => {
    console.error('Socket error:', error);
  });
};
// Call setupSocketConnection initially
setupSocketConnection();
// Export the socket object for use in other modules
export {socket, setupSocketConnection};
