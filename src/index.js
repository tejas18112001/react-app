
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AddProduct from './components/AddProduct';
import LikeProducts from './components/LikeProducts';
import ProductDetail from './components/ProductDetail';
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/>)
  },

  {
    path: "/login",
    element: (<Login/>)
  },
 

  {
    path: "/signup",
    element: (<Signup/>)
  },

  {
    path: "/add-product",
    element: (<AddProduct/>)
  },
 
  {
    path: "/LikeProducts",
    element: (<LikeProducts/>)
  },
 
  {
    path: "/ProductDetail/:id",
    element: (<ProductDetail/>)
  },

  {
    path: "about",
    element: <div>About</div>,
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
  );
  reportWebVitals();