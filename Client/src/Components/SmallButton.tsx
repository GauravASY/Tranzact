
import {useNavigate} from 'react-router-dom'

interface userType{
    id:number;
    email : string;
    password : string;
    username :string;
}

interface propsType{
    title : string;
    user? : userType | null;
}

function SmallButton(props : propsType) {
    const navigate = useNavigate();
    function handleClick(){
        if(props.title == "user"){
            return;
        }
        if(props.title == "Profile" && props.user?.username != ""){
            navigate("/profile");
        }
        else if(props.title == "Transactions" && props.user?.username !=""){
            navigate("/transactions", {state : {user : props.user}});
        }
        else if(props.title == "Log In"){
            navigate("/signin");
        }
        else if(props.title == "Register"){
            navigate("/signup");
        }
        else{
            navigate("/signin");
        }
    }
  return (
    <button onClick={handleClick}
    className='bg-gray-100 px-4 py-1 text-center rounded-full text-black hover:text-emerald-500 font-mono font-medium hover:bg-white shadow-gray-500 shadow-md'>
        {props.title == "user" ? props.user?.username : props.title}
    </button>
  )
}

export default SmallButton