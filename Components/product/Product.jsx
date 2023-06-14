import axios from 'axios';
import React, { useState } from 'react';
import { AiFillStar } from "react-icons/ai";
import {BsCurrencyRupee } from "react-icons/bs";
import { useDispatch } from 'react-redux';
const Product = ({offer,title,rating,des,price,img,pid}) => {
const dispatch=useDispatch()
const [id,setId]=useState('')
const [quantity, setQuantity] = useState(1);

const handleDecreaseQuantity = () => {
  if (quantity > 1) {
    setQuantity(quantity - 1);
  }
};

const handleIncreaseQuantity = () => {
  setQuantity(quantity + 1);
};
  const addToCart=async(pidd)=>{
    
    const token = localStorage.getItem("tmToken");
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/product/add-to-cart",{
              product_id:pidd,
              qty:quantity
          },
          config
        );

        if (response.data.status) {
         
          console.log(response);

        }
      } catch (error) {           
        console.error("Error fetching user info:", error);
      }
    
  }

  }
  
  return (
    <div className="rounded overflow-hidden shadow-lg w-96">
      <div className="relative">
        <img
          className="h-64 w-full object-cover"
          src={img}
          alt="Product Image"
        />
        {offer &&<span className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-bl">
          Offer{offer}
        </span>}
      </div>
      <div className="px-6 py-4 ">
        <div className="flex items-center mb-4  justify-between h-20 gap-4 w-full">
        <div className="font-bold text-lg mb-2  ">{title}</div>
          <div className="text-sm flex ">
            <span className="text-gray-900 font-semibold flex items-center">{rating}<AiFillStar/></span>
            {/* <span className="text-gray-600"> (500 ratings)</span> */}
          </div>
          
        </div>
        <div className='h-28'
                    dangerouslySetInnerHTML={{
                      __html: des,
                    }}     suppressHydrationWarning={true}
                  />
      </div>
      <div className="px-6 py-4 flex items-center mb-4  justify-between">
        <span className="text-gray-900 font-bold text-lg flex items-center"><BsCurrencyRupee/>{price}</span>

        <div className="flex items-center gap-2 ">
                  <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                    onClick={handleDecreaseQuantity}
                  >
                    -
                  </button>
                  <p className="text-xl font-semibold">{quantity}</p>
                  <button
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded"
                    onClick={handleIncreaseQuantity}
                  >
                    +
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={()=>addToCart(pid)}>
          Add to Cart
        </button>
                </div>
        
      </div>
    </div>
  );
};

export default Product;
