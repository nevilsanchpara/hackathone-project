/** @format */

import React from "react";
import {axios} from "axios";
import {useState} from "react";
import {MdLocationPin} from "react-icons/md";
import {FcSearch} from "react-icons/fc";
import "./Filter.css";
const Filter = (props) => {
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState();
  // let [lat, setLat] = useState(23.473324);
  // let [long, setLong] = useState(77.947998);

  const submitHandler = (lat, lon) => {
    // console.log(lat, lon);
    props.onSerach(lat, lon);
    setAddress();
  };
  const changeHandler = (e) => {
    console.log(e.target.value);
    setQuery(e.target.value);
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=25c4584e1d9a4aa0be85fa89a58ac389`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setAddress(result.features))
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div className='filter'>
        <input type='text' onChange={changeHandler} />
        {/* <button onClick={submitHandler}>click me</button> */}
        <FcSearch onClick={submitHandler} />
        {address?.map((d, i) => {
          return (
            <>
              <p
                key={i}
                style={{border: "0.1px solid black"}}
                onClick={() =>
                  submitHandler(d.properties.lat, d.properties.lon)
                }>
                <MdLocationPin style={{color: "#A60D0D"}} />
                {d.properties.formatted}
              </p>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Filter;
