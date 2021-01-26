import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Table } from "antd";
import moment from "moment";
import queries from "./queries";
import { batches, batchListCol } from "./data";

const TableContext = createContext();
const { Provider } = TableContext;
export const useTableContext = () => useContext(TableContext);

export const isEditing = (record, editingKey) => record.key === editingKey;

export default function EditableTable() {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  // const [data, setData] = useState(batches.data.batches);
  const [data, setData] = useState([]);
  const { data: batches, loading, refetch } = useQuery(queries.getBatches);
  const [deleteBatch] = useMutation(queries.deleteBatch);
  const [createBatch] = useMutation(queries.createBatch);
  // const deleteBatch = () => {};
  // const createBatch = () => {};
  // const loading = false;
  const isNewItemAdding = useRef(false);

  useEffect(() => {
    if (!batches) return;

    setData(
      batches.batches.map(item => ({
        ...item,
        prestudy_date: "2021-03-05T09:00:00.000Z",
      }))
    );
  }, [batches]);

  const deleteBatchById = async id => {
    if (isNewItemAdding.current) return cancel();

    await deleteBatch({ variables: { batch_id: id } });
    refetch();
  };

  const edit = record => {
    const id = record.key;
    form.setFieldsValue({
      ["date" + id]: record.date,
      ["preStudy" + id]: record.preStudy,
      ["capacity" + id]: record.capacity,
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    const newData = [...data];

    if (isNewItemAdding.current) {
      newData.splice(-1, 1);
      setData(newData);
      isNewItemAdding.current = false;
    }
    setEditingKey("");
  };

  const save = async (e, id) => {
    e.preventDefault();
    try {
      const ONLY_ENG_REGEXP = /[^[a-zA-Z]/g;
      const row = form.getFieldsValue();
      // const row = await form.validateFields();
      const parsedRow = Object.fromEntries(
        Object.entries(row).map(([k, v]) => [k.replace(ONLY_ENG_REGEXP, ""), v])
      );
      const nextRow = {
        start_date: parsedRow.date[0],
        end_date: parsedRow.date[1],
        max_capacity: +parsedRow.capacity,
      };
      const newData = [...data];
      const index = newData.findIndex(item => id === item.id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...nextRow });
        setData(newData);
      }

      isNewItemAdding.current = false;

      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const addItem = () => {
    const id = data[data.length - 1].name + 1;
    const newData = template(id);
    const [record] = convertBatchData([newData]);

    setData([...data, newData]);
    form.setFieldsValue({
      ["date" + id]: record.date,
      ["preStudy" + id]: record.preStudy,
      ["capacity" + id]: record.capacity,
      ...record,
    });

    isNewItemAdding.current = true;
    setEditingKey(id);
  };

  const mergedColumns = batchListCol.map(col => {
    if (!col.editable) return col;

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record, editingKey),
      }),
    };
  });

  const tableSettings = {
    pagination: false,
    dataSource: convertBatchData(data),
    columns: mergedColumns,
  };

  const value = {
    editingKey,
    edit,
    save,
    cancel,
    deleteBatchById,
  };

  if (loading) return <div>Loading...</div>;
  return (
    <Provider value={value}>
      <Form form={form}>
        <button onClick={createBatch}>기수 생성</button>
        <button onClick={addItem}>한 줄 추가</button>
        <Table {...tableSettings} />
      </Form>
    </Provider>
  );
}

const convertBatchData = items =>
  items.map(
    ({ id, name, start_date, end_date, prestudy_date, max_capacity }) => ({
      id,
      key: id,
      batch: name,
      date: [moment(start_date), moment(end_date)],
      preStudy: moment(prestudy_date),
      capacity: max_capacity,
    })
  );

const template = id => ({
  id,
  name: id,
  max_capacity: 40,
  start_date: "2020-12-14T09:00:00.000Z",
  end_date: "2021-03-05T09:00:00.000Z",
  prestudy_date: "2021-03-05T09:00:00.000Z",
  __typename: "Batch",
});
