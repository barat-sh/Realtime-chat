import { useState } from "react";
import io from "socket.io-client";
import { Chat } from "./Chat";
const socket = io.connect("http://localhost:3001");

export const Landing = () => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinRoom = (userName: string, value: string) => {
    if (userName !== "" && value !== "") {
      socket.emit("join_room", value, userName);
    }
  };
  return (
    <div>
      <div>
        Landing page
        <h3>Join a chat</h3>
        <span>User Name: </span>
        <input
          type="text"
          placeholder="ex: john..."
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <br></br>
        <span>Room id: </span>
        <input
          type="text"
          placeholder="ex: 5$dee^}bar!ca"
          onChange={(event) => {
            setRoomId(event.target.value);
          }}
        />
        <br></br>
        <button
          onClick={() => {
            joinRoom(userName, roomId);
          }}
        >
          Join Room
        </button>
      </div>
      <div>
        <Chat socket={socket} roomId={roomId} userName={userName} />
      </div>
    </div>
  );
};
