import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import { useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import DisplayList from "../Components/DisplayList";
import TransferBox from "../Components/TransferBox";
import { ToastContainer, toast } from 'react-toastify'
import { toastOptions } from '../Utilities/ToastOptions'
import 'react-toastify/dist/ReactToastify.css';


function Profile() {
    const [userList, setUserList] = useState([]);
    const [log, setLog] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<userType | null>(null);
    const [sendTo, setSendTo] = useState<userType | null>(null);
    const [transactionFlag, setTransactionFlag] = useState("pending");

    const navigate = useNavigate();

useEffect(()=>{
    let token = localStorage.getItem("token");
    
    if(token == null){
        navigate("/signin");
    }
    else{
        token = JSON.parse(token);
        setLog(token as string);
    }
},[])

useEffect(()=>{
    if(log){
        fetchList();
        fetchcCurrent();
    }
},[log])

useEffect(()=>{
    if(transactionFlag == "true"){
        toast.success("Transaction successful", toastOptions);
        setTransactionFlag("pending");
        return;
    }
    if(transactionFlag == "false"){
        toast.error("Transaction Failed", toastOptions);
        setTransactionFlag("pending");
        return;
    }

},[transactionFlag])

async function fetchcCurrent(){
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
        setCurrentUser(data.user);
      }
    }
}

async function fetchList(){
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/list`, {
        headers : {
            'Content-Type' : 'application/json',
            'token' : log
        }
    })

    const data = await result.json();
    setUserList(data.usersList);
}

interface userType{
    id : number;
    username : string;
    email : string;
    password : string;
}

  return (
    <div className="h-screen bg-gray-900">
    <div className={`flex flex-col h-full pt-8 relative ${visible ? "blur" : ""}`}>
        <Navbar/>
        <SearchBar/>
       
        <div className="px-20 py-3 bg-gray-900 flex-grow flex flex-col items-center overflow-auto mb-4">   
        {
            log ? (
            userList ? 
            userList.filter((user : userType)=> user.id != currentUser?.id).map((user : userType)=>(
                <DisplayList key= {user.id} username={user.username} email={user.email} password={user.password} id={user.id} setVisible={()=> setVisible(true)} setSendTo={setSendTo}/>
            ))
            : <div className="bg-gray-900 h-full w-full flex justify-center items-center">
                Loading...
            </div>
            ) : 
            (
                <div className="h-full w-full bg-gray-900 text-white flex items-center justify-center">Loading....</div>
            )
        }     
        </div>
    </div>
        {
            visible ? <TransferBox setVisible={()=> setVisible(false)}  sendFrom={currentUser} Token={log} SendTo={sendTo} flag={transactionFlag} setFlag={setTransactionFlag} />  : <></>
        }
        <ToastContainer/>
    </div>
  )
}

export default Profile