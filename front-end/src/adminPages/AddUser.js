import React, {useState, useEffect} from "react";
import "../adminPages/AddUser.css";
import Header from "../commonPages/Header";
import axios from "axios";
const AddUser = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [pincode, setPincode] = useState();
  const [village, setVillage] = useState();
  const [district, setDistrict] = useState();
  const [state, setState] = useState();
  const [taluka, setTaluka] = useState();
  const [roleId, setRoldId] = useState();

  useEffect(() => {
    console.log(localStorage.getItem("type"));
    if (localStorage.getItem("type") === "supervisor") {
      setRoldId(3);
    } else {
      setRoldId(2);
    }
  }, []);

  const submitHandler = () => {
    const obj = {
      firstName,
      lastName,
      address,
      email,
      phone,
      pincode,
      village,
      district,
      state,
      taluka,
      roleId,
    };
    axios
      .post(
        "https://heroku-backend-hackathone.herokuapp.com/api/user/adduser",
        obj
      )
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Header />
      <div class='container-fluid pb-4 container-5'>
        <div class='row'>
          <div class='col-lg-2 col-sm-12 col-xs-12 mt-4'></div>
          <div class='col-lg-8 col-md-12 col-sm-12 col-xs-12 mt-4'>
            <div class='row'>
              <div class='col-12'>
                <span class='display8'>Basic Information</span>
              </div>
            </div>
            <div class='row pt-4'>
              <div class='col-12'>
                <span class='text-uppercase fw-bolder display9'>Name</span>
              </div>
            </div>
            <div class='row'>
              <div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    class='display10'
                    placeholder='First Name'
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>
              <div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    class='display10'
                    placeholder='Last Name'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class='row pt-4'>
              <div class='col-12'>
                <span class='text-uppercase fw-bolder display9'>Contact</span>
              </div>
            </div>
            <div class='row'>
              <div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    class='display10'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    class='display10'
                    placeholder='Mobile Number'
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class='row pt-4'>
              <div class='col-12'>
                <span class='text-uppercase fw-bolder display9'>
                  Personal Address
                </span>
              </div>
            </div>
            <div class='row'>
              <div class='col-12 pt-2'>
                <div>
                  <textarea
                    class='display11'
                    placeholder='Personal Address'
                    onChange={(e) => setAddress(e.target.value)}
                    rows='3'></textarea>
                </div>
              </div>
            </div>
            <div class='row pt-4'>
              <div class='col-12'>
                <span class='text-uppercase fw-bolder display9'>
                  Working Address
                </span>
              </div>
            </div>
            <div class='row'>
              <div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    class='display10'
                    placeholder='Village'
                    onChange={(e) => setVillage(e.target.value)}
                  />
                </div>
              </div>
              <div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    class='display10'
                    placeholder='Taluka'
                    onChange={(e) => setTaluka(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class='row'>
              <div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    class='display10'
                    placeholder='District'
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
              </div>
              <div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    class='display10'
                    placeholder='State'
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class='row'>
              <div class='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    class='display10'
                    placeholder='Pincode'
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div class='row pt-4'>
              <div class='col-lg-2 col-md-2'>
                <div>
                  <button
                    type='submit'
                    class='btn display12'
                    onClick={submitHandler}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class='col-lg-2 col-sm-12 col-xs-12 mt-4'></div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
