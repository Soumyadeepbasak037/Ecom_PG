// // import { useState } from 'react'

// import Login from './components/loginForm'
// import Register from './components/registerForm'
// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       <Login></Login>
//     </>
//   )
// }

// export default App
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/registerForm";
import Login from "./components/loginForm";
import HandleClickComponent from "./components/productsList";
import FetchProducts from "./components/productsList";
import Cart_details from "./components/cart";
import './App.css'
import Order_list from "./components/orders";
// import Products from "./components/productsList";


export default function App() {
  return (
    <div> 
      <ul id="nav-mobile" className="nav_cls" >
        <Link to="/Login">Login </Link> 
        <Link to="/Register">Register </Link> 
        <Link to="/Products">Products </Link> 
        <Link to="/Cart"> Cart </Link>
        <Link to="/Orders"> Orders</Link>
        {/* <Link to="/add">Add Product </Link> */}
      </ul> 

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path ="/products" element = {<FetchProducts/>}></Route>
        <Route path = "/cart" element = {<Cart_details/>}></Route>
        <Route path = "/orders" element = {<Order_list/>}></Route> 
      </Routes>
    </div>
  );
}
