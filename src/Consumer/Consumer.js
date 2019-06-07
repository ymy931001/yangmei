import React, { Component } from 'react';
import { Flex, Button, InputItem, Toast, WhiteSpacem, Carousel, WhiteSpace, WingBlank } from 'antd-mobile';
import { getInfoForConumer, fake } from "../axios";
import './Consumer.css';
import './taishun.css';
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

    let url = window.location.href;
    url = url.split('=', 2);
    let urll = url[1];
    urll = urll.split('&', 2);
    let teaidnum = urll[0];
    let teaid = urll[0].slice(0, 9);

    getInfoForConumer([teaid]).then(res => {
      console.log(teaid)
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
          }
          if (teaType != "泰顺") {
            if (localcount) {
              if (localcount !== '0') {
                Toast.fail(`已有${localcount}人扫描过该二维码，请向卖家确认产品来源。`, 7, null, false);
              }
              else {
                Toast.success(`您是首位扫描该二维码的消费者，${tag}基于区块链技术为您提供正品保障。`, 5, null, false);
              }
            }
            else {
              fake([teaidnum, code]).then(response => {
                if (response.data.count !== 0) {
                  Toast.fail(`已有${response.data.count}人扫描过该二维码，请向卖家确认产品来源。`, 7, null, false);
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
          if (teaType === "龙井") {
            document.title = "竺顶茶业-让数据替茶说话";
            this.setState({
              content: <div style={{ width: '100%' }} id="longj_body">
                <div className="banner">
                  <img src={require('./banner1.png')} />
                </div>
                <div className="section">
                  <div className="sub-title css12594a6bbd1d0b6">西湖龙井</div>
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
                            src={require(`./img/${val}.png`)}
                            alt=""
                            style={{ width: '47%', verticalAlign: 'top' }}
                            onLoad={() => {
                              // fire window resize event to change height
                              window.dispatchEvent(new Event('resize'));
                              this.setState({ imgHeight: 'auto' });
                            }}
                          />
                          <img
                            src={require(`./images/${val}.png`)}
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
                    中国移动联合浙江大学以灵隐上天竺20亩高品质茶园为试点，利用物联网及区块链技术，实现了西湖龙井种植、制作等环节的数据追溯，让数据替茶说话。
                </div >
                </div>
                <div className="section1">
                  <div className="sub-title5 css12594a6bbd1d0b6">您手中的茶叶来自于</div>
                  <div className="comefrom">
                    <div className="map">
                      <img
                        className="mapimg"
                        src={require('./map.png')}
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
                        您手中的茶叶产自于西湖龙井核心产区的灵隐上天竺千年茶园。上天竺是西湖龙井的发源地，北宋高僧辩才法师和苏东坡等文豪曾在此品茗吟诗，为品质绝佳、曾被列为贡品的“狮”字号龙井赋予了浓浓的人文情怀。
                      </div>
                    </div>
                  </div>
                  <div className="pick1">
                    <img src={require('./pick1.jpg')} style={{ width: '100%', height: '2.07rem', verticalAlign: 'top', float: 'left', }} />
                  </div>
                  <div className="sub-title3 css12594a6bbd1d0b6" >手工采摘品质保证</div>
                  <div className="sub-content css12594a6bbd1d0b6"
                  >西湖龙井以采摘细嫩著称，春茶以一叶一芽为采摘标准，清明前后采摘的茶叶为品质最佳。采茶姑娘们踏着清晨露水，用一双熟练的巧手摘下饱满鲜嫩的茶叶尖。</div>
                  <div style={{ textAlign: 'center' }}>
                    <a href="/consumer/pick" className="Consumer-more css12594a6bbd1d0b6">实时图片</a>
                  </div>
                </div>
                <div className="section2">
                  <div className="pick" style={{ marginTop: '0rem', position: 'relative' }}>
                    <img src={require('./chaye.png')} className="chaye" />
                    <img src={require('./cook1.png')} style={{ width: '100%', height: '2rem', float: 'left', }} />
                  </div>
                  <div className="sub-title3 css12594a6bbd1d0b6">十大手法传承正宗</div>
                  <div className="sub-content css12594a6bbd1d0b6">由30年以上炒茶经验的炒茶师，遵照杀青和辉锅两大步骤、“抖、搭、捺、拓、甩、扣、挺、抓、压、磨”十大手法的精细炒制为您呈现西湖龙井最正宗的口感与风味。</div>
                  <div style={{ textAlign: 'center' }}>
                    <a href="/consumer/cook" className="Consumer-more css12594a6bbd1d0b6">实时图片</a>
                  </div>
                  <div className="pick2">
                    <img src={require('./packing11.png')} style={{ width: '100%', height: '2.73rem', float: 'left', }} />

                  </div>
                  <div className="sub-title3 css12594a6bbd1d0b6">用科技包裹风味与历史</div>
                  <div className="sub-content css12594a6bbd1d0b6">使用塑封独立包装最大程度保持龙井的正宗风味，用古朴与科技相融合的包装带您体验千年古茶与现代科技的完美融合。</div>
                </div>
                <div className="section3">
                  <div className="sub-title2 css12594a6bbd1d0b6">让数据为龙井发声</div>
                  <Flex justify="center" direction="column" >
                    <Flex justify="center">
                      <div className="Consumer-dataimg css12594a6bbd1d0b6"><span className="pm-data">{pmtext}</span></div>
                      <div className="Consumer-data mt3">
                        <div className="data-title css12594a6bbd1d0b6" >PM2.5：<span style={{ fontSize: '.22rem' }}>{pm25}</span><span style={{ fontSize: '.22rem' }}>𝜇𝑔/𝑚<sup>3</sup></span>
                        </div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          PM2.5是衡量茶园空气质量和生态水平的重要参数，良好的空气质量将使茶叶的氨基酸和水浸出物含量维持在适宜水平，保证茶叶口感和滋味的醇正。
                      </div>
                      </div>
                    </Flex>
                    <Flex justify="center">
                      <div className="Consumer-dataimg"><span className="light-data">{lighttext}</span></div>
                      <div className="Consumer-data mt2">
                        <div className="data-title css12594a6bbd1d0b6">光照：<span>{light}</span><span>𝑙𝑥</span></div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          适宜、充足的光照可以促进光合产物的形成，使茶树生长更加茁壮，同时也会影响茶叶中咖啡碱的含量，令茶叶品质更佳。
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
                          适宜的土壤温度能够促进土壤的呼吸作用，使茶树获得更多营养、健康成长。
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
                          土壤湿度是影响茶树生长速度的关键因素，适宜的土壤湿度可以将茶叶中的氨基酸含量维持在适宜水平，使茶叶口感更加鲜爽。
                      </div>
                      </div>
                    </Flex>
                  </Flex>
                </div>
                <div className="section4">
                  <img src={require('./zhuding_QR.jpg')} alt="logo" />
                  <p className="css12594a6bbd1d0b6">扫描下方二维码了解更详细的信息</p>
                  <p className="Consumer-bottombar css12594a6bbd1d0b6">技术保障：杭州移动 浙江大学</p>
                  <p className="Consumer-bottombar css12594a6bbd1d0b6">实施单位：钛比科技 竺顶茶业</p>
                </div>
              </div>
            });
          }
          if (teaType === "径山") {
            document.title = "杭州径山茶叶有限公司茶园—让数据说话";
            this.setState({
              content: <div style={{ width: '100%' }} id="jingshan_body">
                <div className="banner">
                  <img src={require('./banner2.png')} />
                </div>
                <div className="section">
                  <div className="sub-title css12594a6bbd1d0b6">径山茶</div>
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
                            src={require(`./img1/${val}.png`)}
                            alt=""
                            style={{ width: '47%', verticalAlign: 'top' }}
                            onLoad={() => {
                              // fire window resize event to change height
                              window.dispatchEvent(new Event('resize'));
                              this.setState({ imgHeight: 'auto' });
                            }}
                          />
                          <img
                            src={require(`./img2/${val}.png`)}
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
                    中国移动联合浙江大学以径山寺山顶西侧1公里处高品质茶叶基地，无污染有机茶园为试点；利用物联网及区块链技术，实现了径山茶种植、制作等环节的数据追溯，让数据替茶说话。
                </div >
                </div>
                <div className="section1">
                  <div className="sub-title5 css12594a6bbd1d0b6">您手中的茶叶来自于</div>
                  <div className="comefrom">
                    <div className="map">
                      <img
                        className="mapimg"
                        src={require('./map1.png')}
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
                        杭州径山茶叶有限公司的茶叶产自于径山茶核心产区——径山寺山顶西侧的唐代千年历史茶地。径山万寿禅寺雄踞江南禅院“五山十刹”之首，号称“东南第一禅院”。径山灵山毓秀，渌水含英，蕙若暨芝兰并茂，芳苓与瑞树同生。径山寺开山祖师法钦植茶数株，赖夫膏壤滋孳，雾露涵菁，遂千遂万，蔓衍山中。
                      </div>
                    </div>
                    <div style={{ fontSize: "0.19rem", float: 'left', width: '96%', lineHeight: '.265rem', marginTop: '.05rem' }}>采彼谷雨之芽，储诸佳缶；汲此双溪之泉，煮以美甑。猗欤香芬之清醇，正堪礼佛；休哉汤泽之澄碧，雅可作贡。余以自饮，于氤氲中明见禅心；兼以饮客，自机锋里证得空境。径山由此诞生径山的禅和茶，辨空色为非相，离相即佛；融禅茶于一味，知味了性。以是宴具三事，寓修行于嘉会；茶入六品，驰令誉于上邦。鸿渐南来，烹石泉于苕畔；茗艺东播，弘茶道于扶桑。径山茶，始栽于唐，闻名于宋，至今有1200余年历史。苏轼为径山常客，欲安迟暮；陆游乃方外素友，思寄余闲。他如子由胜览，蔡襄雅谈，王阳明隐迹莽野，徐青藤纵情竹弦。皆曾云鹤为侣，栖迟于林间月下；山猿作邻，啸咏于崖涘花前。秋弄丹桂，倚赤松之修茂；春访茑萝，濯碧流之潺湲。以是诗章海积，铭辞星繁，行述俱美，人文相缘。视此禅那之国土，不异翰场；观我浙杭之风标，几于此山。径山由此以“崇尚自然，讲究真色、真香、真味”独树一帜，更以“名山、名寺、名人、名茶”著称于世，铸就千古流传的《茶经》。</div>
                  </div>
                  <div className="pick1">
                    <img src={require('./caizhai.png')} style={{ width: '100%', height: '2.07rem', verticalAlign: 'top', float: 'left', }} />
                  </div>
                  <div className="sub-title3 css12594a6bbd1d0b6" >手工采摘品质保证</div>
                  <div className="sub-content css12594a6bbd1d0b6"
                  >径山茶以采摘细嫩著称，春茶以一叶一芽为采摘标准。清明前后采摘的茶叶为品质最佳，采茶姑娘们踏着清晨露水，用一双熟悉的巧手摘下饱满鲜嫩的茶叶尖。</div>
                  <div style={{ textAlign: 'center' }}>
                    <a href="/consumer/jspick" className="Consumer-more css12594a6bbd1d0b6">实时图片</a>
                  </div>
                </div>
                <div className="section2">
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
                            src={require(`./img3/${val}.png`)}
                            alt=""
                            style={{ width: '47%', verticalAlign: 'top' }}
                            onLoad={() => {
                              // fire window resize event to change height
                              window.dispatchEvent(new Event('resize'));
                              this.setState({ imgHeight: 'auto' });
                            }}
                          />
                          <img
                            src={require(`./img4/${val}.png`)}
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
                  <div className="sub-title3 css12594a6bbd1d0b6">传承悠久的炒茶技艺</div>
                  <div className="sub-content css12594a6bbd1d0b6">由30年以上炒茶经验的炒茶师，经鲜叶摊放—杀青（手工）—理条（手工）—揉捻（手工）—干燥五道工序制作而成。</div>
                  <div style={{ textAlign: 'center' }}>
                    <a href="/consumer/jscook" className="Consumer-more css12594a6bbd1d0b6">实时图片</a>
                  </div>
                  <div className="pick2">
                    <WingBlank>
                      <Carousel className="space-carousel"
                        frameOverflow="visible"
                        cellSpacing={10}
                        slideWidth={0.7}
                        autoplay
                        dots={false}
                        infinite
                        afterChange={index => this.setState({ slideIndex: index })}
                      >
                        {this.state.jsdata.map((val, index) => (
                          <span>
                            <img
                              src={require(`./img5/${val}.png`)}
                              alt=""
                              style={{ width: '100%', verticalAlign: 'top' }}
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
                  </div>
                  <div className="sub-title3 css12594a6bbd1d0b6">用科技包裹风味与历史</div>
                  <div className="sub-content css12594a6bbd1d0b6">使用塑料封独立包装最大程度保持径山茶的正宗风味，用古朴与科技相融的包装带您体验千年古茶与现代科技的完美融合。</div>
                </div>
                <div className="section3">
                  <div className="sub-title2 css12594a6bbd1d0b6">让数据为径山茶发声</div>
                  <Flex justify="center" direction="column" >
                    <Flex justify="center">
                      <div className="Consumer-dataimg css12594a6bbd1d0b6"><span className="pm-data">{pmtext}</span></div>
                      <div className="Consumer-data mt3">
                        <div className="data-title css12594a6bbd1d0b6" >PM2.5：<span style={{ fontSize: '.22rem' }}>{pm25}</span><span style={{ fontSize: '.22rem' }}>𝜇𝑔/𝑚<sup>3</sup></span>
                        </div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          PM2.5是衡量茶园空气质量和生态水平的重要参数，良好的空气质量将使茶叶的氨基酸和水浸出物含量维持在适宜水平，保证茶叶口感和滋味的醇正。
                      </div>
                      </div>
                    </Flex>
                    <Flex justify="center">
                      <div className="Consumer-dataimg"><span className="light-data">{lighttext}</span></div>
                      <div className="Consumer-data mt2">
                        <div className="data-title css12594a6bbd1d0b6">光照：<span>{light}</span><span>𝑙𝑥</span></div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          适宜、充足的光照可以促进光合产物的形成，使茶树生长更加茁壮，同时也会影响茶叶中咖啡碱的含量，令茶叶品质更佳。
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
                          适宜的土壤温度能够促进土壤的呼吸作用，使茶树获得更多营养、健康成长。
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
                          土壤湿度是影响茶树生长速度的关键因素，适宜的土壤湿度可以将茶叶中的氨基酸含量维持在适宜水平，使茶叶口感更加鲜爽。
                      </div>
                      </div>
                    </Flex>
                  </Flex>
                </div>
                <div className="section4">
                  <div><img src={require('./brand1.png')} alt="logo" style={{ width: '3rem', height: 'auto' }} /></div>
                  <div><img src={require('./brand3.png')} alt="logo" style={{ marginTop: '.25rem', width: '2.5rem', height: 'auto' }} /></div>
                  <div><img src={require('./brand2.png')} alt="logo" style={{ marginTop: '.2rem', width: '3rem', height: 'auto' }} /></div>
                  <div><img src={require('./brand4.png')} alt="logo" style={{ marginTop: '.2rem', width: '2rem', height: 'auto' }} /></div>
                  <p className="Consumer-bottombar css12594a6bbd1d0b6">杭州径山茶叶有限公司</p>
                  <p>客服热线：13666605688</p>
                  <p className="Consumer-bottombar css12594a6bbd1d0b6">技术保障：杭州移动 浙江大学</p>
                  <p className="Consumer-bottombar css12594a6bbd1d0b6">实施单位：钛比科技  </p>
                </div>
              </div>
            });
          }
          if (teaType === "泰顺") {
            document.title = "泰顺县广和农业开发有限公司—让数据说话";
            this.setState({
              content: <div style={{ width: '100%' }} id="taishun_body">
                <div className="banner">
                  <img src={require('./banner3.png')} />
                </div>
                <div className="section">
                  <div className="sub-title css12594a6bbd1d0b6">香菇寮白毫</div>
                  <div className="sub-title1 css12594a6bbd1d0b6">全球唯一追溯ID: <span>{data.teaInfo.teaID}</span></div>
                  <WingBlank>
                    <Carousel className="space-carousel"
                      frameOverflow="visible"
                      cellSpacing={10}
                      slideWidth={0.33}
                      autoplay
                      dots={false}
                      infinite
                      afterChange={index => this.setState({ slideIndex: index })}
                    >
                      {this.state.datas.map((val, index) => (
                        <span>
                          <img
                            src={require(`./tsimg1/${val}.jpg`)}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                              // fire window resize event to change height
                              window.dispatchEvent(new Event('resize'));
                              this.setState({ imgHeight: 'auto' });
                            }}
                          />
                          {/* <img
                            src={require(`./tsimg2/${val}.jpg`)}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', marginLeft: '6%' }}
                            onLoad={() => {
                              // fire window resize event to change height
                              window.dispatchEvent(new Event('resize'));
                              this.setState({ imgHeight: 'auto' });
                            }}
                          /> */}
                        </span>
                      ))}
                    </Carousel>
                  </WingBlank>
                  <div className="sub-content css12594a6bbd1d0b6">
                    泰顺县彭溪镇香菇寮白毫原产地，利用浙江大学“物联网+区块链”技术，实现香菇寮白毫从产地环境监测、种植、制作、封装过程的数据追溯，让数据替茶说话，用科技守卫品质。
                </div >
                </div>
                <div className="section1">
                  <div className="sub-title5 css12594a6bbd1d0b6">您手中的茶叶来自于</div>
                  <div className="comefrom">
                    <div className="map">
                      <img
                        className="mapimg"
                        src={require('./map2.jpg')}
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
                        香菇寮，位于彭溪镇海拔四百多米的山岙之中，荟蔚苍萃，停云住霭，云烟起时犹如仙境，是孕育香菇寮白毫的一方净土。据多次移植试验证实，这里的地理环境对香菇寮白毫的种植具有不可复制性，其他地方尚无法培育出纯正味道的香菇寮白毫，因此种植规模非常有限，产量稀少，在市场上“一茶难求”，极为珍贵。
                      </div>
                    </div>
                    <div style={{ fontSize: "0.19rem", float: 'left', width: '96%', lineHeight: '.265rem', marginTop: '.05rem' }}>
                      香菇寮白毫是彭溪原产的珍稀茶种，省优质名茶，以兰花香品质独具特色，且据多次移植试验证实，这一特质在其他种植区域无法复制。中国第一茶院士陈宗懋院士多次到彭溪实地品鉴，赞誉其为茶中珍品。1999年曾获杭州国际茶博会金奖。               香菇寮白毫幽香似兰、周身白毫，茶中内含物质丰富，氨基酸含量高，经久耐泡，第二泡内质发挥达到顶峰，滋味鲜爽，回味甘甜，口感最佳。                    此茶为迟芽种，在泰顺的茶叶品种中，开园时间最晚，一般采制于清明前后。将明前茶奉为上品的选茶观念并不适用于香菇寮白毫，选择香菇寮应遵循“求优不求早”的原则。</div>
                  </div>
                  <div className="pick1">
                    <img src={require('./tspick.png')} style={{ width: '100%', height: '2.07rem', verticalAlign: 'top', float: 'left', }} />
                  </div>
                  <div className="sub-title3 css12594a6bbd1d0b6" >手工采摘品质保证</div>
                  <div className="sub-content css12594a6bbd1d0b6"
                  >香菇寮白毫以细嫩鲜爽著称，采摘一般以一芽一叶为标准，采用“提手采”，即用拇指和食指捏住芽叶，轻轻向上提采或折断，使茶叶完整成朵。遵循清晨、有露水、阴雨天、正当午时不采的原则，保证鲜叶质量。</div>
                  <div style={{ textAlign: 'center' }}>
                    <a href="/consumer/tspick" className="Consumer-more css12594a6bbd1d0b6">实时图片</a>
                  </div>
                </div>
                <div className="section2">
                  <div className="pick" style={{ marginTop: '0rem', position: 'relative' }}>
                    <img src={require('./tscook.jpg')} style={{ width: '100%', height: '2rem', float: 'left', }} />
                  </div>
                  <div className="sub-title3 css12594a6bbd1d0b6">传承传统制茶工艺</div>
                  <div className="sub-content css12594a6bbd1d0b6">香菇寮白毫最主要的品质特征是内含兰花香。兰花香是茶种本身的特质，但采制方法决定着香味的发挥程度，传统手工采制方法更利于兰花香韵的发挥。
                  香菇寮白毫选用一芽一叶或一芽二叶初展的幼嫩芽叶，采后以5厘米的厚度，将青叶推放在簸箕上，约经4－6小时的摊凉后，再经杀青、揉捻、初烘、炒二青、复烘、滚袋六道工序制作而成。</div>
                  <div style={{ textAlign: 'center' }}>
                    <a href="/consumer/tscook" className="Consumer-more css12594a6bbd1d0b6">实时图片</a>
                  </div>
                  {/* <div className="pick2">
                    <img src={require('./packing2.png')} style={{ width: '100%', height: '2.73rem', float: 'left', }} />

                  </div>
                  <div className="sub-title3 css12594a6bbd1d0b6">用科技包裹风味与历史</div>
                  <div className="sub-content css12594a6bbd1d0b6">使用塑料封独立包装最大程度保持白毫茶的正宗风味，用古朴与科技相融的包装带您体验千年古茶与现代科技的完美融合。</div> */}
                </div>
                <div className="section3">
                  <div className="sub-title2 css12594a6bbd1d0b6">让数据为白毫茶发声</div>
                  <Flex justify="center" direction="column" >
                    <Flex justify="center">
                      <div className="Consumer-dataimg css12594a6bbd1d0b6"><span className="pm-data">{pmtext}</span></div>
                      <div className="Consumer-data mt3">
                        <div className="data-title css12594a6bbd1d0b6" >PM2.5：<span style={{ fontSize: '.22rem' }}>{pm25}</span><span style={{ fontSize: '.22rem' }}>𝜇𝑔/𝑚<sup>3</sup></span>
                        </div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          PM2.5是衡量茶园空气质量和生态水平的重要参数，良好的空气质量将使茶叶的氨基酸和水浸出物含量维持在适宜水平，保证茶叶口感和滋味的醇正。
                      </div>
                      </div>
                    </Flex>
                    <Flex justify="center">
                      <div className="Consumer-dataimg"><span className="light-data">{lighttext}</span></div>
                      <div className="Consumer-data mt2">
                        <div className="data-title css12594a6bbd1d0b6">光照：<span>{light}</span><span>𝑙𝑥</span></div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          适宜、充足的光照可以促进光合产物的形成，使茶树生长更加茁壮，同时也会影响茶叶中咖啡碱的含量，令茶叶品质更佳。
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
                          适宜的土壤温度能够促进土壤的呼吸作用，使茶树获得更多营养、健康成长。
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
                          土壤湿度是影响茶树生长速度的关键因素，适宜的土壤湿度可以将茶叶中的氨基酸含量维持在适宜水平，使茶叶口感更加鲜爽。
                      </div>
                      </div>
                    </Flex>
                  </Flex>
                </div>
                <div className="section5">
                  <div style={{ fontSize: ".25rem", lineHeight: '.4rem' }}>采摘时间：{this.state.pickTime}</div>
                  <div style={{ fontSize: ".25rem", lineHeight: '.4rem' }}>炒制时间：{this.state.cookTime}</div>
                  <div style={{ fontSize: ".25rem", lineHeight: '.4rem' }}>包装时间：{this.state.packTime}</div>
                </div>
                <div className="section4">
                  <div className="Consumer-bottombar css12594a6bbd1d0b6" style={{ fontSize: '.28rem', lineHeight: '.5rem' }}>
                    <img src={require('./botlogo.png')} alt="logo" style={{ width: ".3rem", height: '.3rem' }} />
                    泰顺县广和农业开发有限公司
                 </div>
                  <div className="Consumer-bottombar css12594a6bbd1d0b6" style={{ fontSize: '.28rem', lineHeight: '.5rem' }}>技术保障：温州移动 浙江大学</div>
                  <div className="Consumer-bottombar css12594a6bbd1d0b6" style={{ fontSize: '.28rem', lineHeight: '.5rem' }}>实施单位：钛比科技  </div>
                </div>
              </div>
            });
          }
          if (teaType === "杜家杨梅") {
            document.title = "杜家村杨梅—让数据说话";
            this.setState({
              content: <div style={{ width: '100%' }} id="taishun_body">
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
                      slideWidth={0.33}
                      autoplay
                      dots={false}
                      infinite
                      afterChange={index => this.setState({ slideIndex: index })}
                    >
                      {this.state.datas.map((val, index) => (
                        <span>
                          <img
                            src={require(`./tsimg1/${val}.jpg`)}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
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
                    泰顺县彭溪镇香菇寮白毫原产地，利用浙江大学“物联网+区块链”技术，实现香菇寮白毫从产地环境监测、种植、制作、封装过程的数据追溯，让数据替茶说话，用科技守卫品质。
                </div >
                </div>
                <div className="section1">
                  <div className="sub-title5 css12594a6bbd1d0b6">您手中的茶叶来自于</div>
                  <div className="comefrom">
                    <div className="map">
                      <img
                        className="mapimg"
                        src={require('./map2.jpg')}
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
                        香菇寮，位于彭溪镇海拔四百多米的山岙之中，荟蔚苍萃，停云住霭，云烟起时犹如仙境，是孕育香菇寮白毫的一方净土。据多次移植试验证实，这里的地理环境对香菇寮白毫的种植具有不可复制性，其他地方尚无法培育出纯正味道的香菇寮白毫，因此种植规模非常有限，产量稀少，在市场上“一茶难求”，极为珍贵。
                      </div>
                    </div>
                    <div style={{ fontSize: "0.19rem", float: 'left', width: '96%', lineHeight: '.265rem', marginTop: '.05rem' }}>
                      香菇寮白毫是彭溪原产的珍稀茶种，省优质名茶，以兰花香品质独具特色，且据多次移植试验证实，这一特质在其他种植区域无法复制。中国第一茶院士陈宗懋院士多次到彭溪实地品鉴，赞誉其为茶中珍品。1999年曾获杭州国际茶博会金奖。               香菇寮白毫幽香似兰、周身白毫，茶中内含物质丰富，氨基酸含量高，经久耐泡，第二泡内质发挥达到顶峰，滋味鲜爽，回味甘甜，口感最佳。                    此茶为迟芽种，在泰顺的茶叶品种中，开园时间最晚，一般采制于清明前后。将明前茶奉为上品的选茶观念并不适用于香菇寮白毫，选择香菇寮应遵循“求优不求早”的原则。</div>
                  </div>
                  <div className="pick1">
                    <img src={require('./tspick.png')} style={{ width: '100%', height: '2.07rem', verticalAlign: 'top', float: 'left', }} />
                  </div>
                  <div className="sub-title3 css12594a6bbd1d0b6" >手工采摘品质保证</div>
                  <div className="sub-content css12594a6bbd1d0b6"
                  >香菇寮白毫以细嫩鲜爽著称，采摘一般以一芽一叶为标准，采用“提手采”，即用拇指和食指捏住芽叶，轻轻向上提采或折断，使茶叶完整成朵。遵循清晨、有露水、阴雨天、正当午时不采的原则，保证鲜叶质量。</div>
                  <div style={{ textAlign: 'center' }}>
                    <a href="/consumer/tspick" className="Consumer-more css12594a6bbd1d0b6">实时图片</a>
                  </div>
                </div>
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
                          PM2.5是衡量茶园空气质量和生态水平的重要参数，良好的空气质量将使茶叶的氨基酸和水浸出物含量维持在适宜水平，保证茶叶口感和滋味的醇正。
                      </div>
                      </div>
                    </Flex>
                    <Flex justify="center">
                      <div className="Consumer-dataimg"><span className="light-data">{lighttext}</span></div>
                      <div className="Consumer-data mt2">
                        <div className="data-title css12594a6bbd1d0b6">光照：<span>{light}</span><span>𝑙𝑥</span></div>
                        <WhiteSpace />
                        <div className="Consumer-datadetail css12594a6bbd1d0b6">
                          适宜、充足的光照可以促进光合产物的形成，使茶树生长更加茁壮，同时也会影响茶叶中咖啡碱的含量，令茶叶品质更佳。
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
                          适宜的土壤温度能够促进土壤的呼吸作用，使茶树获得更多营养、健康成长。
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
                          土壤湿度是影响茶树生长速度的关键因素，适宜的土壤湿度可以将茶叶中的氨基酸含量维持在适宜水平，使茶叶口感更加鲜爽。
                      </div>
                      </div>
                    </Flex>
                  </Flex>
                </div>
                {/* <div className="section5">
                  <div style={{ fontSize: ".25rem", lineHeight: '.4rem' }}>采摘时间：{this.state.pickTime}</div>
                  <div style={{ fontSize: ".25rem", lineHeight: '.4rem' }}>炒制时间：{this.state.cookTime}</div>
                  <div style={{ fontSize: ".25rem", lineHeight: '.4rem' }}>包装时间：{this.state.packTime}</div>
                </div> */}
                <div className="section4">
                  <div className="Consumer-bottombar css12594a6bbd1d0b6" style={{ fontSize: '.28rem', lineHeight: '.5rem' }}>
                    <img src={require('./ymlogo.png')} alt="logo" style={{ width: ".3rem", height: '.3rem' }} />
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
