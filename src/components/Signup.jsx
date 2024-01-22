import Header from './Header'
import {Link} from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios' ;
import API_URL from '../constants';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const handleapi = () => {

        const url = API_URL+"/signup";
        const data = { username, password , email, mobile };
        
       // Change GET request to POST request
        axios.post(url, data, { headers: { 'Content-Type': 'application/json' } })
            .then((res) => {
                console.log("res= " + res);
                if (res.data.message) {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                // console.log("Something went wrong", err);
                alert(err);
            });


    }

    return(
        <div>
             <Header/>
             <div className='p-3 m-3'>

            
             Welcome to Signup Page
              <br></br> 
              Username
             <input className='form-control' type = "text" value = {username} onChange={(e) => {

                  setUsername(e.target.value) ;
             }}/> 
             <br></br> 
              Password
             <input className='form-control' type = "text" value ={password} onChange={(e)=>{
                
                setPassword(e.target.value) ;
             }}/> 
             <br></br> 
             Email
              <input className='form-control' type = "text" value ={email} onChange={(e)=>{
                
                setEmail(e.target.value) ;
             }}/> 
             <br></br> 
             Mobile
             <input className='form-control '  type = "text" value ={mobile} onChange={(e)=>{
                
                setMobile(e.target.value) ;
             }}/> 
              
              


             <button onClick={handleapi}>Signup </button>
             <Link to ="/login">Login</Link>

             </div>
           
        </div>
    )
}

export default Signup 