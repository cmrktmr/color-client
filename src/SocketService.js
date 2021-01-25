import io from "socket.io-client";

let socket;

export const initSocket = () => {
  socket = io("http://color-picker-kodluyoruz.herokuapp.com:3000", {
    transports: ["websocket"],
  });

  console.log("Connecting...");
  socket.on("connect", () => console.log("Connected!"));
};

export const disconnectSocket = () => {
  console.log("Disconnecting...");
  if (socket) socket.disconnect();
};

export const setBgColor = (data) => {
  console.log("data", data);
  if (socket) socket.emit("new-bg", data);
};

export const subscribeToBgColor = (cb) => {
  if (!socket) return true;

  socket.on("receive-bg", (data) => {
    console.log("bg changed: ", data);
    cb(data);
  });
};

// The data the user will see on the page when connected
export const initialData = (setLastColor, setColor, setLastName) => {
  if (!socket) return true;

  socket.on("initial-data", (data) => {
    console.log("init data: ", data);
    setLastColor(data.color);
    setColor(data.color);
    setLastName(data.name);
  });
};
