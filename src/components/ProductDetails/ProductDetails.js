import React, {useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';


const ProductDetails = () => {
    const  { productKey } = useParams();
   const [product,setProduct]=useState({});
 

  useEffect(() => {
    fetch('https://pacific-fjord-13626.herokuapp.com/product/'+productKey)
    .then(res=>res.json())
    .then(data=>setProduct(data));

  }, [productKey])

    // const product=fakeData.find((productItem)=>productItem.key===productKey)
    return (
        <div>
            {/* <h1>This is Product Details {productKey} </h1> */}
            <Product showAddToCartButton={false} product={product} ></Product>
        </div>
    );
};

export default ProductDetails;