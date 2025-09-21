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
import './App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
 
      <nav className="bg-gray-800 dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md font-medium"
              >
                Register
              </Link>
              <Link
                to="/products"
                className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md font-medium"
              >
                Products
              </Link>
              <Link
                to="/cart"
                className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md font-medium"
              >
                Cart
              </Link>
              <Link
                to="/orders"
                className="text-gray-200 hover:text-blue-400 px-3 py-2 rounded-md font-medium"
              >
                Orders
              </Link>
            </div>
          </div>
        </div>
      </nav>

    
      <main className="max-w-7xl mx-auto p-4">
        <Routes>
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
