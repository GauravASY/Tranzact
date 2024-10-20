
import Heading from '../Components/Heading'
import Input from '../Components/Input'
import Button from '../Components/Button'
import bkg from '../assets/99824.jpg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(){
    let result = await fetch(`http://localhost:3000/api/v1/user/signup`,{
      method: "POST",
      headers : {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify({
        username , email, password
      })
    })
    const data = await result.json();
    if(data.success){
      setUsername("");
      setPassword("");
      setEmail("");
      //insert toastify here that showcases the message in response.
      navigate("/signin");
    }
    else
    {
      console.log(data.message);
    }
}

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-900'>
    <div className='flex h-4/5 w-4/5 rounded-xl'>
        <div className='w-2/5 min-h-full bg-emerald-900 flex flex-col justify-end relative rounded-l-xl'>
            <img className="h-full w-full object-cover rounded-l-xl" src={bkg} alt="image" /> 
            <h1 className='text-8xl font-extrabold text-white font-serif mb-20 p-4 absolute'>Tansfer in a Blink.. </h1>  
            <span className='text-xl font-bold text-white font-serif mb-10 p-4 absolute '>Secure.Fast. Reliable.</span>                      
        </div>
        <div className='w-3/5 h-full flex flex-col pt-16 px-36 pb-12 bg-gray-100 rounded-r-xl'>
            <Heading page="none"/>
            <Input  title="username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
            <Input  title="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <Input  title="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleSubmit}/>
        </div>
    </div>
    </div>
  )
}

export default SignUp