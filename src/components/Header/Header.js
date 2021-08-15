import React from 'react';
import './Header.css';
import logo from '../../images/logo.png'
import Navbar from '../Navbar/Navbar';
const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="" />
            {/* <h1 className="text-center text-danger">This is Header</h1> */}
             <Navbar></Navbar>
             {/* <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Inventory</a>
             </nav> */}
        </div>
    );
};

export default Header;