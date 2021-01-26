import EditCell from "./Components/EditCell";
import PreStudyDate from "./Components/PreStudyDate";
import StudyDateRange from "./Components/StudyDateRange";
import CapacityCell from "./Components/CapacityCell";

export const batchListCol = [
  { key: "기수", title: "기수", dataIndex: "batch" },
  {
    key: "날짜",
    title: "날짜",
    dataIndex: "date",
    render: StudyDateRange,
  },
  {
    key: "사전스터디 OT",
    title: "사전스터디 OT",
    dataIndex: "preStudy",
    render: PreStudyDate,
  },
  { key: "정원", title: "정원", dataIndex: "capacity", render: CapacityCell },
  {
    key: "수정 / 삭제",
    title: "수정 / 삭제",
    dataIndex: "action",
    render: EditCell,
  },
];

export const batches = {
  data: {
    batches: [
      {
        id: 16,
        name: 16,
        max_capacity: 35,
        start_date: "2020-12-14T09:00:00.000Z",
        end_date: "2021-03-05T09:00:00.000Z",
        prestudy_date: "2021-03-05T09:00:00.000Z",
        __typename: "Batch",
      },
      {
        id: 22,
        name: 17,
        max_capacity: 40,
        start_date: "2020-12-14T09:00:00.000Z",
        end_date: "2020-12-14T09:00:00.000Z",
        __typename: "Batch",
      },
    ],
  },
};
