import { useState } from "react";

interface userType {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface propsType {
  setVisible: () => void;
  Token: string;
  sendFrom : userType | null;
  SendTo: userType | null;
}

function TransferBox(props: propsType) {
  const [amount, setAmount] = useState("");

  async function handleClick() {
    props.setVisible();
    
    if(parseInt(amount) <= 0){
      //toasitfy improper amount.
      return;
    }

    try {
      const result = await fetch(
        "http://localhost:3000/api/v1/user/sendMoney",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: props.Token,
          },
          body: JSON.stringify({
            sendTo: props.SendTo?.id,
            amount: parseInt(amount),
          }),
        }
      );
      const data = await result.json();
      if (data.success) {
          const response = await fetch("http://localhost:3000/api/v1/transaction/create",{
            method : "POST",
            headers : {
              'Content-Type' : 'application/json',
              'transactToken' : data.transactToken
            },
            body : JSON.stringify({
              sender : props.sendFrom?.username,
              receiver : props.SendTo?.username
            })
          })

          const response2 = await response.json();
          console.log(response2);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="absolute w-1/4 h-1/3 flex flex-col dark:bg-emerald-600 shadow-gray-500 shadow-md gap-5 py-4 px-8 items-center left-[37%] top-[36%]  rounded-xl">
      <div className="flex gap-2 items-center mt-4">
        <span className="h-10 w-10 rounded-full flex justify-center dark:bg-gray-900 text-gray-50 items-center text-4xl  font-serif font-semibold ">
          {props.SendTo?.username.charAt(0).toUpperCase()}
        </span>
        <h1 className="flex justify-center items-center text-gray-50 text-2xl  font-mono font-semibold">
          {props.SendTo?.username}
        </h1>
      </div>
      <div className="w-full">
        <input
          className="py-1.5 mb-2 px-6 w-full flex items-center text-center rounded-2xl text-lg font-medium shadow-md shadow-gray-500  text-gray-50 border border-gray-300  bg-gray-900 dark:border-gray-600 dark:placeholder-gray-300 dark:text-gray-50"
          type="text"
          placeholder="Enter the Amount"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button
        onClick={handleClick}
        className="bg-gray-50 w-full py-1.5 text-center text-lg rounded-2xl text-gray-900 font-mono font-bold hover:text-emerald-500 shadow-gray-500 shadow-md"
      >
        Send
      </button>
      <div className="absolute right-[10%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6 text-white hover:scale-125 transition-all ease-in-out hover:cursor-pointer"
          onClick={props.setVisible}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </div>
  );
}

export default TransferBox;
