import Header from "./Header";
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";

function Home() {
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');
    const [nosearch, setNosearch] = useState(false);




    useEffect(() => {
        const url = API_URL + '/get-products';
        axios.get(url)
            .then((res) => {

                if (res.data.products) {

                    setproducts(res.data.products);
                }
            })
            .catch((err) => {
                // console.log(err);
                alert('server error');
            })
    }, []);



    const handlesearch = (value) => {

        setsearch(value);
    }

    const handlesearchbtn = () => {


        const url = API_URL + "/search?search=" + search;
        axios.get(url)
            .then((res) => {
                console.log(res.data.products);
                if (res.data.products)
                    setcproducts(res.data.products);
            })
            .catch((err) => {
                console.log(err);
                alert('SERVER ERROR');
            })

    }


    const handleCategory = (value) => {

        let searchProducts = products.filter((item) => {

            if (item.ptype.toLowerCase() == (value.toLowerCase())) {
                return item;
            }
        })

        if (searchProducts.length === 0) {
            searchProducts = [];
            if (value === "All Categories")
                setNosearch(false);
            else
                setNosearch(true);

        } else {
            setNosearch(false);
        }

        setcproducts(searchProducts);
    }


    const handleLike = (value) => {


        const userId = localStorage.getItem('userId');
        const productId = value;

        const data = { userId, productId };
        const url = API_URL + "/like-products";
        axios.post(url, data)
            .then((res) => {
                console.log(res);

            })
            .catch((err) => {
                alert("An error occurred. Please try again later.");
            });




    }

    const handleSearchItems = () => {
        setNosearch(!nosearch);
    }


    const handleproductDetail = (value) => {
        navigate('/ProductDetail/' + value)
    }




    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handlesearchbtn={handlesearchbtn} />
            <Categories handleCategory={handleCategory} />

            {
                cproducts && cproducts.length > 0 ?
                    <h5>SEARCH PRODUCTS:</h5> :

                    nosearch && <h5>NO PRODUCT FOUND</h5>


            }

            <div className="d-flex justify-content-center flex-wrap">
                {

                    products && products.length > 0 &&
                    cproducts.map((item, index) => {
                        return (
                            <div key={item._id} className="card m-3">
                                <img width="250px" height="150px" src={API_URL + '/' + item.pimage}></img>
                                <h3 className="m-2 price-text">Rs. {item.pprice} /-</h3>
                                <p className="m-2">{item.pname} | {item.ptype}</p>
                                <p className="m-2 text-primary">{item.pdesc}</p>
                            </div>

                        )
                    })
                }
            </div>

            <h5>ALL PRODUCTS:</h5>
            <div className="d-flex justify-content-center flex-wrap">
                {
                    products && products.length > 0 &&
                    products.map((item, index) => {
                        return (
                            <div onClick={() => handleproductDetail(item._id)} key={item._id} className="card m-3">
                                <img width="250px" height="150px" src={API_URL + '/' + item.pimage}></img>
                                <div className="icon-con" onClick={() => handleLike(item._id)}>
                                    <FaHeart className="icons" />
                                </div>
                                <h3 className="m-2 price-text">Rs. {item.pprice} /-</h3>
                                <p className="m-2">{item.pname} | {item.ptype}</p>
                                <p className="m-2 text-primary">{item.pdesc}</p>
                            </div>

                        )
                    })
                }
            </div>



        </div>
    )
}

export default Home;