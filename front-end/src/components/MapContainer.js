/** @format */
import {GoogleMap, MarkerF} from "@react-google-maps/api";
import {useMemo} from "react";
import {useEffect} from "react";
import axios from "axios";
import {useState} from "react";
import {MdLocationPin} from "react-icons/md";
import {AiOutlineClose} from "react-icons/ai";
import "./MapContainer.css";

function MapContainer() {
  const [data, setData] = useState();
  const [details, setDetails] = useState();
  let [lat, setLat] = useState(23.473324);
  let [long, setLong] = useState(77.947998);
  let zoom = 7;
  const [query, setQuery] = useState("");
  const [address, setAddress] = useState();
  const [isDropDownOn, setIsDropDownOn] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://heroku-backend-hackathone.herokuapp.com/api/position/positions"
      )
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=25c4584e1d9a4aa0be85fa89a58ac389`
      )
      .then(function (response) {
        setDetails(response.data.features[0].properties);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [lat, long]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  const filterHandler = () => {
    setIsFilterOn(false);
  };

  const changeHandler = (e) => {
    setIsDropDownOn(true);
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
  const submitHandler = (lat, lon) => {
    setIsDropDownOn(false);
    setLat(lat);
    setLong(lon);
  };

  const center = useMemo(() => ({lat: lat, lng: long}), [lat, long]);
  var yellowPin = "https://i.ibb.co/W6rvv7j/Untitled-design-4-1.png";
  var greenPin = "https://i.ibb.co/HYpPwWx/Untitled-design-5-1.png";

  return (
    <>
      <div>
        <GoogleMap
          zoom={zoom}
          center={center}
          onClick={() => {
            setIsDropDownOn(false);
            setIsFilterOn(false);
          }}
          mapContainerClassName='map-container'>
          <div className='text-center mt-3 parent'>
            <input
              type='text'
              className='map1'
              onChange={changeHandler}
              placeholder='Search place'
              onClick={() => setIsDropDownOn(true)}
            />
            <div className='add mt-2' style={{backgroundColor: "white"}}>
              {isDropDownOn &&
                address?.map((d, i) => {
                  return (
                    <p
                      key={i}
                      onClick={() => {
                        submitHandler(d.properties.lat, d.properties.lon);
                        setQuery(null);
                      }}
                      style={{
                        cursor: "pointer",
                        color: "black",
                      }}>
                      <MdLocationPin style={{color: "#A60D0D"}} />
                      {d.properties.formatted}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className='filter-pa'>
            {isFilterOn && (
              <div className='filter-model'>
                <img
                  src={require("../commonPages/166171.jpg")}
                  height='auto'
                  width='100%'
                  alt='logo'
                  style={{borderRadius: "10px 10px 0 0"}}
                />

                <AiOutlineClose
                  className='cursor-pointer'
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 5,
                    pointer: "cursor",
                  }}
                  onClick={filterHandler}
                />
                <div className='text-center mt-3'>
                  <h4>{details.address_line1}</h4>
                  <h6 className='mt-3 px-3'>
                    <MdLocationPin style={{color: "#A60D0D"}} />
                    {details.address_line2}
                  </h6>
                </div>
              </div>
            )}
          </div>
          <MarkerF position={center} />
          {data?.map((a, i) => {
            return (
              <MarkerF
                key={i}
                position={{
                  lat: parseFloat(a.latitude),
                  lng: parseFloat(a.longitude),
                }}
                icon={a.isWorking ? greenPin : yellowPin}
                onClick={() => {
                  setLat(a.latitude);
                  setLong(a.longitude);
                  setIsFilterOn(!isFilterOn);
                }}
              />
            );
          })}
        </GoogleMap>
      </div>
    </>
  );
}

export default MapContainer;
