import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Navbar = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    return (
        <div>
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand text-white " href="/">Ema-John</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                        <Link class="nav-link active text-white" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link text-white" to="/shop">Shop</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link text-white" aria-current="page" to="/review">Order Review</Link>
                        </li>
                        <li class="nav-item">
                        <Link class="nav-link text-white" to="/inventory">Inventory here</Link>
                        </li>
                        <li>
                            <button onClick={() => setLoggedInUser({})} class="nav-link text-primary">Sign Out</button>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;