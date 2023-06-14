import axios from 'axios';
import React, { useEffect, useState } from 'react'






function Cart() {
const [products,setProducts]=useState([])
  const getAllItems=async()=>{
    
    const token = localStorage.getItem("tmToken");
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };
        const response = await axios.get(
          "https://admin.tradingmaterials.com/api/product/cart-list",
          config
        );


        if (response.data.status) {
         setProducts(response.data.cart_items)
          console.log(response);

        }
      } catch (error) {           
        console.error("Error fetching user info:", error);
      }
    
  }
  }


  useEffect(()=>{
getAllItems()
  },[])
const removeCartItem=async(id)=>{
  const token = localStorage.getItem("tmToken");
  if (token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };
      const response = await axios.post(
        "https://admin.tradingmaterials.com/api/product/remove-cart-item",{item_id:id},
        config
      );
      if (response.data.status) {
       setProducts(response.data.cart_items)
        console.log(response);
      }
    } catch (error) {           
      console.error("Error fetching user info:", error);
    }
}
  }


  const updateCartItem=async(id)=>{
    const token = localStorage.getItem("tmToken");
    if (token) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        };
        const response = await axios.post(
          "https://admin.tradingmaterials.com/api/product/update-cart-item",{
            item_id:id,
            qty:''

          },
          config
        );
        if (response.data.status) {
         setProducts(response.data.cart_items)
          console.log(response);
        }
      } catch (error) {           
        console.error("Error fetching user info:", error);
      }
  }
    }


  return (
    <div>Cart</div>
  )
}

export default Cart