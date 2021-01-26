import React from "react";
import { Typography, Popconfirm } from "antd";
import { useTableContext, isEditing } from "../index";

export default function EditCell(_, record) {
  const {
    isEditing,
    editingKey,
    save,
    deleteBatchById,
    cancel,
    edit,
  } = useTableContext();
  const editable = isEditing(record, editingKey);

  return editable ? (
    <span>
      <a
        href=""
        onClick={e => save(e, record.key)}
        style={{
          marginRight: 8,
        }}
      >
        Save
      </a>
      <Popconfirm
        title="Sure to cancel?"
        onConfirm={() => deleteBatchById(record.id)}
      >
        <a
          style={{
            marginRight: 8,
          }}
        >
          Delete
        </a>
      </Popconfirm>
      <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
        <a>Cancel</a>
      </Popconfirm>
    </span>
  ) : (
    <Typography.Link disabled={editingKey !== ""} onClick={() => edit(record)}>
      Edit
    </Typography.Link>
  );
}
