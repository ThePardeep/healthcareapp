const Router = require("express").Router();
const DailyCasesSchema = require("../Schema/DailyCases.js");
const StateDailyCases = require("../Schema/stateDailyCases");
const axios = require("axios");
const DistrictDataSchema = require("../Schema/District");
const passport = require("passport");
/*
ROUTE_NAME : '/insert/daily'
TYPE : POST
DESC : Insert Daily Cases
*/

Router.post(
  "/insert/daily",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const refresh = req.body.refresh;

    if (refresh) {
      DailyCasesSchema.find()
        .then((previousData) => {
          axios
            .get("https://api.covid19india.org/data.json")
            .then((result) => {
              if (result.status == 200) {
                let data = [];
                let i;

                data = result.data.cases_time_series;

                if (data.length == previousData.length) {
                  res.status(200).json({
                    error: false,
                    msg: "New Record Not Found",
                  });
                  return;
                }

                let newDailyRecord = [];
                newDailyRecord = getDailyRecord(previousData.length, data);
                //Insert New Record

                DailyCasesSchema.insertMany(newDailyRecord, {
                  ordered: false,
                })
                  .then((data) => {
                    if (data.length > 0) {
                      res.status(200).json({
                        error: false,
                        msg: "Data inserted Successfully",
                      });
                    }
                  })
                  .catch((err) => {
                    res.status(200).json({
                      error: true,
                      msg: "unable to insert data",
                    });
                    throw err;
                  });
                return;
              }
            })
            .catch((err) => {
              res.status(200).json({
                error: true,
                msg: "unable to insert data",
              });
              throw err;
            });
        })
        .catch((err) => {
          res.status(200).json({
            error: true,
            msg: "unable to insert data",
          });
          throw err;
        });
    } else {
      res.status(200).json({
        error: true,
        msg: "unable to insert data",
      });
    }
  }
);

/*
ROUTE_NAME : '/insert/state/daily'
TYPE : 
DESC : Insert Daily Cases
*/

Router.post(
  "/insert/state/daily",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    StateDailyCases.find()
      .then((previousData) => {
        axios
          .get("https://api.covid19india.org/data.json")
          .then((result) => {
            if (result.status == 200) {
              let data = [];
              let i;

              data = result.data.statewise;

              if (data.length == previousData.length) {
                res.status(200).json({
                  error: false,
                  msg: "New Record Not Found",
                });
                return;
              }

              let newDailyStateRecord = [];
              newDailyStateRecord = getDailyStateRecord(
                previousData.length,
                data
              );
              //Insert New Record

              StateDailyCases.insertMany(newDailyStateRecord, {
                ordered: false,
              })
                .then((data) => {
                  if (data.length > 0) {
                    res.status(200).json({
                      error: false,
                      msg: "Data inserted Successfully",
                    });
                  }
                })
                .catch((err) => {
                  res.status(200).json({
                    error: true,
                    msg: "unable to insert data",
                  });
                  throw err;
                });
              return;
            }
          })
          .catch((err) => {
            res.status(200).json({
              error: true,
              msg: "unable to insert data",
            });
            throw err;
          });
      })
      .catch((err) => {
        res.status(200).json({
          error: true,
          msg: "unable to insert data",
        });
        throw err;
      });
  }
);

/*
ROUTE_NAME : '/update/state/daily'
TYPE : 
DESC : Update Daily Cases
*/

Router.post(
  "/update/state/daily",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body.refresh) {
      axios
        .get("https://api.covid19india.org/data.json")
        .then((result) => {
          const data = result.data.statewise;
          for (let i = 0; i < data.length; i++) {
            const element = {
              Active: data[i]["active"],
              Confirmed: data[i]["confirmed"],
              Deaths: data[i]["deaths"],
              deltaConfirmed: data[i]["deltaconfirmed"],
              deltaDeaths: data[i]["deltadeaths"],
              deltaRecovered: data[i]["deltarecovered"],
              lastUpdatedTime: data[i]["lastupdatedtime"],
              Recovered: data[i]["recovered"],
              State: data[i]["state"],
              StateCode: data[i]["statecode"],
              stateNotes: data[i]["statenotes"],
            };

            StateDailyCases.updateOne(
              { State: element.State },
              { $set: element }
            )
              .then((updatedData) => {})
              .catch((err) => {});
          }
          res.json({
            msg: "successfully updated",
            error: false,
          });
        })
        .catch((err) => {
          res.status(200).json({
            error: true,
            msg: "unable to update data",
          });
          throw err;
        });
    } else {
      res.status(200).json({
        error: true,
        msg: "unable to update data",
      });
    }
  }
);

const getDailyRecord = (previousDataLength, data) => {
  const newRecord = [];
  for (i = previousDataLength; i < data.length; i++) {
    newRecord.push({
      dailyConfirmed: data[i]["dailyconfirmed"],
      dailyDeceased: data[i]["dailydeceased"],
      dailyRecovered: data[i]["dailyrecovered"],
      date: data[i]["date"],
      totalConfirmed: data[i]["totalconfirmed"],
      totalDeceased: data[i]["totaldeceased"],
      totalRecovered: data[i]["totalrecovered"],
    });
  }
  return newRecord;
};

const getDailyStateRecord = (previousDataLength, data) => {
  const newRecord = [];
  for (i = previousDataLength; i < data.length; i++) {
    newRecord.push({
      Active: data[i]["active"],
      Confirmed: data[i]["confirmed"],
      Deaths: data[i]["deaths"],
      deltaConfirmed: data[i]["deltaconfirmed"],
      deltaDeaths: data[i]["deltadeaths"],
      deltaRecovered: data[i]["deltarecovered"],
      lastUpdatedTime: data[i]["lastupdatedtime"],
      Recovered: data[i]["recovered"],
      State: data[i]["state"],
      StateCode: data[i]["statecode"],
      stateNotes: data[i]["statenotes"],
    });
  }
  return newRecord;
};

/*
ROUTE_NAME : '/get/dailycases'
TYPE : GET
DESC : GET DAILY COVID19 CASES
*/

Router.get("/get/daily/cases", (req, res) => {
  DailyCasesSchema.find()
    .then((cases) => {
      res.status(200).json({
        error: false,
        cases,
      });
    })
    .catch((err) => {
      res.status(200).json({
        error: true,
        msg: "Unable To Fetch Cases",
      });
      throw err;
    });
});

/*
ROUTE_NAME : '/get/cases/statewise'
TYPE : GET
DESC : GET DAILY COVID19 CASES StateWise
*/

Router.get("/get/cases/statewise", (req, res) => {
  StateDailyCases.find()
    .then((cases) => {
      res.status(200).json({
        error: false,
        cases,
      });
    })
    .catch((err) => {
      res.status(200).json({
        error: true,
        msg: "Unable To Fetch Cases",
      });
      throw err;
    });
});

/*
ROUTE_NAME : '/insert/district'
TYPE : POST
DESC : Insert COVID19 CASES DistrictWise
*/

Router.post(
  "/insert/district",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    axios
      .get("https://api.covid19india.org/state_district_wise.json")
      .then((result) => {
        const data = result.data;
        let temp = [];
        let DistrictDataArray = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const districtsData = data[key].districtData;

            for (const districtName in districtsData) {
              if (districtsData.hasOwnProperty(districtName)) {
                const districtData = districtsData[districtName];

                temp.push({
                  DistrictName: districtName,
                  Notes: districtData.notes,
                  Active: districtData.active,
                  Confirmed: districtData.confirmed,
                  Deceased: districtData.deceased,
                  Recovered: districtData.recovered,
                  Delta: {
                    Confirmed: districtData.delta.confirmed,
                    Deceased: districtData.delta.deceased,
                    Recovered: districtData.delta.recovered,
                  },
                });
              }
            }

            DistrictDataArray.push({
              State: key,
              Districts: Array.from(temp),
            });
            temp = [];
          }
        }
        DistrictDataSchema.insertMany(DistrictDataArray)
          .then((result) => {
            res.status(200).json({
              error: false,
              districtsData: result,
            });
          })
          .catch((err) => {
            res.status(200).json({
              error: false,
              msg: "Unable To Insert Cases",
            });
            throw err;
          });
      })
      .catch((err) => {
        res.status(200).json({
          error: true,
          msg: "Unable To Insert Cases",
        });
        throw err;
      });
  }
);

/*
ROUTE_NAME : '/get/cases/state/districts'
TYPE : POST
DESC : Get All Cases Of Particular State
*/

Router.post("/get/cases/state/districts", (req, res) => {
  const state = req.body.state;

  if (state == "undefined" || state == "") {
    res.status(200).json({
      error: true,
      msg: "Unable To Fetch Cases Provide Correct State",
    });
    return;
  }

  StateDailyCases.find({ State: state }).then((stateData) => {
    if (stateData.length == 0) {
      res.status(200).json({
        error: true,
        msg: "State Not Found",
      });
      return;
    }

    DistrictDataSchema.find({ State: state })
      .then((districtData) => {
        res.status(200).json({
          error: false,
          stateData,
          districtData,
        });
      })
      .catch((err) => {
        res.status(200).json({
          error: true,
          msg: "Unable To Fetch Cases",
        });
        throw err;
      })
      .catch((err) => {
        res.status(200).json({
          error: true,
          msg: "Unable To Fetch Cases",
        });
        throw err;
      });
  });
});

/*
ROUTE_NAME : '/update/district'
TYPE : POST
DESC : Update COVID19 CASES DistrictWise
*/

Router.post(
  "/update/district/cases",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    axios
      .get("https://api.covid19india.org/state_district_wise.json")
      .then((result) => {
        const data = result.data;
        let temp = [];
        let DistrictDataArray = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const districtsData = data[key].districtData;

            for (const districtName in districtsData) {
              if (districtsData.hasOwnProperty(districtName)) {
                const districtData = districtsData[districtName];

                temp.push({
                  DistrictName: districtName,
                  Notes: districtData.notes,
                  Active: districtData.active,
                  Confirmed: districtData.confirmed,
                  Deceased: districtData.deceased,
                  Recovered: districtData.recovered,
                  Delta: {
                    Confirmed: districtData.delta.confirmed,
                    Deceased: districtData.delta.deceased,
                    Recovered: districtData.delta.recovered,
                  },
                });
              }
            }

            DistrictDataArray.push({
              State: key,
              Districts: Array.from(temp),
            });
            temp = [];
          }
        }

        DistrictDataArray.map((val, index) => {
          DistrictDataSchema.updateOne(
            {
              State: val.State,
            },
            { $set: { Districts: val.Districts } }
          )
            .then((u) => {})
            .catch((err) => {});
        });
        res.status(200).json({
          msg: "SuccessFully Update Data",
          error: false,
        });
      })
      .catch((err) => {
        res.status(200).json({
          error: true,
          msg: "Unable To Insert Cases",
        });
        throw err;
      });
  }
);

module.exports = Router;
