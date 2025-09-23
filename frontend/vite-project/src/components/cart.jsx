import { useEffect, useState } from "react"
import Card from "./cardComponent"
export default function Cart_details(){
    const token = localStorage.getItem("token")
    // console.log(token)

    const [data,setData] = useState([])

    useEffect(()=>{
        async function get_cart_items(){
            const response = await fetch("http://localhost:3000/api/orders/cart",{
                method : "GET",
                headers : {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data)
            setData(data)
        }
        get_cart_items()
    },[])

      return (
  <div className="flex flex-wrap gap-4 justify-center">
      {data.map((item) => (
        // <li key={item.id}>Item: {item.name}, Qunatity: {item.quantity}</li>
        <>
        <div className="w-48 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 flex flex-col items-center">
      <img
        src={item.name}
        alt={item.name}
        className="w-full h-32 object-cover rounded-md mb-2"
      />
      <h3 className="text-center text-sm font-medium text-gray-800 dark:text-white">
        {item.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
        Quantity:{item.quantity}
      </p>
      </div>
        </>

      ))}
    </div>
     //<Card title={product.name} details={{ Price: product.price, Brand: product.brand, Stock: product.stock }} />
      
  );
}
