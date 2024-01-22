
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import API_URL from '../constants';



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleapi = () => {
       
        const data = { username, password };
        const url = API_URL+"/login";
       
        axios.post(url, data)
            .then((res) => {
                
                if (res.data.message) {
                    alert(res.data.message);
                    if(res.data.token){
                        localStorage.setItem('token' , res.data.token) ;
                        localStorage.setItem('userId' , res.data.userId) ;
                        navigate('/') ;
                    }
                }
                
            })
            .catch((err) => {
                
                
                alert("An error occurred. Please try again later.");
            });
    }

    return (
        <div>
            
            <Header /> 
            <div className='p-3 m-3'>
            Welcome to Login Page
            <br></br>
            Username
            <input className='form-control' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            Password
            <input className='form-control' type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <button onClick={handleapi}>Login </button>
            <Link to="/signup">Signup</Link>

            </div>
        </div>
    )
}

export default Login;
