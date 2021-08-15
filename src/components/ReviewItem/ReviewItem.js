import { faPrescriptionBottle } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
   const {img,name,quantity,key,price} =props.productId;
    console.log(props.productId)   

    return (
        <div className="review__product__container">
            <div className="product__image__container pe-3">
                {/* <h1>This Is Review Item</h1> */}
                {/* <h2>{props.productId.name}</h2> */}
                <img src={img} alt="" />
            </div>
            <div>
                <h2>{name}</h2>
                <p>Quantity : {quantity}</p>
                <p>Price : {price} </p>
                <button onClick={()=>(props.removeSelectedProduct(key))} type="button" class="btn btn-warning">Remove Item</button>
            </div>


        </div>
    );
};

export default ReviewItem;