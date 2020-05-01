const Router = require("express").Router();
const DailyCasesSchema = require("../Schema/DailyCases.js");
const StateDailyCases = require("../Schema/stateDailyCases");
const axios = require("axios");

/*
ROUTE_NAME : '/insert/daily'
TYPE : POST
DESC : Insert Daily Cases
*/

Router.post("/insert/daily", (req, res) => {
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
                  res.status(400).json({
                    error: true,
                    msg: "unable to insert data",
                  });
                  throw err;
                });
              return;
            }
          })
          .catch((err) => {
            res.status(400).json({
              error: true,
              msg: "unable to insert data",
            });
            throw err;
          });
      })
      .catch((err) => {
        res.status(400).json({
          error: true,
          msg: "unable to insert data",
        });
        throw err;
      });
  } else {
    res.status(400).json({
      error: true,
      msg: "unable to insert data",
    });
  }
});

/*
ROUTE_NAME : '/insert/state/daily'
TYPE : 
DESC : Insert Daily Cases
*/

Router.post("/insert/state/daily", (req, res) => {
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

            console.log(data);

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
                res.status(400).json({
                  error: true,
                  msg: "unable to insert data",
                });
                throw err;
              });
            return;
          }
        })
        .catch((err) => {
          res.status(400).json({
            error: true,
            msg: "unable to insert data",
          });
          throw err;
        });
    })
    .catch((err) => {
      res.status(400).json({
        error: true,
        msg: "unable to insert data",
      });
      throw err;
    });
});

/*
ROUTE_NAME : '/update/state/daily'
TYPE : 
DESC : Update Daily Cases
*/

Router.post("/update/state/daily", (req, res) => {
  if (req.body.refresh) {
    StateDailyCases.find()
      .then((previousData) => {
        // console.log(previousData);
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
              );
            }
            res.json({
              update: "success",
              error: false,
            });
          })
          .catch((err) => {
            res.status(400).json({
              error: true,
              msg: "unable to update data",
            });
            throw err;
          });
      })
      .catch((err) => {
        res.status(400).json({
          error: true,
          msg: "unable to update data",
        });
        throw err;
      });
  } else {
    res.status(400).json({
      error: true,
      msg: "unable to update data",
    });
    throw err;
  }
});

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

Router.get("/get/dailycases", (req, res) => {
  DailyCasesSchema.find()
    .then((cases) => {
      res.status(200).json({
        error: false,
        cases,
      });
    })
    .catch((err) => {
      res.status(200).json({
        error: error,
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
        error: error,
        msg: "Unable To Fetch Cases",
      });
      throw err;
    });
});

module.exports = Router;
