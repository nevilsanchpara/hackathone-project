/** @format */

import React, {useEffect, useState} from "react";
import MapContainer from "../components/MapContainer";
import Filter from "./../commonPages/Filter";
import {useLoadScript} from "@react-google-maps/api";
import Header from "../commonPages/Header";

const AdminDashboard = () => {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: "AIzaSyAd24rdyYpxR1kBIrW9klvV0co0X4coXH4",
    // googleMapsApiKey: "AIzaSyBCZkUPwFIuitR5RZsliwgJ_N6Y3R5xGO4",
  });
  // let [lat, setLat] = useState(23.473324);
  // let [long, setLong] = useState(77.947998);
  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log(position);
  //     setLat(position.coords.latitude);
  //     setLong(position.coords.longitude);
  //   });
  // }, []);

  // const onSerach = (lat, long) => {
  //   setLat(lat);
  //   setLong(long);
  // };

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      {/* <Filter onSerach={onSerach} /> */}
      <Header />
      <MapContainer />
    </>
  );
};

// AIzaSyA4eE - kyOdqtMyStGbhTf3itKvVWP_mJLE;
// AIzaSyA4eE-kyOdqtMyStGbhTf3itKvVWP_mJLE

export default AdminDashboard;
