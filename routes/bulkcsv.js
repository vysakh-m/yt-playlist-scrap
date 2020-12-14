const csvtojson = require("csvtojson");
const MainModel = require("../models/main");
const CsvModel = require("../models/csv");
const axios = require("axios");

module.exports = function (file) {
  csvtojson()
    .fromFile("csvfile.csv")
    .then((csvData) => {
      csvData.forEach((item) => {
        axios
          .post("http://localhost:4000/main/yt-playlist", {
            data: item["Playlist ID"],
          })
          .then((response) => {
            console.log(response.data);
          });
        temp1 = item["Playlist Link"];
        temp2 = item["Playlist ID"];
        delete item["Playlist Link"];
        delete item["Playlist ID"];
        item["Playlist_Link"] = temp1;
        item["Playlist_ID"] = temp2;
        var csvData = new CsvModel(item);
        csvData.save(function (err) {
          if (err) throw err;
          console.log("SAVED");
        });
      });
    });
  console.log(file);
};
