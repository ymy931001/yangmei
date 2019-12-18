import React, { Component } from 'react';
import { Flex, Button, InputItem, Toast, WhiteSpacem, Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import { getInfoForConumer, fake } from "../axios";
import './Consumer.css';
import './taishun.css';
import './ym.css';
import * as echarts from 'echarts';
import { generateGetCodeUrl } from '../util';
import URI from 'urijs';
const requestIp = require('../axios/config.js');

export default class Consumer extends Component {
  state = {
    data: ['1', '2', '3'],
    datas: ['1', '2', '3', '4', '5', '6'],
    jsdata: ['1', '2', '3', '4', '5', '6'],
    imgHeight: 160,
  }
  componentDidMount = () => {
    //http://test.terabits-wx.cn/consumer?teaID=my7xmz3_v0&code=001ReeN60gaOVB1mpiK60d1ZM60ReeNS&state=
    let url = window.location.href;
    url = url.split('=', 2);
    let urll = url[1];
    urll = urll.split('&', 2);
    let teaidnum = urll[0];
    let teaid = urll[0].slice(0, 9);

    getInfoForConumer([
      teaid
    ]).then(res => {
      console.log(teaid)
      console.log(res.data.teaInfo.teaType)
      if (!res.data.success) {
        const nothingdiv = (
          <div className="Consumer-nothingbox">
            <img src={require('./nothing.png')} style={{ width: "2rem", marginTop: "2rem" }} alt="nothing" />
            <p>您扫描的二维码是无效二维码</p>
          </div>
        );
        this.setState({ nothingdiv });
      }
      else {
        this.setState({
          cookTime: res.data.teaInfo.cookInfo.cookTime,
          packTime: res.data.teaInfo.packInfo.packTime,
          pickTime: res.data.teaInfo.pickInfo.pickTime,
        })
        const uri = new URI(document.location.href);
        const query = uri.query(true);
        const { code } = query;
        if (code) {
          let leturi = new URI(document.location.href);
          let letquery = uri.query(true);
          let { letcode } = query;
          let localcount = localStorage.getItem('count');
          let _this = this;

          let data = res.data;
          let garden = res.data.teaInfo.gardenInfo;
          let pick = res.data.teaInfo.pickInfo;
          let teaType = res.data.teaInfo.teaType;
          let cook = res.data.teaInfo.cookInfo;

          let pm25 = garden.details.PM25;
          let light = garden.details.light;
          let pmtext = '优';
          let lighttext = '优';
          var temArray = [[1, 5.55], [2, 3.44], [3, 2.44], [4, 6.43], [5, 6.45], [6, 6.22], [7, 7.34], [8, 7.65], [9, 6.33], [10, 6.87]];
          var mosArray = [[1, 16.5], [2, 17.3], [3, 17.4], [4, 19.3], [5, 18.5], [6, 17.3], [7, 16.9], [8, 17.4], [9, 18.5], [10, 19.2]];

          let tag = '钛比科技';
          if (teaType === "龙井") {
            tag = '竺顶茶业';
          } else if (teaType === "径山") {
            tag = '径山茶业';
          } else if (teaType === "杜家杨梅") {
            tag = '杜家杨梅';
          }

          if (teaType === "杜家杨梅") {
            console.log(!localcount)
            if (!localcount) {
              if (localcount !== '0') {
                Toast.fail(`已有${localcount}人扫描过该二维码，欢迎选购所前杜家杨梅。`, 7, null, false);
              }
              else {
                Toast.success(`您是首位扫描该二维码的消费者，${tag}基于区块链技术为您提供正品保障。`, 5, null, false);
              }
            }
            else {
              console.log(777)
              fake([
                teaidnum,
                code,
                'wxdc0c08cd48fbb65b'
              ]).then(response => {
                if (response.data.count !== 0 && response.data.count !== undefined) {
                  Toast.fail(`已有${response.data.count}人扫描过该二维码，欢迎选购所前杜家杨梅。`, 7, null, false);
                }
                else {
                  Toast.success(`您是首位扫描该二维码的消费者，${tag}基于区块链技术为您提供正品保障。`, 5, null, false);
                }
                localStorage.setItem('count', response.data.count);
              });
            }
          }




          if (parseFloat(pm25) > parseFloat(100) || parseFloat(pm25) < parseFloat(0)) {
            pm25 = '17.34';
            if (parseFloat(pm25) > 50) {
              pmtext = '良';
            }
          }
          if (parseFloat(light) > parseFloat(100000) || parseFloat(light) < parseFloat(1000)) {
            light = '32356.73';
            if (parseFloat(light) < 5000) {
              lighttext = '良';
            }
          }
          //温湿度数据合法标志
          var flag = true;
          for (let i = 0; i < garden.details.soilInfo.length; i++) {
            let temdata = garden.details.soilInfo[i]['temperature'];
            let mosdata = garden.details.soilInfo[i]['mositure'];
            if ((parseFloat(temdata) > parseFloat(35)) || (parseFloat(temdata) < parseFloat(0)) || (parseFloat(mosdata) > parseFloat(80)) || (parseFloat(mosdata) < parseFloat(5))) {
              flag = false;
            }
          }
          if ((garden.details.soilInfo.length == 10 && flag)) {
            temArray = [];
            mosArray = [];
            let data = garden.details.soilInfo;
            for (let i = 0; i < 8; i++) {
              let tem = [i + 1, garden.details.soilInfo[i]['temperature']];
              let mos = [i + 1, garden.details.soilInfo[i]['mositure']];
              temArray.push(tem);
              mosArray.push(mos);
            }
          }
          if (teaType === "杜家杨梅") {
            document.title = "杜家村杨梅—让数据说话";
            this.setState({
              content: <div style={{ width: '100%' }} id="ym_body">
                <div className="banner">
                  <img src={require('./bannerym.png')} />
                </div>
                <div className="section">
                  <div className="sub-title css12594a6bbd1d0b6">杜家村杨梅</div>
                  <div className="sub-title1 css12594a6bbd1d0b6">全球唯一追溯ID: <span>{data.teaInfo.teaID}</span></div>
                  <WingBlank>
                    <Carousel className="space-carousel"
                      frameOverflow="visible"
                      cellSpacing={10}
                      slideWidth={0.5}
                      autoplay
                      dots={false}
                      infinite
                      afterChange={index => this.setState({ slideIndex: index })}
                    >
                      {this.state.data.map((val, index) => (
                        <span>
                          <img
                            src={require(`./ymimg/${val}.jpg`)}
                            alt=""
                            style={{ width: '47%', verticalAlign: 'top' }}
                            onLoad={() => {
                              // fire window resize event to change height
                              window.dispatchEvent(new Event('resize'));
                              this.setState({ imgHeight: 'auto' });
                            }}
                          />
                          <img
                            src={require(`./ymimg1/${val}.jpg`)}
                            alt=""
                            style={{ width: '47%', verticalAlign: 'top', marginLeft: '6%' }}
                            onLoad={() => {
                              // fire window resize event to change height
                              window.dispatchEvent(new Event('resize'));
                              this.setState({ imgHeight: 'auto' });
                            }}
                          />
                        </span>
                      ))}
                    </Carousel>
                  </WingBlank>
                  <div className="sub-content css12594a6bbd1d0b6">
                    由于杜家村山体条件优越，以青化山作为种植杨梅的天然屏障所形成的小气候，优质的条件所致杜家杨梅的独特风味，杜家杨梅又可分为早色和迟色两个品种， 其中迟色乃精品中的精品!杜家杨梅不仅鲜美可口，而且营养丰富。萧山栽培杨梅已有近千年历史。它含有蛋白质、糖类、果酸、钙、铁，以及多种维生素。此外，还有广泛的药用价值，能生津止咳，帮助消化，益肾利尿，去暑解闷。萧山民间有“桃子吃出病，杨梅来治病”的说法。杨梅除了鲜食，还可晒干，酿酒，制成蜜饯、果酱等。
                </div >
                </div>
                <div className="section1">
                  <div className="sub-title5 css12594a6bbd1d0b6">您手中的杨梅来自于</div>
                  <div className="comefrom">
                    <div className="map">
                      <img
                        className="mapimg"
                        src={require('./map3.png')}
                        alt=""
                        onLoad={() => {
                          window.dispatchEvent(new Event('resize'));
                          this.setState({ imgHeight: 'auto' });
                        }}
                      />
                    </div>
                    <div className="map-right">
                      <div style={{ fontSize: '0.22rem', marginBottom: '0.1rem', textAlign: 'center' }} className="css12594a6bbd1d0b6">{garden.name}</div>
                      <div style={{ textAlign: 'center', fontSize: '0.19rem' }} className="css12594a6bbd1d0b6">东经：{garden.details.latitude} 北纬：{garden.details.longitude}</div>
                      <div className="map-text css12594a6bbd1d0b6">
                        杜家村位于萧山市所前镇东南面，距城区12公里。坐落在青化山东麓的山坞中。村落三面环山，座南朝北。村区北和郑家、传芳村接壤，南面翻过石门岭与进化镇石门王村交界，东至郑家村的山林，西又和传芳村隔山相连。
                        杜家村原属绍兴县进化区崇越乡，是浙江省著名特产杜家杨梅的产地。
                      </div>
                    </div>
                    <div style={{ fontSize: "0.19rem", float: 'left', width: '96%', lineHeight: '.265rem', marginTop: '.05rem' }}>
                      杜家杨梅据南宋《嘉泰会稽志》记载：天乐杜家杨梅产此有名，世称“杜家杨梅”。明代五象晋《群芳谱》有“杨梅会稽产者天下冠”之评，由于杜家杨梅产区坐落在会稽山余脉青化山的北麓，古称为会稽郡，由此可见杜家杨梅栽培。历史已闻名已久。1958年中央粟裕大将以及1960年铁道部长滕代远先后来我村视察杨梅发展概况,1981年在全省特产水果中被评为早熟第一名；2002年被省农业厅评为杨梅精品；2003年被评为精品杨梅优胜奖，2004年被农业部授予杜家杨梅无公害农产品标志，2005年被授予杜家杨梅原产地地理标志。目前，杜家杨梅已由发展鼎盛期转入科学栽培期，从而由量到质的一个发展过程。</div>
                  </div>
                </div>
                <div className="pick1">
                  <img src={require('./ympick1.png')} style={{ width: '100%', height: '3.07rem', verticalAlign: 'top', float: 'left', }} />
                </div>
                <div className="sub-title3 css12594a6bbd1d0b6" >手工采摘品质保证</div>
                <div className="sub-content css12594a6bbd1d0b6"
                >杜家杨梅以采摘细嫩著称,全程人工采摘，确保杨梅的品质的最优化，也避免机器采摘中对杨梅本身的损害，并通过人工的筛选，将品质不符合要求的杨梅提前去除，
                确保消费者买到的杨梅品质最优。</div>
                <div className="pick2">
                  <img src={require('./ympack.png')} style={{ width: '100%', height: '2.73rem', float: 'left', }} />
                </div>
                <div className="sub-title3 css12594a6bbd1d0b6">用科技包裹风味与质量</div>
                <div className="sub-content css12594a6bbd1d0b6"
                >杜家杨梅采用实用新型上盒体与下盒体包装，上盒体和下盒体内均设置有弹性定位片，使杨梅能在盒体内隔开固定并在运输的过程中能避免震动造成的损坏、
                有效的保证盒体内气体的循环，保证盒体内杨梅的通气性，从而提高杨梅运输过程中质量的保证。</div>

                <div className="section3">
                  <div className="sub-title2 css12594a6bbd1d0b6">让数据为杜家杨梅发声</div>
                  <Flex justify="center" direction="column" >
                    <Flex justify="center">
                      <div className="Consumer-dataimg css12594a6bbd1d0b6"><span className="pm-data">{pmtext}</span></div>
                      <div className="Consumer-data mt3">
                        <div className="data-title css12594a6bbd1d0b6" >PM2.5：<span style={{ fontSize: '.22rem' }}>{pm25}</span><span style={{ fontSize: '.22rem' }}>𝜇𝑔/𝑚<sup>3</sup></span>
                        </div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          PM2.5是衡量杨梅园空气质量和生态水平的重要参数，良好的空气质量将使杨梅的氨基酸和水浸出物含量维持在适宜水平，保证杨梅口感和滋味的醇正。
                      </div>
                      </div>
                    </Flex>
                    <Flex justify="center">
                      <div className="Consumer-dataimg"><span className="light-data">{lighttext}</span></div>
                      <div className="Consumer-data mt2">
                        <div className="data-title css12594a6bbd1d0b6">光照：<span>{light}</span><span>𝑙𝑥</span></div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          适宜、充足的光照可以促进光合产物的形成，使杨梅树生长更加茁壮，同时也会影响杨梅中咖啡碱的含量，令杨梅品质更佳。
                      </div>
                      </div>
                    </Flex>
                    <Flex justify="center">
                      <div className="Consumer-dataimg" id="tem-chart">
                      </div>
                      <div className="Consumer-data mt4">
                        <div className="data-position css12594a6bbd1d0b6">数据点/3天</div>
                        <div className="data-title css12594a6bbd1d0b6">土壤温度</div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          适宜的土壤温度能够促进土壤的呼吸作用，使杨梅树获得更多营养、健康成长。
                      </div>
                      </div>
                    </Flex>
                    <Flex justify="center">
                      <div className="Consumer-dataimg" id="hum-chart">

                      </div>
                      <div className="Consumer-data mt1">
                        <div className="data-position1 css12594a6bbd1d0b6">数据点/3天</div>
                        <div className="data-title css12594a6bbd1d0b6">土壤湿度</div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          土壤湿度是影响杨梅树生长速度的关键因素，适宜的土壤湿度可以将杨梅中的氨基酸含量维持在适宜水平，使杨梅口感更加鲜爽。
                      </div>
                      </div>
                    </Flex>
                  </Flex>
                </div>
                <div className="section4">
                  <div className="Consumer-bottombar css12594a6bbd1d0b6" style={{ fontSize: '.28rem', lineHeight: '.5rem' }}>
                    <img src={require('./ymlogo.png')} alt="logo" style={{ width: ".5rem", height: '.5rem' }} />
                    杜家杨梅
                 </div>
                  <div className="Consumer-bottombar css12594a6bbd1d0b6" style={{ fontSize: '.28rem', lineHeight: '.5rem' }}>技术保障：杭州移动 浙江大学</div>
                  <div className="Consumer-bottombar css12594a6bbd1d0b6" style={{ fontSize: '.28rem', lineHeight: '.5rem' }}>实施单位：钛比科技  </div>
                </div>
              </div>
            });
          }
          localStorage.setItem('cookIntroduction', cook.introduction);
          localStorage.setItem('cookTime', cook.cookTime);
          localStorage.setItem('cookName', cook.name);
          localStorage.setItem('cookIden', cook.identification);
          localStorage.setItem('cookImg', requestIp.requestIp + cook.cookImage);
          localStorage.setItem('cookInfoImg', requestIp.requestIp + cook.cookInfoImage);
          localStorage.setItem('pickTime', pick.pickTime);
          if (pick.pickInfoImage === "" || pick.pickInfoImage === null) {
            localStorage.setItem('pickImg', 'http://maoyang.terabits.cn/null.png');
          } else {
            localStorage.setItem('pickImg', requestIp.requestIp + pick.pickInfoImage);
          }

          localStorage.setItem('gardenName', garden.name);

          echarts.init(document.getElementById('hum-chart')).setOption({
            color: '#FFD910',
            xAxis: {
              name: '',
              nameLocation: 'center',
              nameGap: 13,

              nameTextStyle: {
                fontSize: 12,
              },
              axisLabel: {
                show: true,
                fontSize: 12,
                margin: 4,
              },
              splitLine: {
                show: false,
              },
              min: 1,
              silent: true,
            },
            yAxis: {
              name: '湿度/%',
              nameLocation: 'end',
              nameGap: 13,
              nameTextStyle: {
                fontSize: 12,
              },
              axisLabel: {
                show: true,
                fontSize: 12,
                margin: 4,
              },
              splitLine: {
                show: false,
                interval: 2,
              },
              min: function (value) {
                return value.min - 0.5;
              },
              max: function (value) {
                return value.max + 0.5;
              },
              silent: true,
            },
            grid: {
              show: false,
              left: 20,
              right: 10,
              bottom: 25,
              top: 25,
            },
            series: [{
              type: 'line',
              smooth: false,
              data: mosArray
            }]
          });
          //温度曲线图
          echarts.init(document.getElementById('tem-chart')).setOption({
            color: '#FFD910',
            xAxis: {
              name: '',
              nameLocation: 'center',
              nameGap: 13,
              nameTextStyle: {
                fontSize: 12,
              },
              axisLabel: {
                show: true,
                fontSize: 12,
                margin: 4,
              },
              splitLine: {
                show: false,
              },
              min: 1,
              silent: true,
            },
            yAxis: {
              name: '温度/℃',
              nameLocation: 'end',
              nameGap: 13,
              nameTextStyle: {
                fontSize: 12,
              },
              axisLabel: {
                show: true,
                fontSize: 12,
                margin: 7,
              },
              splitLine: {
                show: false,
                interval: 2,
              },
              min: function (value) {
                return value.min - 0.5;
              },
              max: function (value) {
                return value.max + 0.5;
              },
              silent: true,
            },
            grid: {
              show: false,
              left: 20,
              right: 10,
              bottom: 25,
              top: 25,
            },
            series: [{
              type: 'line',
              smooth: false,
              data: temArray
            }]
          });
        } else {
          localStorage.removeItem('count');
          document.location = generateGetCodeUrl(document.location.href);
        }
      }
    });


  }


  render() {
    return (
      <div className="Consumer-body">
        <Flex justify="center" direction="column">
          {this.state.nothingdiv}
          {this.state.content}
        </Flex>
      </div>
    )
  }
}
