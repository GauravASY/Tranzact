

interface propsType{
    date : string;
    from : string;
    to : string;
    amount : string;
}

function TransactionList( props : propsType) {

  return (
    <div className=" dark:bg-gray-800 rounded-xl  px-4 mb-1 w-full divide-gray-200 dark:divide-gray-700">
      
        <div className="flex items-center space-x-4 justify-around rtl:space-x-reverse">
            <div className="text-lg font-sans w-32 flex items-center font-bold text-white px-2 py-1 ">{props.date}</div>
            <div className="text-lg font-sans w-32 flex items-center font-bold text-white px-2 py-1 ">{props.from}</div>
            <div className="text-lg font-sans w-32 flex items-center font-bold text-white px-2 py-1 ">{props.to}</div>
            <div className="text-lg font-sans w-32 flex items-center font-bold text-white px-2 py-1 ">{props.amount}</div>
        </div>

    </div>
  )
}

export default TransactionList