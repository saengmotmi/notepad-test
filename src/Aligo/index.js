import React, { useState, useRef } from "react";
import { Button } from "antd";
import CardModal from "./CardModal";

export default function Index() {
  const [currentModal, setCurrentModal] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("텍스트");
  const formRef = useRef({});

  const showModal = e => {
    const batch = e.currentTarget.dataset.batch;
    setCurrentModal(+batch);
  };

  const value = {
    currentModal,
    confirmLoading,
    modalText,
    setCurrentModal,
    setModalText,
    formRef,
    setConfirmLoading,
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} data-batch="23">
        23기
      </Button>
      <Button type="primary" onClick={showModal} data-batch="24">
        24기
      </Button>
      <CardModal batch={23} {...value} />
      <CardModal batch={24} {...value} />
    </div>
  );
}
