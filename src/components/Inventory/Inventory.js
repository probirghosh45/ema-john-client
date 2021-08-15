import React from 'react';
import './Inventory.css'
// import fakeData from '../../fakeData'
const Inventory = () => {

   const handleAddProduct =()=>{
     const product={}  
     fetch('http://localhost:8000/addProduct',{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body:JSON.stringify(product)
     })
   }

    return (
        <div>
            <form className="form" action="">
                <p><span>Name: </span><input type="text"/></p>
                <p><span>price: </span><input type="text"/></p>
                <p><span>Quantity:</span><input type="text"/></p>
                <p><span>Product Image</span><input type="file"/></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;