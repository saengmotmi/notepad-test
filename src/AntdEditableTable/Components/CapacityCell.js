import React from "react";
import { Form, Input } from "antd";
import { useTableContext, isEditing } from "../index";

export default function CapacityCell(_, record) {
  const { editingKey } = useTableContext();
  const editable = isEditing(record, editingKey);

  return (
    <>
      {editable ? (
        <Form.Item name={"capacity" + record.key} style={{ margin: 0 }}>
          <Input value={record.capacity} defaultValue={record.capacity} />
        </Form.Item>
      ) : (
        record.capacity
      )}
    </>
  );
}
