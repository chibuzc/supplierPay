import React from "react";
import {Link} from 'react-router-dom'


const navBar = props => {
  return (
    <div>
      <nav class="nav-extended">
        <div class="nav-wrapper blue lighten-3">
          <a href="#" class="brand-logo">
            Pay Now!
          </a>

          {/* <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a href='/auth/google'>Login</a>
            </li>
          </ul> */}
        </div>
        <div class="nav-content blue lighten-3">
          <ul class="tabs tabs-transparent">
            <li class="tab">
            <Link to='/initiate_transfer'>Make Transfer</Link>
            </li>
            <li class="tab">
            <Link to='/beneficiaries'>Beneficiaries</Link>
            </li>
            <li class="tab">
            <Link to='/transfer/all'>All Transfers</Link>
                
            </li>
          </ul>
        </div>
        
      </nav>

    </div>
  );
};

export default navBar;
