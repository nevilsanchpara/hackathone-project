import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "./Header";
import {BiRupee} from "react-icons/bi";

const History = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(
        "https://heroku-backend-hackathone.herokuapp.com/api/history/getHistory?district=surat"
      )
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <Header />
      <div class='table-responsive'>
        <table class='table'>
          <thead>
            <tr>
              <th>#</th>
              <th>History Id</th>
              <th>StreetLight Id</th>
              <th>Worker ID</th>
              <th>Worker Name</th>
              <th>Issue</th>
              <th>Cost</th>
              <th>Pincode</th>
              <th>Village</th>
              <th>Taluka</th>
              <th>District</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{d.id}</td>
                  <td>{d.streetLightId}</td>
                  <td>{d.workerId}</td>
                  <td>{d.repairedBy}</td>
                  <td>{d.issue}</td>
                  <td>
                    {d.cost} <BiRupee />
                  </td>
                  <td>{d.pincode}</td>
                  <td>{d.village}</td>
                  <td>{d.taluka}</td>
                  <td>{d.district}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default History;
