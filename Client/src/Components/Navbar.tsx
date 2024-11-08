import { useEffect, useState } from "react";
import SmallButton from "./SmallButton";
import image from "../assets/currency.svg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    const value = localStorage.getItem("token");
    if (value != null) {
      const token = JSON.parse(value);
      const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getuser`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          'token': token,
        },
      });
      const data = await result.json();
      if (data.success) {
        setUser(data.user);
      }
    }
  }

  function Logout(){
    localStorage.removeItem("token");
    setUser(null);
    navigate("/signin");
  }

  return (
    <div className="flex justify-between px-20 py-3 mx-8 items-center bg-emerald-800 rounded-full">
      <div className="flex justify-between gap-14">
        <div className=" flex text-center items-center">
          <img src={image} className="h-9 w-9 mr-3 animate-spin" alt="icon" />
          <span className="font-mono text-white font-semibold text-xl ">Transzact</span>
        </div>
        <div className="flex gap-10">
          <SmallButton title="Profile" user={user}/>
          <SmallButton title="Transactions" user={user}/>
        </div>
      </div>
      <div className="flex justify-end gap-6">
        {user != null ? (
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-8 text-white hover:text-red-400"
              onClick={Logout}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
              
            </svg>

             <SmallButton title="user" user={user} />  
          </div>
        ) : (
          <>
            <SmallButton title="Log In" user={user}/>
            <SmallButton title="Register" user={user}/>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
