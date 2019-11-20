import http from './tools';
import * as config from './config';

const userID = localStorage.getItem('userID');
//消费者获取数据端口
export const getInfoForConumer = (params) => http.getcon(config.requestIp + '/users/teaInfo/get?teaID=' + params[0], {
});

//微信配置函数
export const fake = (params) => http.post(config.requestIp + '/users/fake', {
	teaID: params[0],
	code: params[1]
});
