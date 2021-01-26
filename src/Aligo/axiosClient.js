import axios from "axios";

export const REG_TEMPLATE = /#{(.*?)}/g;
export const NOT_NUMBER_REGEXP = /[^0-9]/g;
export const ALIGO_BASE_URL = "https://kakaoapi.aligo.in/akv10";
export const SENDER_PHONE_NUM = "01029840401";
export const TITLE = "제목";
export const API_KEY = "hk7gvcf5tlu734potst9hli1a4x2h2uv";
export const USER_ID = "wecode";
export const SENDER_KEY = "9f8909f6da9c9dd6431a5034b0e1891ce53a3562";
export const encodeHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
};

const errorResponse = {
  expiredToken: -107,
};

export const templateType = {
  curryInfo: 0, // [전화상담] 커리큘럼 안내
  notAnswered: 1, // [전화상담] 부재중
  visitInfo: 2, // [방문상담] 일정, 장소 공지
  visitRemind: 3, // [방문상담] 리마인드
  callInfo: 4, // [화상상담] 일정, 장소 공지
  callRemind: 5, // [화상상담] 리마인드
  enrollPayment: 6, // [등록] 결제 안내
  enrollInfo: 7, // [등록] 수강 안내서
  preAddress: 8, // [예비기수] Gmail, Github 주소 요청
  preSlack: 9, // [예비기수] Slack 초대 메일 확인 요청
  refund: 10, // [환불] 신청 안내
  curryInfoSocial: 11, // [소셜클럽] 커리큘럼 안내
  notAnsweredSocial: 12, // [소셜클럽] 부재중
  enrollPaymentSocial: 13, // [소셜클럽] 결제 안내
  enrollInfoWeb: 14, // [소셜클럽] WEB 수강 안내서
  enrollInfoApp: 15, // [소셜클럽] APP 수강 안내서
  preSlackSocial: 16, // [소셜클럽] Slack 초대 메일 확인 요청
};

const URL = {
  token: "/token/create/10/m/",
  template: "/template/list/",
  sms: "/alimtalk/send/",
};

const parseQs = obj => {
  return Object.entries(obj)
    .filter(([_, v]) => !!v)
    .map(e => e.join("="))
    .join("&");
};

class AxiosClient {
  constructor() {
    this.client = axios.create({
      baseURL: ALIGO_BASE_URL,
      headers: encodeHeaders,
    });
    this.baseBody = {
      apikey: API_KEY,
      userid: USER_ID,
      token: "",
    };

    this.getToken();
  }

  getToken = async () => {
    const { data } = await this.client.post(URL.token, parseQs(this.baseBody));
    const token = data.urlencode;
    this.baseBody.token = token;

    this.client.interceptors.request.use(
      config => ({
        ...config,
        data: parseQs(this.baseBody) + "&" + config.data,
      }),
      error => Promise.reject(error)
    );
  };

  getTemplate = async idx => {
    if (!this.baseBody.token) {
      alert("토큰이 없습니다");
      return "";
    }

    const params = parseQs({ senderkey: SENDER_KEY });
    let template = await this.client.post(URL.template, params);

    // 토큰이 만료되었으면 갱신
    if (template.data.code === errorResponse.expiredToken) {
      await this.getToken();
      template = await this.client.post(URL.template, params);
    }

    const { templtCode, templtContent, buttons } = template.data.list[idx];

    return {
      code: templtCode,
      content: templtContent,
      button: { button: buttons },
    };
  };

  sendSms = async (template, form) => {
    const { code, content, button } = template;
    const { name, phoneNumber1, phoneNumber2, phoneNumber3 } = form;

    const phoneNumber = phoneNumber1 + phoneNumber2 + phoneNumber3;

    const params = parseQs({
      senderkey: SENDER_KEY,
      tpl_code: code,
      sender: SENDER_PHONE_NUM,
      receiver_1: phoneNumber.replace(NOT_NUMBER_REGEXP, ""),
      recvname_1: name,
      subject_1: "제목",
      message_1: content,
      button_1: JSON.stringify(button),
    });

    // await this.client.post(URL.sms, params);
  };
}

export default new AxiosClient();
