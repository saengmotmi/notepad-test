// import axios from "axios";
const axios = require("axios");
// const { errorGenerator } = require("./common");

function errorGenerator(statusCode = 500) {
  const statusTable = {
    400: "Bad Request Error",
    500: "Internal Server Error",
  };

  const err = new Error(statusTable[statusCode]);
  err.statusCode = statusCode;
  throw err;
}

const REG_TEMPLATE_PARSE = /#{(.*?)}/g;
const NOT_NUMBER_REGEXP = /[^0-9]/g;
const ALIGO_BASE_URL = "https://kakaoapi.aligo.in/akv10";
const SENDER_PHONE_NUM = "01029840401";
const TITLE = "제목";
const API_KEY = "hk7gvcf5tlu734potst9hli1a4x2h2uv";
const USER_ID = "wecode";
const SENDER_KEY = "9f8909f6da9c9dd6431a5034b0e1891ce53a3562";
const encodeHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
};

const errorResponse = {
  expiredToken: -107,
};

const templateType = {
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
  preVisit: 17, // [예비기수] 20기 예비모임 초대
  confirmConsult: 18, // [상담 신청] 상담 신청 완료 후 안내
  alarmConsult: 19, // [상담 신청] 모집예정 알림
  confirmAlarm: 20, // [상담 신청] 모집예정 확인
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

const client = axios.create({
  baseURL: ALIGO_BASE_URL,
  headers: encodeHeaders,
});

const baseBody = {
  apikey: API_KEY,
  userid: USER_ID,
  token: "",
};

const getToken = async () => {
  try {
    const { data } = await client.post(URL.token, parseQs(baseBody));
    const token = data.urlencode;

    baseBody.token = token;
  } catch (error) {
    alert("토큰을 받아오는 도중 에러가 발생했습니다.");
    return;
  }
};

const getTemplate = async idx => {
  try {
    if (!baseBody.token) {
      alert("토큰이 없습니다");
      return "";
    }

    const params = parseQs({ senderkey: SENDER_KEY });
    let template = await client.post(URL.template, params);

    // 토큰이 만료되었으면 갱신
    if (template.data.code === errorResponse.expiredToken) {
      await getToken();
      template = await client.post(URL.template, params);
    }

    const { templtCode, templtContent, buttons } = template.data.list[idx];

    return {
      code: templtCode,
      content: templtContent,
      button: { button: buttons },
    };
  } catch (error) {
    alert("템플릿을 받아오는 도중 에러가 발생했습니다.");
    return {
      code: "",
      content: "",
      button: { button: [] },
    };
  }
};

const sendSms = async (template, form) => {
  try {
    const { code, content, button } = template;
    const { name, phoneNumber } = form;

    console.log(template, form);

    const params = parseQs({
      senderkey: SENDER_KEY,
      tpl_code: code,
      sender: SENDER_PHONE_NUM,
      receiver_1: phoneNumber.replace(NOT_NUMBER_REGEXP, ""),
      recvname_1: name,
      subject_1: TITLE,
      message_1: content,
      button_1: JSON.stringify(button),
    });

    await client.post(URL.sms, params);
  } catch (error) {
    alert("문자를 발송하는 도중 에러가 발생했습니다.");
    errorGenerator(400);
    return;
  }
};

const init = () => {
  client.interceptors.request.use(
    config => ({
      ...config,
      data: parseQs(baseBody) + "&" + config.data,
    }),
    error => Promise.reject(error)
  );

  getToken();
};

init();

module.exports = {
  aligoClient: {
    getToken,
    getTemplate,
    sendSms,
  },
  templateType,
  REG_TEMPLATE_PARSE,
};
