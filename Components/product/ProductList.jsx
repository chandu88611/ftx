import React, { useEffect, useState } from 'react'
import Product from './Product'
import {TbMathGreater } from "react-icons/tb";
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

function ProductList() {
    const router = useRouter();
    const [products,setProducts]=useState([])
    const checkAuthentication = async () => {
        const token = localStorage.getItem("tmToken");
        if (!token) {
          router.push("/login");
          return;
        }    
          if (token) {
            try {
              const config = {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              };
              const response = await axios.get(
                "https://admin.tradingmaterials.com/api/get/products",
                config
              );
  
              if (response.data.status) {
               
                console.log(response);
              setProducts(response.data.data.products)
              }
            } catch (error) {           
              console.error("Error fetching user info:", error);
            //   router.push("/login");
            }
          
        }
  
      
      };
useEffect(()=>{
checkAuthentication()
},[])



  return (
    <div className='p-6'>
  <div className="p-2 flex items-center font-semibold">Home <TbMathGreater className='mt-[3px]'/>Category<TbMathGreater className='mt-[3px]'/></div>
  <Box className="w-full" sx={{ display:'grid',gridTemplateColumns:{xs:"90%",md:'20% 80%'}}}>
  <div className="   ">
  </div>
  <div className=" flex flex-wrap gap-5 justify-center md:justify-start">
        
 {products?.length>0 && products?.map((data,i)=>(
    <div key={i}>

<Link href={`/dashboard/product/${data.id}`}>

        <Product img={data.img_1} title={data.name}  offer={"30%"} des={data.description} price={data.prices[0].INR} rating={data.rating} pid={data.id} />
</Link>
        

    </div>
 ))
  }

  </div>
</Box>

  
        </div>
  )
}

export default ProductList