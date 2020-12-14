import React, { Component } from "react";

export default class Eachitem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }
  render() {
    return (
      <div>
        <div
          style={{
            border: "1px solid black",
            borderRadius: "20PX",
            marginTop: "10px",
          }}
        >
          <div style={{ paddingLeft: "25px" }}>
            <div className="videorelated">
              <img
                src={this.state.data.thumbnail}
                width="120"
                height="90"
                alt="Thumbnail"
              />
              <div style={{ paddingLeft: "20px" }}>
                <p>
                  <b> Video Title</b> : <span>{this.state.data.title}</span>
                </p>
                <p>
                  <b>Video URL</b> : <span>{this.state.data.url}</span>{" "}
                </p>
                <p>
                  <b>Video ID </b>: <span>{this.state.data.id}</span>
                </p>
                <p>
                  <b>Video Length</b> : <span>{this.state.data.length}</span>
                </p>
                <p>
                  <b>Video Description </b>: <span>{this.state.data.desc}</span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
