import { useState } from "react";
import Nav from "./containers/Nav";
import "./App.css";
import MainContent from "./containers/MainContent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <Nav />
      <MainContent />
    </div>
  );
}

export default App;
