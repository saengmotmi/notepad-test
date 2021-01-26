import React from "react";
import { Form, DatePicker } from "antd";
import moment from "moment";
import { useTableContext, isEditing } from "../index";

export default function PreStudyDate(_, record) {
  const { editingKey } = useTableContext();
  const editable = isEditing(record, editingKey);

  return editable ? (
    <Form.Item name={"preStudy" + record.key} style={{ margin: 0 }}>
      <DatePicker value={record.preStudy} defaultValue={record.preStudy} />
    </Form.Item>
  ) : (
    moment(record.preStudy).format("YYYY-MM-DD")
  );
}
