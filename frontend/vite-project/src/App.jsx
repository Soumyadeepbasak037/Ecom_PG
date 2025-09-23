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
import FetchProducts from "./components/productsList";
import Cart_details from "./components/cart";
import Order_list from "./components/orders";
import Home from "./components/Home";
import "./App.css";

export default function App() {
  return (
    <div className="bg-slate-500 text-gray-100 min-h-screen">

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 
                      bg-black text-white rounded-full px-10 py-3 
                      w-[90%] flex items-center justify-between 
                      shadow-[0_0_20px_2px_rgba(0,255,255,0.6)] 
                      border border-cyan-400/50 z-50">
        <div className="flex space-x-6">
          <Link
            to="/login"
            className="text-cyan-300 hover:text-white transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-cyan-300 hover:text-white transition-colors duration-300"
          >
            Register
          </Link>
          <Link
            to="/products"
            className="text-cyan-300 hover:text-white transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="text-cyan-300 hover:text-white transition-colors duration-300"
          >
            Cart
          </Link>
          <Link
            to="/orders"
            className="text-cyan-300 hover:text-white transition-colors duration-300"
          >
            Orders
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto p-4 pt-24">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<FetchProducts />} />
          <Route path="/cart" element={<Cart_details />} />
          <Route path="/orders" element={<Order_list />} />
        </Routes>
      </main>
    </div>
  );
}
