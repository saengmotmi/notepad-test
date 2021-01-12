import React, { useState, useRef } from "react";
import aligoClient, { templateType } from "./axiosClient";

export default function Index() {
  const [template, setTemplate] = useState("");
  const formRef = useRef({});

  const handleForm = e => {
    const { name, value } = e.target;
    formRef.current[name] = value;
  };

  const displayTemplate = async () => {
    const { code, content, button } = await aligoClient.getTemplate(
      templateType.callInfo
    );

    const parseTable = {
      등록자명: formRef.current.name,
      방문상담일시: formRef.current.date,
      // 등록자명: "오종택",
      // 방문상담일시: "오늘",
      기수: "",
      개강일: "",
      사전스터디일시: "",
    };

    const REG_TEMPLATE = /#{(.*?)}/g;
    const parsedStr = content.replace(
      REG_TEMPLATE,
      (_, matchStr) => parseTable[matchStr]
    );

    setTemplate({ code, content: parsedStr, button });
  };

  return (
    <div>
      <button onClick={displayTemplate}>템플릿 가져오기</button>
      <button onClick={() => aligoClient.sendSms(template)}>
        문자 전송하기
      </button>
      <input
        type="text"
        name="name"
        placeholder="방문자명"
        onChange={handleForm}
      />
      <input
        type="text"
        name="date"
        placeholder="방문상담일시"
        onChange={handleForm}
      />
      {template.content?.split("\n").map((l, idx) => {
        return <p key={idx}>{l}</p>;
      })}
    </div>
  );
}
