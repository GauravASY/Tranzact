import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import TransactionList from "../Components/TransactionList";
import { useEffect, useState } from "react";

function Transaction() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const[amount, setAmount] = useState(0);
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (current != null) {
      fetchTransactions();
    }
  }, [amount]);

  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
      navigate("/signin");
    }
    const token = JSON.parse(tokenString as string);
    setCurrent(token);
  });

  useEffect(()=>{
    if(current!=null){
      fetchAccount();
    }
  },[current])

  interface transactionType {
    id: number;
    date: string;
    sender: number;
    receiver: number;
    senderName: string;
    receiverName: string;
    amount: number;
  }

  async function fetchAccount(){
    const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/account/getBalance`, {
      headers:{
        'Content-Type' : 'application/json',
        'token' : current
      }
    });
    const data = await result.json();
    setAmount(data.account.amount);
  }

  async function fetchTransactions() {
    const data = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/transaction/getTransactions`,
      {
        headers: {
          "Content-Type": "application/json",
          token: current,
        },
      }
    );
    const result = await data.json();
    setTransactions(result.transactions);
  }

  return (
    <div className="bg-gray-900 flex flex-col min-h-screen pt-8">
      <Navbar />
      <div className="flex-1 flex mx-8 rounded-2xl mt-5 mb-2 gap-3">
        <div className="w-2/3 min-h-full flex flex-col px-2 py-2 rounded-2xl overflow-auto">
          <TransactionList
            date="Date"
            from="Sender"
            to="Receiver"
            amount="Amount"
          />
          {transactions ? (
            transactions.map((transaction: transactionType) => (
              <TransactionList
                key={transaction.id}
                date={transaction.date}
                from={transaction.senderName.split(" ")[0]}
                to={transaction.receiverName.split(" ")[0]}
                amount={transaction.amount.toString()}
              />
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="w-1/3 h-fit pb-8 flex flex-col mt-2 rounded-2xl bg-gray-700 gap-4 px-4 py-4">
          <div className="flex justify-center">
            <span className="text-white text-2xl  px-4 py-1 font-bold font-mono flex items-center rounded-xl justify-center  ">
              User Details
            </span>
          </div>
          <div className="flex flex-col gap-2 bg-gray-800 rounded-2xl px-4 py-4">
            <div className="flex gap-4">
              <span className="text-white text-lg flex items-center font-sans font-lg font-bold">Email : </span>
              <div className="flex items-center text-white font-semibold font-sans text-lg">{location.state.user.email}</div>
            </div>
            <div className="flex gap-4">
              <span className="text-white text-lg flex items-center font-sans font-lg font-bold">Username : </span>
              <div className="flex items-center text-white font-semibold font-sans text-lg">
                {location.state.user.username}
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-white text-lg flex items-center font-sans font-lg font-bold">Acc. Balance : </span>
              <div className="flex items-center text-white font-semibold font-sans text-lg">{amount}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
