
import Header from "./Header";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./categories";
import { FaHeart } from "react-icons/fa";
import './Home.css' ;
import API_URL from "../constants";

function LikeProducts(props) {
    
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [nosearch , setNosearch] = useState(false) ;
    
   



    useEffect(() => {
        const userId = localStorage.getItem('userId') ;
        const url = API_URL+'/get-likeProducts:'+userId;
        axios.get(url)
            .then((res) => {

                if (res.data.likeProducts) {
                    console.log(res.data.likeProducts) ;
                    setproducts(res.data.likeProducts);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('server error');
            })
    }, []) ;



    const handlesearch = (value) => {

        setsearch(value);
    }

    const handlesearchbtn = () => {
        //   console.log("products" ,products) ;
        let searchProducts = products.filter((item) => {
            //   console.log(item) ;
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.ptype.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        })

        setcproducts(searchProducts);
    }


    const handleCategory = (value) => {
        
        let searchProducts = products.filter((item) => {
            
            if (item.ptype.toLowerCase() == (value.toLowerCase())) {
                return item;
            }
        })

        if(searchProducts.length ===  0) {
            searchProducts = [] ;
            if(value === "All Categories") 
               setNosearch(false);
            else 
               setNosearch(true);
           
        }else  {
            setNosearch(false);
        }

        setcproducts(searchProducts);
    }

   
    const handleLike = (value) => {
        const userId  = localStorage.getItem('userId');
        const productId = value ;
        
        const data = { userId, productId };
        const url = API_URL+"/like-products";
        axios.post(url, data)
            .then((res) => {
                 console.log(res) ;
                 
                
            })
            .catch((err) => {
               alert("An error occurred. Please try again later.");
    });
        
 }




    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handlesearchbtn={handlesearchbtn} />
            <Categories handleCategory={handleCategory} />
             
            {
                products && products.length > 0 ?
                <h5>LIKE PRODUCTS:</h5> :
                nosearch && <h5>NO LIKE PRODUCT FOUND</h5>

            }
            {/* <div className="d-flex justify-content-center flex-wrap">
                {
                    products && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3">
                                <img width="400px" height="200px" src={API_URL+'/' + item.pimage}></img>
                                <p className="m-2">{item.pname} | {item.ptype}</p>
                                <p className="m-2 text-primary">{item.pdesc}</p>
                                <h3 className="m-2 text-danger">{item.pprice}</h3>
                            </div>

                        )
                    })
                }
            </div> */}

            {/* <h5>ALL PRODUCTS:</h5> */}
            <div className="d-flex justify-content-center flex-wrap">
                {
                    products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3">
                                <img width="400px" height="200px" src={API_URL+'/' + item.pimage}></img>
                                <div className="icon-con" onClick={()=>handleLike(item._id)}>
                                    <FaHeart className="icons" />
                                </div>
                                <p className="m-2">{item.pname} | {item.ptype}</p>
                                <p className="m-2 text-primary">{item.pdesc}</p>
                                <h3 className="m-2 text-danger">{item.pprice}</h3>
                            </div>

                        )
                    })
                }
            </div>
             


        </div>
    )
}


export default LikeProducts ;