import BlueScreen from "./components/BlueScreen";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BlueScreen show={false} />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
