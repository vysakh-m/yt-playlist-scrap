import React, { Component } from "react";
import "./style/main.css";
import axios from "axios";
import Spinner from "./extras/Spinner";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      loading: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.normalData = this.normalData.bind(this);
    this.loading = this.loading.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      data: this.state.data,
    };
    this.setState({ loading: true });
    axios.post("/main/yt-playlist", data).then((data) => {
      this.setState({ loading: false });
      this.props.history.push({
        pathname: "/result",
        state: data.data,
      });
    });
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (this.state.loading == false) {
      console.log("False");
    } else {
      console.log("True");
    }
  }

  normalData() {
    return (
      <div class="s003">
        <form onSubmit={this.onSubmit}>
          <div class="inner-form">
            <div class="input-field second-wrap">
              <input
                id="search"
                type="text"
                placeholder="Enter Playlist URL or ID"
                name="data"
                onChange={this.onChange}
                value={this.state.data}
              />
            </div>
            <div class="input-field third-wrap">
              <button class="btn-search" type="submit">
                <svg
                  class="svg-inline--fa fa-search fa-w-16"
                  aria-hidden="true"
                  data-prefix="fas"
                  data-icon="search"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  loading() {
    return (
      <div style={{ backgroundColor: "#fff", height: "100vh" }}>
        <Spinner />
      </div>
    );
  }

  render() {
    return this.state.loading ? this.loading() : this.normalData();
  }
}
