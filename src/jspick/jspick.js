import React, { Component } from 'react';
import { Flex, Button, InputItem, Toast, WhiteSpace } from 'antd-mobile';
import { getInfoForConumer } from "../axios";
import './jspick.css';

export default class Consumer extends Component {
  state = {
  }
  componentDidMount = () => {
    document.title = "杭州径山茶叶有限公司茶园—让数据说话";
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
              <div className="Cook-introduction css12594a6bbd1d0b6">
              您手中的茶叶产自于杭州径山茶叶有限公司的茶叶产自于径山茶核心产区——径山寺山顶西侧的唐代千年历史茶地。径山万寿禅寺雄踞江南禅院“五山十刹”之首，号称“东南第一禅院”。径山灵山毓秀，渌水含英，蕙若暨芝兰并茂，芳苓与瑞树同生。
              </div>
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