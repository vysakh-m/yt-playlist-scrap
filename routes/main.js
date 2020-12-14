const express = require("express");
const router = express();
const axios = require("axios");
var validUrl = require("valid-url");

const MainModel = require("../models/main");

//====================STEP 1=====================

var generic_data = {};
var video_final_data = [];

//HELPER Function
var toNormalDuration = (data) => {
  temp = data.slice(2).split(/[HMS]/);
  temp = temp.filter((item) => item != "");
  temp = temp.map((item) => (item.length == 1 ? (item = "0" + item) : item));
  final = temp.join(":");
  return final;
};

var finalAxios = async function (load) {
  for (var i = 0; i < load.length; i++) {
    var video_data = {
      title: load[i].snippet.title,
      url:
        "https://www.youtube.com/watch?v=" + load[i].snippet.resourceId.videoId,
      id: load[i].snippet.resourceId.videoId,
      desc: load[i].snippet.description,
      thumbnail: load[i].snippet.thumbnails.default.url,
    };

    //for video duration, another API call was required
    await axios
      .get(
        "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=" +
          load[i].snippet.resourceId.videoId +
          "&key=AIzaSyDBGx3Qw0n2mkHY0HJ4m_9UVeG_434tsGY"
      )
      .then(async (response2) => {
        video_data["length"] = toNormalDuration(
          response2.data.items[0].contentDetails.duration
        );
        video_final_data.push(video_data);
      });
  }
  return video_final_data;
};

// ===============================================================

router.post("/yt-playlist", (req, res) => {
  var id = "";
  var data = req.body.data;
  if (validUrl.isUri(data)) {
    id = data.split("=")[1];
  } else {
    id = data;
  }
  // GENERIC DATA
  axios
    .get(
      "https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=" +
        id +
        "&key=AIzaSyDBGx3Qw0n2mkHY0HJ4m_9UVeG_434tsGY"
    )
    .then(async (response) => {
      generic_data = {
        title: response.data.items[0].snippet.localized.title,
        desc: response.data.items[0].snippet.localized.description,
        thumbnail: response.data.items[0].snippet.thumbnails.medium.url,
      };
      //VIDEO DATA

      await axios
        .get(
          "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=100&playlistId=" +
            id +
            "&key=AIzaSyDBGx3Qw0n2mkHY0HJ4m_9UVeG_434tsGY"
        )
        .then(async (response1) => {
          generic_data["count"] = parseInt(
            response1.data.pageInfo.totalResults
          );
          var load = response1.data.items;
          video_final = await finalAxios(load);
          var final_entry = new MainModel({
            generic: generic_data,
            video: video_final,
          });
          final_entry.save(function (err) {
            if (err) throw err;
            // saved!
            console.log("SAVED");
          });

          return res.json({
            generic: generic_data,
            video: video_final,
          });
        });
    });
});

router.get("/list", (req, res) => {
  MainModel.find({}).then((result) => {
    return res.json(result);
  });
});

module.exports = router;
