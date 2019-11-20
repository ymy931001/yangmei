import React, { Component } from 'react';
import { Flex, Button, InputItem, Toast, WhiteSpace } from 'antd-mobile';
import { getInfoForConumer } from "../axios";
import './Pick.css';

export default class Consumer extends Component {
  state = {
  }
  componentDidMount = () => {
    document.title = "天竺茶园-数据说茶";
    this.setState({
      gardenID: localStorage.getItem('gardenName'),
      pickTime: localStorage.getItem('pickTime'),
      
      img: localStorage.getItem('pickImg'),
    });
  }
  render() {
    return (
      <div className="Pick-body">
        <div className="address">实景采摘地点</div>
        <div className="addId">{this.state.gardenID}</div>
        <div className="pick-picbox">
          <img src={this.state.img}  alt="logo" />
          <div className="pick-imgtext"><span>{this.state.pickTime}</span></div>
        </div>
      </div>
    )
  }
}