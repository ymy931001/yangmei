import React, { Component } from 'react';
import './tscook.css';

export default class Consumer extends Component {
  state = {
  }
  componentDidMount = () => {
    document.title = "泰顺县广和农业开发有限公司—让数据说话";
    this.setState({
      cookTime: localStorage.getItem('cookTime'),
      cookName: localStorage.getItem('cookName'),
      identification: localStorage.getItem('cookIden'),
      introduction: localStorage.getItem('cookIntroduction'),
      cookImg: localStorage.getItem('cookImg'),
      cookInfoImg: localStorage.getItem('cookInfoImg'),
    });
  }

  render() {
    return (
      <div id="tscook">
        <div className="Cook-body">
          <div className="address css12594a6bbd1d0b6">实景炒制</div>
          <div className="clearfix">
            <div className="Cook-text">
              <img src={this.state.cookImg} alt="pic" />
              <div className="cook-top">
                <span className="cook-author css12594a6bbd1d0b6">{this.state.cookName}</span>
                <span className="cook-time css12594a6bbd1d0b6">{this.state.identification}</span></div>
              <div className="Cook-introduction css12594a6bbd1d0b6">{this.state.introduction}</div>
            </div>
          </div>
          <div className="Cook-img">
            <img className="Cook-imgimg" src={this.state.cookInfoImg} alt="pic" />
            <div className="Cook-imgtext css12594a6bbd1d0b6">{this.state.cookTime}<span>为您炒制出您手中的茶叶</span></div>
          </div>
        </div>
      </div>
    )
  }
}