

interface propsType{
  onClick : ()=> void;
}

function Button(props : propsType) {
  return (
    <div>
      <button className="bg-emerald-600 w-full p-3 mt-2 rounded-full text-2xl text-gray-100 shadow-md shadow-gray-500 font-mono font-bold text-md hover:bg-emerald-700 transition-all ease-in-out duration-700"
      onClick={props.onClick}
      >
        Submit
      </button>
    </div>
  );
}

export default Button;
