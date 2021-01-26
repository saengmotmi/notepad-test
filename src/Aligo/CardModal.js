import React, { useState } from "react";
import { Modal } from "antd";
// import aligoClient, { templateType, REG_TEMPLATE } from "./axiosClient";
import { aligoClient, templateType, REG_TEMPLATE_PARSE } from "./aligoClient";

export default function CardModal({
  batch,
  currentModal,
  confirmLoading,
  modalText,
  setCurrentModal,
  setModalText,
  formRef,
  setConfirmLoading,
}) {
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(
    +JSON.parse(localStorage.getItem("wecode-reservation"))?.[batch]
  );

  // const displayTemplate = async type => {
  //   const { code, content, button } = await aligoClient.getTemplate(type);

  //   const parseTable = {
  //     등록자명: formRef.current.name,
  //     방문상담일시: formRef.current.date,
  //     기수: "",
  //     개강일: "",
  //     사전스터디일시: "",
  //   };

  //   const parsedStr = content.replace(
  //     REG_TEMPLATE_PARSE,
  //     (_, matchStr) => parseTable[matchStr]
  //   );

  //   return { code, content: parsedStr, button };
  // };

  const handleOk = () => {
    if (isAlreadyApplied) return;

    setModalText("쫌만 기댕겨유");
    setConfirmLoading(true);
    setTimeout(async () => {
      const template = await aligoClient.getTemplate(templateType.preAddress);
      const {
        name,
        phoneNumber1,
        phoneNumber2,
        phoneNumber3,
      } = formRef.current;
      const phoneNumber = phoneNumber1 + phoneNumber2 + phoneNumber3;
      const form = {
        name,
        phoneNumber,
      };
      await aligoClient.sendSms(template, form);

      setConfirmLoading(false);
      setModalText("신청이 완료되었습니다.");

      const resevationRecord = JSON.parse(
        localStorage.getItem("wecode-reservation")
      );

      localStorage.setItem(
        "wecode-reservation",
        JSON.stringify({ ...resevationRecord, [batch]: true })
      );
      setIsAlreadyApplied(true);
    }, 2000);
  };

  const handleCancle = () => {
    setCurrentModal(0);
  };

  const handleForm = e => {
    const { name, value } = e.target;

    formRef.current[name] = value;
  };

  return (
    <Modal
      title="타이틀"
      visible={currentModal === batch}
      onOk={handleOk}
      onCancel={handleCancle}
      confirmLoading={confirmLoading}
    >
      <p>{batch}기 모집예정 알림받기</p>
      <p>{isAlreadyApplied ? "신청이 완료되었습니다." : modalText}</p>
      <input type="text" name="name" placeholder="이름" onChange={handleForm} />
      <div>
        <input
          type="text"
          name="phoneNumber1"
          placeholder="연락처"
          onChange={handleForm}
        />
        <input
          type="text"
          name="phoneNumber2"
          placeholder="연락처"
          onChange={handleForm}
        />
        <input
          type="text"
          name="phoneNumber3"
          placeholder="연락처"
          onChange={handleForm}
        />
      </div>
    </Modal>
  );
}
