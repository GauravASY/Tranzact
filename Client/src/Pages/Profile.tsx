import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import { useNavigate } from "react-router-dom";
import SearchBar from "../Components/SearchBar";
import DisplayList from "../Components/DisplayList";
import TransferBox from "../Components/TransferBox";


function Profile() {
    const [userList, setUserList] = useState([]);
    const [log, setLog] = useState("");
    const [visible, setVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState<userType | null>(null);
    const [sendTo, setSendTo] = useState<userType | null>(null);

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

async function fetchcCurrent(){
    const value = localStorage.getItem("token");
    if (value != null) {
      const token = JSON.parse(value);
      const result = await fetch("http://localhost:3000/api/v1/user/getuser", {
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
    const result = await fetch("http://localhost:3000/api/v1/user/list", {
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
    <div className="max-h-screen">
    <div className={`dark:bg-gray-900 flex flex-col max-h-screen pt-8 relative ${visible ? "blur" : ""}`}>
        <Navbar/>
        <SearchBar/>
        <div className="px-20 py-3 mx-8 flex-1 flex flex-col max-h-min items-center overflow-auto mb-4 h-full rounded-xl">
            
            {userList ? 
            userList.filter((user : userType)=> user.id != currentUser?.id).map((user : userType)=>(
                <DisplayList key= {user.id} username={user.username} email={user.email} password={user.password} id={user.id} setVisible={()=> setVisible(true)} setSendTo={setSendTo}/>
            ))
            : <>Loading....</>}
                
        </div>
        
    </div>
        {
            visible ? <TransferBox setVisible={()=> setVisible(false)}  sendFrom={currentUser} Token={log} SendTo={sendTo} />  : <></>
        }
    </div>
  )
}

export default Profile