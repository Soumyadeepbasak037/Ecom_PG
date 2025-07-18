import { useEffect, useState } from "react";

export default function Order_list(){
    const [data,setData] = useState([])
    const token = localStorage.getItem("token")
    useEffect(()=>{
        async function get_orders() {
            const response = await fetch("http://localhost:3000/api/orders/get_orders",{
                method : "GET",
                headers : {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            setData(data)
            console.log(data)
        }
        get_orders()
    },[]) 

//    return (
//   <ul>
//     {data.map((item, index) => (
//       <li key={index}>
//         <strong>{item.name}</strong> — Qty: {item.quantity}, ${item.total_price} (Order #{item.order_id})
//       </li>
//     ))}
//   </ul>
// );

return (
  <div className="flex flex-wrap gap-4 justify-center">
    {data.map((item,index) => (
      <div
        key={index}
        className="w-48 bg-white p-4 shadow-lg rounded-xl dark:bg-slate-800 dark:shadow-none dark:outline-white/10"
      >
        <img
          alt={item.name}
          src={item.img_url}
          className="w-full h-auto rounded-md mb-2"
        />
        <h3 className="text-center text-sm font-medium text-gray-800 dark:text-white">
          {item.name}
        </h3>
      </div>
    ))}
  </div>
);
}
