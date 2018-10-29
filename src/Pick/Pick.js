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
      <div id="pickbody">
      <div className="Cook-body">   
          <div className="address css12594a6bbd1d0b6">实景采摘地点</div>
          <div className="clearfix pack-main">
            <div className="Cook-text">
              <img src={require('./map.png')} alt="pic" />
              <div className="cook-top css12594a6bbd1d0b6">
              {this.state.gardenID}</div>
              <div className="Cook-introduction css12594a6bbd1d0b6">您手中的茶叶产自于西湖龙井核心产区的灵隐上天竺千年茶园。上天竺是西湖龙井的发源地，北宋高僧辩才法师和苏东坡等文豪曾在此品茗吟诗，为品质绝佳、曾被列为贡品的“狮”字号龙井赋予了浓浓的人文情怀。</div>
            </div>
          </div>
          <div className="Cook-img">
            <img className="Cook-imgimg" src={this.state.img}   alt="pic" />
            <div className="Cook-imgtext css12594a6bbd1d0b6">{this.state.pickTime}<span>实景拍摄于茶园</span></div>
          </div>
      </div>
      </div>
    )
  }
}