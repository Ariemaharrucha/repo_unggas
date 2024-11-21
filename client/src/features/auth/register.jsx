import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


export const Register = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    function handleName (e) {
        setName(e.target.value)
    }

    function handlePassword (e) {
        setPassword(e.target.value)
    }

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    async function handleRegister (e) {
        e.preventDefault();
        try {     
            const response = await axios.post('http://localhost:3000/api/v1/login',{name, email, password});
            if (response.ok) {
                setMessage("Registration success - please login")
            }
        } catch (error) {
            console.log(error);    
        }
    }


  return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 border p-4 space-y-4">
            <h1 className="text-center font-bold text-lg">Register</h1>
            {message && <p className="text-center text-green-500">{message}</p>}
            <h5>UserName</h5>
            <input type="text" name="name" placeholder="username" className="border w-full p-2" value={name} onChange={handleName} />
            <h5>Email</h5>
            <input type="email" name="name" placeholder="email" className="border w-full p-2" value={email} onChange={handleEmail} />
            <h5>Password</h5>
            <input type="text" name="name" placeholder="password" className="border w-full p-2" value={password} onChange={handlePassword}/>
            <button className="py-2 px-4 border" onClick={handleRegister}>Register</button>
            <div>
                <p>have account ? {" "} <Link to={"/login"} className="text-blue-500">Login</Link> </p>
            </div>
        </div>
    </div>
  )
}
