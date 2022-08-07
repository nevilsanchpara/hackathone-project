import React from "react";
import "./Home.css";
import {useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://heroku-backend-hackathone.herokuapp.com/api/user/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("hi inside axios");
        console.log(response);
        if (response.data.status === 200) {
          toast.success("Login successfully done!");
          setTimeout(() => {
            if (response.data.data.roleId === 1) {
              localStorage.setItem("type", "admin");
            } else {
              localStorage.setItem("type", "supervisor");
            }
            nav("/admin-dashboard");
          }, 2000);
        } else {
          toast.error("Enter valid credentials!");
        }
      })
      .catch((e) => console.log(e));
    console.log("hi");
  };

  return (
    <>
      <img src={require("./image1.png")} className='bg-img' alt='...' />
      <div className='loginbox'>
        <img
          src='https://i.imgur.com/ZYzTdD0.png'
          className='avatar'
          alt='bg-img'
        />
        <h1>Login Here</h1>
        <form method='post' action='#'>
          <p>Username</p>
          <input
            type='text'
            placeholder='Enter Username'
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type='password'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type='submit' value='Login' onClick={submitHandler} />
          <Link to='#'>Lost your password?</Link>
          <br />
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
