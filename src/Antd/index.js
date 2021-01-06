import React, { useState, useEffect } from "react";
import moment from "moment";
import { Button, Checkbox, Col, Row, DatePicker } from "antd";

export default function Index() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [rangeDate, setRangeDate] = useState(["", ""]);

  const handleIndex = e => {
    const [idx, btnType] = e.currentTarget.dataset.idx.split(",");

    if (+idx === currentIdx) {
      setCurrentIdx(0);
      setRangeDate(["", ""]);
      return;
    }
    setCurrentIdx(+idx);
    setRangeDate(buttonTypeTodate(btnType));
  };

  const buttonTypeTodate = type => {
    const today = moment();
    const startOf = () => today.clone().startOf(type);
    const endOf = () => today.clone().endOf(type);

    const typeTable = {
      today: [today, today],
      week: [startOf(), endOf()],
      month: [startOf(), endOf()],
    };

    return typeTable[type];
  };

  return (
    <div style={style}>
      <DatePicker.RangePicker onChange={setRangeDate} value={rangeDate} />
      <Button
        type={currentIdx === 1 && "primary"}
        data-idx={[1, "today"]}
        onClick={handleIndex}
      >
        오늘
      </Button>
      <Button
        type={currentIdx === 2 && "primary"}
        data-idx={[2, "week"]}
        onClick={handleIndex}
      >
        이번 주
      </Button>
      <Button
        type={currentIdx === 3 && "primary"}
        data-idx={[3, "month"]}
        onClick={handleIndex}
      >
        이번 달
      </Button>
    </div>
  );
}

const style = {
  height: "100vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};
