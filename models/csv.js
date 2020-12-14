const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const csvSchema = new Schema({
  Title: {
    type: String,
  },
  Level: {
    type: String,
  },
  Language: {
    type: String,
  },
  Instructor: {
    type: String,
  },
  Quality: {
    type: String,
  },
  Category: {
    type: String,
  },
  Subcategory: {
    type: String,
  },
  Subject: {
    type: String,
  },
  Playlist_Link: {
    type: String,
  },
  Playlist_ID: {
    type: String,
  },
});

module.exports = csv = mongoose.model("csv", csvSchema);
