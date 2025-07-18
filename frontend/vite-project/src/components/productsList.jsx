import React, { useEffect } from "react";
import { useState } from "react";
export default function FetchProducts() {
      const [data, setData] = useState([])

      // useEffect(()=>{  fetch("http://localhost:3000/api/products/").then((res)=>{
      //   return res.json()
      // })
      // .then((data)=>{
      //   console.log(data)
      //   setData(data)
      // })},[])

      useEffect(()=>{(async()=>{
        try{
          const response = await fetch("http://localhost:3000/api/products/")
          const data = await response.json()
          setData(data)
        }
        catch(err){
          console.log(err)
        }
      })()} //IIFE used, function gets called immediately, the function initially needs to defines inside a parenthesis
    ,[])


      return (
  <div className="flex flex-wrap gap-4 justify-center">
    {data.map((item) => (
      <div
        key={item.id}
        className="w-48 bg-white p-4 shadow-lg rounded-xl dark:bg-slate-800 dark:shadow-none dark:outline-white/10"
      >
        <img
          src={item.img_url}
          alt={item.name}
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


// async function handleClick(productId){
//   try{
//     const response = await fetch()
//   }
// }
// export function Fetchprod(){
//   const [prod,setProd] = useState([])

//   useEffect(()=>{
//     async function fetchData(){
//       const response = await fetch("http://localhost:3000/api/products/")
//       console.log(response)
//       const data = await(response.json())
//       setProd(data)
//       console.log(data)
//       console.log(prod)
//     }
//     fetchData()
//   }
// ,[prod])
// }

// }
//   const handleClick = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/products/");
//       const prods = await response.json();
//       setData(prods) 
//       console.log("API Response:", prods);
//     } catch (err) {
//       console.log("Error:", err);
//     }
//   };

// //   return (
// //     <div>
// //       <button type="button" onClick={handleClick}>
// //         Fetch
// //       </button>
// //     </div>
// //   );
// return (
//     <div>
//       <button type="button" onClick={handleClick}>
//         Fetch
//       </button>


//       {data && Array.isArray(data) && (
//         <ul>
//           {data.map((product, index) => (
//             <li key={index}>
//               <h3>{product.name}</h3>
//               <p>Price: {product.price}</p>
//               <p>Description: {product.description}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }



// // export default async function HandleClickComponent(){
// //     try {
// //       const response = await fetch("http://localhost:3000/api/products/");
// //       const prods = await response.json();
// //       console.log("API Response:", prods);
// //       return (
// //     <div>
// //       <h2>{prods.name}</h2>
// //       {/* <p>Age: {prods.age}</p>
// //       <p>City: {prods.city}</p> */}
// //     </div>
// //   );
// //     } catch (err) {
// //       console.log("Error:", err);
// //     }
// // }

