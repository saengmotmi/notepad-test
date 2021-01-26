import React from "react";
import { Form, DatePicker } from "antd";
import moment from "moment";
import { useTableContext, isEditing } from "../index";

export default function StudyDateRange(_, record) {
  const { editingKey } = useTableContext();
  const editable = isEditing(record, editingKey);

  return editable ? (
    <Form.Item name={"date" + record.key} style={{ margin: 0 }}>
      <DatePicker.RangePicker value={record.date} defaultValue={record.date} />
    </Form.Item>
  ) : (
    record.date.map(d => moment(d).format("YYYY-MM-DD")).join(" ~ ")
  );
}
