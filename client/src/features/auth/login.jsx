import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handlePassword (e) {
        setPassword(e.target.value)
    }

    async function handleLogin () {
        try {     
            const response = await axios.post('http://localhost:3000/api/v1/login', {email, password}, { withCredentials: true });

            if(response) {
                console.log(response);
                const token = response.data.accessToken;
                console.log(token);
                const decoded = jwtDecode(token)
                console.log(decoded.role);
                
                localStorage.setItem('user',JSON.stringify(decoded));
                localStorage.setItem('token', JSON.stringify(token))
                if(decoded.role == 'user') {
                    navigate('/chat-apps/list-dokter')
                } else if (decoded.role == 'dokter'){
                    navigate('/chat-apps/dokter-chat')
                }
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message); 
              } else {
                setError("Login failed. Please try again.");
              }       
        }
    }


  return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 border p-4 space-y-4">
            <h1 className="text-center font-bold text-lg">Login</h1>
            <h5>email</h5>
            <input type="email" name="email" placeholder="username" className="border w-full p-2" value={email} onChange={handleEmail} />
            <h5>Password</h5>
            <input type="text" name="password" placeholder="password" className="border w-full p-2" value={password} onChange={handlePassword}/>
            <button className="py-2 px-4 border"onClick={handleLogin}>Login</button>
            {error && <p className="text-center text-red-500">{error}</p>}
            <p>dont have account ? {" "} <Link to={"/register"} className="text-blue-500">Register</Link> </p>
        </div>
    </div>
  )
}
