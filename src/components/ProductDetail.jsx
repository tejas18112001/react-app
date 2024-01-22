import Header from "./Header";
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./categories";
import { FaHeart } from "react-icons/fa";
import './Home.css';
import API_URL from "../constants";


function ProductDetail() {

    const p = useParams();

    const [productDetail, setproductDetail] = useState('');
    const [user, setUser] = useState('');
    useEffect(() => {

        const url = API_URL + '/get-productDetail:' + p.id;
        axios.get(url)
            .then((res) => {

                if (res.data.products) {
                    setproductDetail(res.data.products);
                }
            })
            .catch((err) => {

                alert('server error');
            })
    }, []);

    const handleContact = (value) => {
        const url = API_URL + "/get-contact/" + value;
        axios.get(url)
            .then((res) => {
                // console.log(res.data.products);
                if (res.data.user)
                    setUser(res.data.user);
            })
            .catch((err) => {

                alert('SERVER ERROR');
            })
    }

    const h4Styles = {
        marginBottom: '10px',
        fontSize: '18px',
        color: '#333',
       
      };
    return (


        <div>
            <Header />
            <h5 className="m-5">PRODUCT DETAIL :</h5>
            <div className="d-grid justify-content-center flex-wrap">


                <div className="card m-3">
                    <img width="700px" height="400px" src={API_URL + '/' + productDetail.pimage}></img>

                </div>

                <div>

                    <p className="m-2 text-primary">{productDetail.pdesc}</p>
                    <h3 className="m-2 text-danger">Rs. {productDetail.pprice} /-</h3>
                    {
                        productDetail.addedBy &&
                        <button onClick={() => handleContact(productDetail.addedBy)}>SHOW CONTACTS</button>

                    }

                    <div>
                        {user && user.username && <h4 style={h4Styles}>{user.username}</h4>}
                        {user && user.mobile && <h4 style={h4Styles}>{user.mobile}</h4>}
                        {user && user.email && <h4 style={h4Styles}>{user.email}</h4>}
                    </div>

                </div>
                <div>
                    <p className="display-5">{productDetail.pname} | {productDetail.ptype}</p>
                </div>



            </div>

        </div>

    )
}

export default ProductDetail;