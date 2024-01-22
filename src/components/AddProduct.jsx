import Header from "./Header";
import {Link , useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import catArray from "./categoriesType";
import API_URL from "../constants";
function AddProduct () {
    const navigate = useNavigate() ;
    
    const [pname , setpname] = useState('') ;
    const [pdesc , setpdesc] = useState('') ;
    const [pprice , setpprice] = useState('') ;
    const [ptype , setptype] = useState('') ;
    const [pimage , setpimage] = useState('') ;

    useEffect(()=>{
              if(!localStorage.getItem('token')) {
                 navigate('/login') ;
              }
    } , []) ;


    const handleApi = () =>{
   
         const formData = new FormData() ;
         formData.append('pname' , pname) ;
         formData.append('pdesc' , pdesc) ;
         formData.append('pprice' , pprice) ;
         formData.append('ptype' , ptype) ;
         formData.append('pimage' , pimage) ;
         formData.append('userId' , localStorage.getItem('userId')) ;
         const url = API_URL+'/add-product' ;
         axios.post(url ,formData)
         .then((res) => {
            
             if(res.data.message) {
                 alert(res.data.message) ;
                 navigate('/') ;
             }
         })
         .catch((err) => {
            // console.log("error happen" , err) ;
            alert('Server Error' , err) ;
         })
    }

    return(
        <div>
            <Header/>
            <div className="p-3">

            <h2>ADD YOUR PRODUCT</h2>
           
            <label> Product Name</label>
            <input type = 'text'className="form-control" value = {pname}
            onChange={(e) => setpname(e.target.value)}/>

            <label> Product Description</label>
            <input type = 'text'className="form-control"  value = {pdesc}
              onChange={(e) => setpdesc(e.target.value)}/>

            <label> Product Price</label>
            <input type = 'text' className="form-control"  value = {pprice}
             onChange={(e) => setpprice(e.target.value)}/>

            <label> Product Categiory</label>

            <select className="form-control"  value = {ptype}
              onChange={(e) => setptype(e.target.value)}>
                {
                    catArray.map((item, index)=>{
                        return(
                            <option key = {index}>{item}</option>
                        )
                      
                    })

                }
               
            </select>
            <label> Select Product Image</label>
            <input  className="form-control" type= 'file' 
             onChange={(e) => {
                  setpimage(e.target.files[0]) ;
             }}/>

            <button className="btn  btn-primary mt-3" onClick={handleApi}>SUBMIT</button>
            
            </div>
        </div>
    )
}

export default AddProduct ;