import React from 'react'
import Layout from "@/Components/Layout";
import ProductList from '@/Components/product/ProductList';
import { useSelector,useDispatch } from 'react-redux';

function index() {
  return (
    <div>
        
        <Layout>


    <ProductList/>
      </Layout>
    </div>
        
        
  )
}



export default index