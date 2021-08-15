import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
const Cart = (props) => {
    const cart =props.cart
   console.log(props);
    // const total = cart.reduce((total,productPrice)=>total+productPrice.price,0);
    // const total = cart.reduce((total,productIdentity)=>total+productIdentity.price*productIdentity.quantity,0);
    // debugger;

    // let total = 0;
    // for(let i = 0; i< cart.length; i++){
    //     const product = cart[i];
    //     total = total + product.price;
    //     debugger;
    // }

    let total = 0;
    for(let i = 0; i< cart.length; i++){
        const product = cart[i];
        console.log(product.price, product.quantity)
        total = total + product.price * product.quantity || 1; //Total price not working
    }


   
    let shipping=0;
    if(total>=30){
        shipping=0;
    }
    else if(total>=10){
        shipping=4.99;
    }
    else if(total>0){
        shipping=14.99;
    }
   
    let totalPriceWithoutTax=total.toFixed(2)+shipping.toFixed(2)
    let tax=(total+shipping)/10;

    let grandTotal=(total+shipping+tax).toFixed(2); //round figure niye tarpor "toFixed korte hobe nahole ulta palta result dekhabe"

    return (
        <div className="pt-5 ps-5">
            <h1>Order Summary</h1>
            <small>Items Ordered:{cart.length}</small> <br />
            <small>Items neat Price:{total.toFixed(2)}</small><br />  {/* toFixed(2) mane dosomiker pore 2 ghor  */}
            <small>Shipping & Handling : {shipping.toFixed(2)}</small><br />
            <small>Total before Tax: {totalPriceWithoutTax}</small><br />
            <small>Estimated Tax: {tax.toFixed(2)}</small><br />
            <h3>Order Total : {grandTotal}</h3> <br />
            {/* <Link to={'/review'} ><button type="button" to={'/review'} class="btn btn-warning">Review Order</button></Link> */}
            {
                props.children
            }
        </div>
    );
};

export default Cart;