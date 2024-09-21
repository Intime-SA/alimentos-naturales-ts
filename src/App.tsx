import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <Login />
    </div>
  );
}

export default App;
