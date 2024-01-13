import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Card from "@mui/material/Card";
import {
  Button,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

interface chatProps {
  socket: Socket;
  userName: string;
  roomId: string;
}

interface MyType {
  roomId: string;
  userName: string;
  time: string;
  message: string;
}

export const Chat: React.FC<chatProps> = ({ socket, userName, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [roomName, setRoomName] = useState("hello");
  const [messageList, setMessageList] = useState<MyType[]>([]);

  const sendMessage = async (currentMessage: string) => {
    if (currentMessage !== "") {
      const messageData = {
        roomId: roomId,
        userName: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
      };
      setRoomName(roomId);
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
    return;
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div>
      <Card sx={{ minWidth: 400 }}>
        <CardContent>
          <Typography>{`Room Name ${roomName}`}</Typography>
          <Card
            sx={{ minWidth: 300, minHeight: 400, border: "solid black 1px" }}
          >
            {messageList.map((item) => {
              return (
                <div>
                  <h4>{item.message}</h4>
                  {item.time}
                  {item.userName}
                </div>
              );
            })}
          </Card>
        </CardContent>
        <CardActions>
          <TextField
            size="small"
            type="text"
            placeholder="Hey..."
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
          />
          <Button
            size="small"
            onClick={() => {
              sendMessage(currentMessage);
            }}
          >
            send
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
