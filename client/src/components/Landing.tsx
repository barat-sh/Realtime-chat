import { useState } from "react";
import io from "socket.io-client";
import { Chat } from "./Chat";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
const socket = io.connect("http://localhost:3001");

export const Landing = () => {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = (userName: string, value: string) => {
    if (userName !== "" && value !== "") {
      socket.emit("join_room", value, userName);
      setShowChat(true);
    }
  };
  return (
    <div>
      {!showChat ? (
        <Card
          sx={{
            minWidth: 300,
            display: "flex",
            justifyContent: "center",
            background: "#bdbdbd",
          }}
        >
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
                marginTop: "10px",
              }}
            >
              <Typography>Join a Chat-War Room</Typography>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <span>Name: </span>
              <br></br>
              <TextField
                size="small"
                id="standard-basic"
                helperText="Please enter Your Name"
                type="text"
                variant="standard"
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <span>Room-ID: </span>
              <br></br>
              <TextField
                size="small"
                id="standard-basic"
                helperText="Please enter Room ID"
                type="text"
                variant="standard"
                onChange={(event) => {
                  setRoomId(event.target.value);
                }}
              />
            </div>
            <CardActions style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => {
                  joinRoom(userName, roomId);
                }}
              >
                Join Room
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ) : (
        <Chat socket={socket} userName={userName} roomId={roomId} />
      )}
    </div>
  );
};
