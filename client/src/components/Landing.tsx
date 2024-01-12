import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

export const Landing = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinRoom = (name: string, value: string) => {
    if (name !== "" && value !== "") {
      socket.emit("join_room", value, name);
    }
  };
  return (
    <div>
      Landing page
      <h3>Join a chat</h3>
      <span>Name: </span>
      <input
        type="text"
        placeholder="ex: john..."
        onChange={(event) => {
          setName(event.target.value);
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
          joinRoom(name, roomId);
        }}
      >
        Join Room
      </button>
    </div>
  );
};
