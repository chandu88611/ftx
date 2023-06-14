import React from 'react'
import Layout from "@/Components/Layout";
import Cart from '@/Components/Cart/Cart';
import { useSelector,useDispatch } from 'react-redux';

function index() {
  return (
    <div>
        
        <Layout>


    <Cart/>
      </Layout>
    </div>
        
        
  )
}

export default index