import "./App.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  const navigate = useNavigate();

  return (
    <div className="bg-emerald-800 min-h-screen pt-8">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-20 ">
        <div className="w-2/3 items-center flex flex-col gap-8">
          <h1 className="text-white font-sans font-extrabold text-7xl text-pretty text-center">
            MONEY TRANSFER FOR HERE, THERE AND EVERYWHERE
          </h1>
          <h1 className="text-white font-mono font-bold text-3xl text-pretty text-center">
            Register now and get an account with{" "}
            <span className="text-yellow-400">$100</span> joining bonus!{" "}
          </h1>
          <h1 className="text-white font-mono italic font-medium text-xl"></h1>
          <button onClick={()=> navigate("/profile")}
          className="bg-white px-7 py-1.5 w-fit text-center rounded-full font-bold text-black font-mono hover:scale-110 transition-all ease-out duration-500 shadow-gray-700 shadow-lg">
            Send Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
