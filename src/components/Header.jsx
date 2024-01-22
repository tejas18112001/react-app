
import { useState } from 'react';
import './Header.css';
import './Home.css'
import LikeProducts from './LikeProducts';
import Login from './Login'
import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom'
function Header(props) {
    const navigate = useNavigate();
     
    const [clicked , setClicked] = useState(false) ;

    const handleClick = () => {
        setClicked(!clicked);
    };
    const handlelogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (

        <div className='header-container d-flex justify-content-between'>

           <div>
                <Link className='links' to="/">BigBazar</Link>
            </div>

            <div className="header">
                <div className='search-container'>

                    <input
                        className="search"
                        type="text"
                        value={props && props.search}
                        onChange={(e) => { props.handlesearch && props.handlesearch(e.target.value); }}

                    />
                    <button className='search-btn'
                        onClick={() => props.handlesearchbtn && props.handlesearchbtn()}
                    >SEARCH</button>
                </div>

            </div>

        
           
          
      
      

{/*         
        <div className='userSymbol' onClick={handleClick}>
            <div className='circle'>

             <CiUser/> 
            </div>
        </div> */}
         

       
         <div className="button-container">
                
          
                {!!localStorage.getItem('token') && (
                    
                    <Link className="add-product" to="/add-product">
                        ADD PRODUCT
                    </Link>
                    
                )}

                {!!localStorage.getItem('token') && (
                    
                    <button className="add-product" onClick={()=>navigate('/LikeProducts')}>
                        LIKE PRODUCTS
                    </button>
                    
                )}


                {localStorage.getItem('token') ? (
                    <button className='add-product' onClick={handlelogout}>
                        LOGOUT
                    </button>
                ) : (
                    <Link className='login-btn' to="/login">
                        LOGIN
                    </Link>
                )}
            </div>
         
         </div>
           

       
    )
}

export default Header;