import { useEffect, useState } from "react"
export default function Cart_details(){
    const token = localStorage.getItem("token")
    // console.log(token)

    const [data,setData] = useState([])

    useEffect(()=>{
        async function get_cart_items(){
           if (!token) {
              console.log("User is not logged in");
              setData([]);
              return;
            }
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
    },[token])

      return (
  <div className="flex flex-col items-center p-4">
    {!token ? (
      <p className="text-gray-700 dark:text-gray-300">
        Please log in to view your cart.
      </p>
    ) : data.length === 0 ? (
      <p className="text-gray-700 dark:text-gray-300">Your cart is empty.</p>
    ) : (
      <div className="flex flex-wrap gap-4 justify-center">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-48 bg-white dark:bg-slate-800 shadow-lg rounded-xl p-4 flex flex-col items-center"
          >
            <img
              src={item.img_url}
              alt={item.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-center text-sm font-medium text-gray-800 dark:text-white">
              {item.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Quantity: {item.quantity}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Total Price: {item.total}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);
}
