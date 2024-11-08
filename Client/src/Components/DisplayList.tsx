
import { List } from "flowbite-react";

interface userType {
  id: number;
  username: string;
  email: string;
  password: string;
}


interface propsType{
    username : string;
    email : string;
    id : number;
    password : string;
    setVisible : ()=>void;
    setSendTo : (user : userType|null) => void;
}

function DisplayList(props : propsType) {
  const currentUser = {
    id : props.id,
    username : props.username,
    email : props.email,
    password : props.password,
  }
  
  function handleClick(){
    props.setVisible();
    props.setSendTo(currentUser);
  }

  return (
    <List unstyled className=" divide-y bg-gray-700 rounded-xl px-4 py-3 mb-2 w-2/3 ">
      <List.Item className="py-2 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="h-10 w-10 flex justify-center items-center text-white font-semibold text-lg bg-gray-900 rounded-full">
            {props.username[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-50 dark:text-white">{props.username}</p>
            <p className="truncate text-sm text-gray-50 dark:text-white">{props.email}</p>
          </div>
          <button
          className="text-white end-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-400 font-medium rounded-full text-sm px-4 py-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          onClick={handleClick}>
          Send Money
        </button>
        </div>
      </List.Item>
    </List>
  )
}

export default DisplayList