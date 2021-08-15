import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
// import fakeData from "../../fakeData";
import { addToDatabaseCart,getDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import './Shop.css';
const Shop = () => {
  // const product10 = fakeData.slice(0, 10);
  //  console.log(product10)
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([])  // "[]"  blank array rekhlam karon initial stage a cart 0 product thakleo add product korla new new product array akare store hobe  
//  console.log(products);

 
  useEffect(() => {
    fetch('http://localhost:8000/products')
    .then(res=>res.json())
    .then(data=>setProducts(data))
  }, [])
  






 //==========================> order summary manage without quantity <========================== 

  // const handleClick = (productId)=>{
  //     // console.log('Button Clicked',product);
  //     const updatedCart=[...cart,productId] //akhane agee "product" naam k parameter hisabe use kore cilam akhon naam  change kore "productId" kore dilam coz "product" naam ta bar bar use korteci tai confusion aranor jonno "productId" use korlam
  //     setCart(updatedCart);

  //     const sameProduct=updatedCart.filter((productItem)=>(productItem.key===productId.key ));
  //    const count = sameProduct.length;
  //     addToDatabaseCart(productId.key,count) //localStorage a data Store korteci 
  //   //"addtoDatabaseCart" diye database a data add korlam tarpor 
  //   // "getDatabaseCart" diye database theke data restore korbo
  //   //addtoDatabaseCart => fakeData theke load hocce
  //    //1st a filter kore cross match korlam jate ki ki match product ache miliye nilam..
  //    //2nd array ar length jene nilam
  //    //tarpor count namme a pass kore dilam

  // }

//==========================> order summary manage with quantity <========================== 
 
const handleClick = (product) =>{
    const productToBeAddedKey = product.key;
    const sameProductQuery = cart.find(productId => productId.key === productToBeAddedKey);
    
    let count = 1;
    let updatedCart;
    // ak product jodi more two or more times order kora hoy
    if(sameProductQuery){
        count = sameProductQuery.quantity + 1;
        sameProductQuery.quantity = count;
        const othersProductQuery = cart.filter(productIdentity => productIdentity.key !== productToBeAddedKey);
        updatedCart = [...othersProductQuery, sameProductQuery];
    }
    else{
      // ak product jodi akbar order kora hoy
        product.quantity = 1;
        updatedCart = [...cart, product];
    }
    setCart(updatedCart);
    addToDatabaseCart(product.key, count);
}

//==========================> load data from local storage <========================== 

useEffect(()=>{
  const savedCart = getDatabaseCart();
  const productKeys = Object.keys(savedCart);
  fetch('http://localhost:8000/productsByKeys', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(productKeys)
  })
  .then(res => res.json())
  .then(data => setCart(data))
}, [])

  return (
    <div className="shopping">
        <div className="product__container">
            {/* <h1>This is Shop</h1> */}
            <ul>
            {/* {products.length} */}
            {/* {products.map((productItem)=><li>{productItem.name}</li>)} */}
            {products.map((productItem) => (
                <Product key={productItem.key} showAddToCartButton={true} handleClicked={handleClick} product={productItem}></Product>
            ))}

            {/*Data Passing with Props, ekhane "product" [small p] namme parameter[params] "productItem" k pathalam "product page a "props" [props=properties] akare receive korbo"*/}

            {/* {products.map((productName)=>(productName.name))} */}
            {/* {products.map((productPrice)=>(productPrice.price))} */}
            </ul>
        </div>
        <div>
            <Cart cart={cart}>
            <Link to="/review">
                  <button type="button" class="btn btn-warning">Review Order</button>
            </Link>
            </Cart>
        </div>
    </div>
  );
};

export default Shop;
