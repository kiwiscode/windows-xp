import BlueScreen from "./components/BlueScreen";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";

import "xp.css/dist/XP.css";

function App() {
  return (
    <div className="relative overflow-hidden h-full">
      <BlueScreen show={false} />
      <Main />
      <Navbar />
    </div>
  );
}

export default App;
