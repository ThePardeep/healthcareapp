import React, { useEffect, useState } from "react";
import Axios from "axios";
import { IsLoading } from "../Helper/IsLoading";
export const Hospital = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState({ error: false });
  const [data, setData] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
    const { location } = props.props;
    const search = location.search.split("?");
    if (search.length >= 3) {
      const State = search[1].split("=");
      const District = search[2].split("=");

      if (
        State.length == 2 &&
        State[1] != "" &&
        District.length == 2 &&
        District[1] != ""
      ) {
        Axios.post("/map/get/hospitals", {
          State: State[1].replace(/_/g, " "),
          District: District[1].replace(/_/g, " "),
        })
          .then((res) => {
            setIsLoading(false);
            if (res.data.error) {
              setError(res.data);
              return;
            }

            setData(res.data);
            setHospitals(res.data.hospitals.results);
          })
          .catch((err) => {
            setIsLoading(false);
            setError({
              error: true,
              msg: "unable to fetch data",
            });
          });
      } else {
        window.location = "/";
      }
    } else {
      window.location = "/";
    }
  }, []);

  const MoreUpdate = () => {
    if (data == null) return;
    if (data.next_page_token == null && data.next_page_token == "") {
      return;
    }
    setIsLoading(true);
    Axios.post("/map/get/next/hospitals", {
      nextToken: data.hospitals.next_page_token,
      coordinate: data.coordinate,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.data.error) {
          setError(res.data);
          return;
        }
        setData(res.data);
        setHospitals(res.data.hospitals.results);
      })
      .catch((err) => {
        setIsLoading(false);
        setError({
          error: true,
          msg: "unable to fetch data",
        });
      });
  };

  return (
    <div className="page-container">
      <div className="hos-page">
        <div className="heading">
          <h4>Hospitals</h4>
        </div>
        <div className="hr-style"></div>
        <div className="body" style={{ textAlign: "center" }}>
          {isLoading == true ? (
            <>
              <IsLoading isLoading={isLoading} />
            </>
          ) : (
            <>
              {isError.error == true ? (
                <>
                  <p className="error">{isError.msg}</p>
                </>
              ) : (
                <>
                  {hospitals.map((val) => {
                    return (
                      <div className="ccc">
                        <HospitalCard data={val} key={val.id} />
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
          <div className="more-btn">
            <button btn="btn" onClick={MoreUpdate}>
              More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HospitalCard = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.data != null) {
      const filterData = {
        heading:
          props.data.name.length > 20
            ? props.data.name.substr(0, 20) + ".."
            : props.data.name,
        name: props.data.name,
        address: props.data.vicinity,

        icon: props.data.icon,
      };
      setData(filterData);
    }
  }, []);
  return (
    <div className="card hos-card">
      <div className="hos-card-header">
        <img src={data.icon} alt="hospital-logo" />
        <h4>{data.heading}</h4>
      </div>
      <div className="hr-style"></div>
      <div className="hos-card-body">
        <div className="hos-card-items">
          <div className="item">
            <p>
              <b>Name :</b>
              <i> {data.name}</i>
            </p>
            <p>
              {/* <b>OpenNow :</b> {data.open_now == true ? "Yes" : "No"} */}
            </p>
            <p>
              <b>Address :</b> <i>{data.address}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
