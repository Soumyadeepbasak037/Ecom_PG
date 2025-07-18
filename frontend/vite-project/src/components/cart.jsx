import { useEffect, useState } from "react"

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
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}