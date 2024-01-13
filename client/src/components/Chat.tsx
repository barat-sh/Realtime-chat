import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Card from "@mui/material/Card";

interface chatProps {
  socket: Socket;
  userName: string;
  roomId: string;
}

export const Chat: React.FC<chatProps> = ({ socket, userName, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async (currentMessage: string) => {
    if (currentMessage !== "") {
      const messageData = {
        roomId: roomId,
        name: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };
      await socket.emit("send_message", messageData);
    }
    return;
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div>
      Chat page
      <div className="chat-header">Live War-Room</div>
      <div className="chat-body"></div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button
          onClick={() => {
            sendMessage(currentMessage);
          }}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
};
