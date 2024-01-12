import "./App.css";
import { Landing } from "./components/Landing.tsx";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");
function App() {
  return (
    <>
      <Landing />
    </>
  );
}

export default App;
