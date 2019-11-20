import confidential from "./Confidential";
import URI from 'urijs';


export function generateGetCodeUrl(redirectURL) {

    return new URI("https://open.weixin.qq.com/connect/oauth2/authorize")
        .addQuery("appid", confidential.APP_ID)
        .addQuery("redirect_uri", redirectURL)
        .addQuery("response_type", "code")
        .addQuery("scope", "snsapi_userinfo")
        .addQuery("response_type", "code")
        .hash("wechat_redirect")
        .toString();
}


