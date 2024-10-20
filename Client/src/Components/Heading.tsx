
import icon from "../assets/transfer.png"
import { Link } from 'react-router-dom'

interface propsType{
    page : string;
}
function Heading(props : propsType) {
  return (
    <div className='flex flex-col items-center pb-8'>
        <div className='flex mb-6'>
            <img className='h-14 w-14 mr-2 '
             src={icon} alt="Icon" />
            <h1 className='text-4xl font-extrabold mt-2 mb-4 font-serif shadow-2xl italic'>Tranzact</h1>
        </div>
        
        <h1 className='text-5xl font-bold mb-5'>Welcome back!</h1>
        <span className='text-gray-500 text-lg font-medium'>{props.page == '/signin' ? "New to Tranzact!" : "Already a User?"} <Link className='text-black font-medium ml-2 underline hover:text-emerald-600' to={props.page == "/signin" ? "/signup" : "/signin"}>{props.page == "/signin" ? "Sign-Up" : "Sign-In"}</Link></span>
    </div>
  )
}

export default Heading