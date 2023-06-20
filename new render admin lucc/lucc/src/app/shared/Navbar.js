import React, { Component,useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { signout } from "../../actions/userAction"
import { useSelector, useDispatch,} from "react-redux";


function Navbar()  {

  const {  isAuthenticated,userclass} = useSelector(
    (state) => state.user
  );
  

  function toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  function toggleRightSidebar() {
    document.querySelector('.right-sidebar').classList.toggle('open');
  }
 
    const dispatch = useDispatch();

    
    const logout = () => {
      dispatch(signout());
      console.log('logout click')
    };
                    
    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          {/* <Link className="navbar-brand brand-logo-mini" to="/">LUCC <img src={require('../../assets/images/logo-mini.svg')} alt="logo" /> </Link> */}
          <Link className="navbar-brand brand-logo-mini" to="/"> <img style={{objectFit:'contain',height:'90px',width:"180px"}} src={require('../../assets/images/LUCC LOGO Main File[168].png')} alt="logo" /> </Link>
             
        </div>
        
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button className="navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
          <ul className="navbar-nav w-100">
            <li className="nav-item w-100">
              {/* <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                <input type="text" className="form-control" placeholder="Search products" />
              </form> */}
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
           
              
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link" href="!#" onClick={event => event.preventDefault()}>
                <i className="mdi mdi-view-grid"></i>
              </a>
            </li>
           
            <Dropdown alignRight as="li" className="nav-item">
              <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
                <div className="navbar-profile">
                  <img className="img-xs rounded-circle" src={userclass.pofilePicture} alt="profile" />
                  <p className="mb-0 d-none d-sm-block navbar-profile-name">{isAuthenticated? `${userclass.firstName}`: '...' }</p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                <h6 className="p-3 mb-0">Profile</h6>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success"> </i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Settings</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/" onClick={logout}  className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Log Out</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                {/* <p className="p-3 mb-0 text-center">Advanced settings</p> */}
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    );
  
}


// const maptstateToprop = (state) => {
//   return {
//     MYcounter: state.counter,
//     productList: state.productList,
//     click_products: state.click_products,
//     user: state.user
//   }
// }

export default Navbar;
