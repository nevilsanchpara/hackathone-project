import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Header.css";
import "bootstrap/dist/js/bootstrap.min.js";

const Header = () => {
  // useEffect(() => {
  //   if(localStorage.setItem(""))
  // }, []);
  const nav = useNavigate();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark navbar1'>
      <img className='logo1' src={require("./headerLogo.png")} alt='hi' />
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>

      <div
        className='mx-5 collapse navbar-collapse hello'
        id='navbarSupportedContent'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item link'>
            <Link className='nav-link text-light link' to='/admin'>
              Home
            </Link>
          </li>
          {localStorage.getItem("type") === "supervisor" ? (
            <>
              <li className='nav-item link'>
                <Link className='nav-link text-light link' to='/add-user'>
                  Add Worker
                </Link>
              </li>
              <li className='nav-item link'>
                <Link
                  className='nav-link text-light link'
                  to='/add-streetlight'>
                  Add Streetlight
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item link'>
                <Link className='nav-link text-light link' to='/add-user'>
                  Add Supervisor
                </Link>
              </li>
            </>
          )}
          <li className='nav-item link'>
            <Link className='nav-link text-light link' to='/admin-dashboard'>
              View Map
            </Link>
          </li>
          <li className='nav-item link'>
            <Link className='nav-link text-light link' to='/history'>
              History
            </Link>
          </li>
          <li className='nav-item link'>
            <Link className='nav-link text-light link' to='/about-us'>
              About Us
            </Link>
          </li>
          <li className='nav-item link'>
            <h1
              className='nav-link text-light link'
              to='#'
              onClick={() => {
                nav("/");
                localStorage.removeItem("type");
              }}>
              <i className='fa fa-sign-out logout1'></i>
            </h1>
          </li>
        </ul>
      </div>
      {/* <h1>hello</h1> */}
    </nav>
  );
};

export default Header;
