import axios from "axios";
import React, {useState} from "react";
import Header from "../commonPages/Header";
import "./AddStreetLight.css";
const AddStreetLight = () => {
  const [streetId, setStreetId] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [pincode, setPincode] = useState();
  const [district, setDistrict] = useState();
  const [taluka, setTaluka] = useState();
  const [village, setVillage] = useState();

  const submitHandler = () => {
    let l1 = parseFloat(latitude);
    let l2 = parseFloat(longitude);
    const obj = {
      streetId,
      longitude: l2,
      latitude: l1,
      pincode,
      district,
      taluka,
      village,
    };
    axios
      .post(
        "https://heroku-backend-hackathone.herokuapp.com/api/position/position",
        obj
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <Header />
      <div className='container-fluid pb-4 container-6'>
        <div className='row'>
          <div className='col-lg-2 col-sm-12 col-xs-12 mt-4'></div>
          <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 mt-4'>
            <div className='row'>
              <div className='col-12'>
                <span className='display13'>Add New Street Light</span>
              </div>
            </div>
            <div className='row pt-4'>
              <div className='col-12'>
                <span className='text-uppercase fw-bolder display14'>
                  Street Light ID
                </span>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    className='display15'
                    placeholder='Street Light ID'
                    onChange={(e) => setStreetId(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='row pt-4'>
              <div className='col-12'>
                <span className='text-uppercase fw-bolder display14'>
                  Position
                </span>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    className='display15'
                    placeholder='Latitude'
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    className='display15'
                    placeholder='Longitute'
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='row pt-4'>
              <div className='col-12'>
                <span className='text-uppercase fw-bolder display14'>
                  Address
                </span>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    className='display15'
                    placeholder='Village'
                    onChange={(e) => setVillage(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    className='display15'
                    placeholder='Taluka'
                    onChange={(e) => setTaluka(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    className='display15'
                    placeholder='District'
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </div>
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 pt-2'>
                <div>
                  <input
                    type='text'
                    id='typeText'
                    className='display15'
                    placeholder='Pincode'
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='row pt-4'>
              <div className='col-lg-2 col-md-2'>
                <div>
                  <button
                    type='submit'
                    className='btn display16'
                    onClick={submitHandler}>
                    Add New
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-2 col-sm-12 col-xs-12 mt-4'></div>
        </div>
      </div>
    </>
  );
};

export default AddStreetLight;
