import React, { useState, useEffect } from "react";
import { Button, Checkbox, Col, Row } from "antd";

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState({});

  const loadingTest = () => {
    setTimeout(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    });
  };

  const consoleCheck = (e, idx) => {
    console.log(e.target.checked, idx);
    setChecked({ ...checked, [idx]: !e.target.value });
  };

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <div style={style}>
      <div>
        <Button type="primary" loading={loading} onClick={loadingTest}>
          버튼입니다
        </Button>
        <Button type="secondary">버튼입니다</Button>
      </div>
      <div>
        <Checkbox.Group>
          <Row>
            {[...Array(3)].map((_, idx) => {
              return (
                <Col key={idx} span={8}>
                  <Checkbox value={idx} onClick={e => consoleCheck(e, idx)}>
                    체크 {idx + 1}
                  </Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      </div>
    </div>
  );
}

const style = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
