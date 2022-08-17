import "./App.css";
import Input from "./components/Input";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <div className="m-0 p-0 h-screen w-screen bg-hexa-image flex items-center justify-center bg-no-repeat bg-cover">
        <div className="h-auto w-[90%] md:w-[35%] flex justify-center border-2 border-[#FFFFFF] rounded-[24px] backdrop-blur-md bg-white/30">
          <Input />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
