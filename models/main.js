const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mainSchema = new Schema({
  generic: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  video: [
    {
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
      },
      thumbnail: {
        type: String,
        required: true,
      },
      length: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = main = mongoose.model("main", mainSchema);
