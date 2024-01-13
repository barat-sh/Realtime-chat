import "./App.css";
import { Chat } from "./components/Chat.tsx";
import { Landing } from "./components/Landing.tsx";

function App() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <Landing />
    </div>
  );
}

export default App;
