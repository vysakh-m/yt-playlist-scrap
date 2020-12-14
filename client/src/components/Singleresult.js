import React, { Component } from "react";
import "./style/singleresult.css";
import Eachitem from "./Eachitem";

export default class Singleresult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.location.state,
    };
    this.listVideo = this.listVideo.bind(this);
  }

  listVideo() {
    var rows = [];
    for (var i = 0; i < this.state.data.video.length; i++) {
      rows.push(<Eachitem key={i} data={this.state.data.video[i]} />);
    }
    console.log(rows);
    return <div>{rows}</div>;
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        <div className="container">
          <div className="whitewash">
            <div class="thumbtitle">
              <img
                src={this.state.data.generic.thumbnail}
                width="320"
                height="180"
                alt="Thumbnail"
              />
              <h3 class="pltitle">{this.state.data.generic.title}</h3>
            </div>
            <div className="p-5">
              <div>
                <h5>Generic Data</h5>
                <p>
                  <b>No. of Videos </b> :{" "}
                  <span>{this.state.data.generic.count}</span>
                </p>
                <p>
                  <b>Playlist Description</b> :{" "}
                  <span>{this.state.data.generic.desc}</span>
                </p>
              </div>
              <h5>Video-related Data</h5>
              {/* Loop Starts */}
              {this.listVideo()}
              {/* Loop Ends */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
