import React, { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

export default function Index() {
  const [comment, setComment] = useState("");
  const { data, loading } = useQuery(getCustomerLogs, {
    variables: {
      comment: "번호",
    },
  });
  const [handleDelete, { data: updatedData }] = useMutation(updateCustomerLog);
  const [handleComment, { data: updatedComment }] = useMutation(createComment);
  const [handleCommentUpdate, { data: updatedCommentUpdate }] = useMutation(
    updateComment
  );

  if (loading) return <div>loading...</div>;
  return (
    <div>
      <button
        type="text"
        onClick={() =>
          handleCommentUpdate({
            variables: {
              comment_id: 10,
              description: "너도 다 각각의 번호가 있구나",
            },
          })
        }
      >
        댓글 업데이트
      </button>
      <input type="text" onChange={e => setComment(e.target.value)} />
      <button
        onClick={() =>
          handleComment({
            variables: {
              customer_log_id: 1,
              description: comment,
            },
          })
        }
      >
        댓글 작성
      </button>
      <button
        onClick={() =>
          handleDelete({
            variables: {
              customer_log_id: 1,
              status_tags: ["INTERESTED"],
            },
          })
        }
      >
        삭제
      </button>
      {data.customerLogs.map((e, idx) => (
        <div key={idx}>
          <div>
            {e.id + " " + e.customer.name + " / "}
            {e.related_customer_logs.map(c => {
              console.log(c);
              return <li style={{ paddingLeft: "10px" }}>{c.customer.name}</li>;
            })}
          </div>
          <div>
            {e.comments.map(c => {
              return <div>{c.description}</div>;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const createComment = gql`
  mutation addComment($customer_log_id: Int!, $description: String!) {
    addComment(
      data: { customer_log_id: $customer_log_id, description: $description }
    ) {
      id
      description
      created_at
    }
  }
`;

const getCustomerLogs = gql`
  query customerLogs(
    $offset: Int
    $limit: Int
    $course_id: Int
    $inquiry: String
    $comment: String
    $status_tags: [Int]
    $start_date: Datetime
    $end_date: Datetime
    $customer: CustomerSearchInput
  ) {
    customerLogs(
      searchOption: {
        offset: $offset
        limit: $limit
        course_id: $course_id
        inquiry: $inquiry
        comment: $comment
        status_tags: $status_tags
        start_date: $start_date
        end_date: $end_date
        customer: $customer
      }
    ) {
      id
      comments {
        id
        description
        staffs {
          id
          name
        }
      }
      status_tags {
        id
        name
      }
      customer {
        id
        name
        phone_number
      }
      related_customer_logs {
        id
        customer {
          id
          name
          phone_number
        }
      }
    }
  }
`;

const updateCustomerLog = gql`
  mutation updateCustomerLog(
    $customer_log_id: Int!
    $phone_consultation_staff_id: Int
    $phone_consultation_date: Datetime
    $visit_consultation_staff_id: Int
    $visit_consultation_date: Datetime
    $is_contract_sent: Int
    $is_syllabus_sent: Int
    $status_tags: [String]
    $customer: CustomerUpdateInput
  ) {
    updateCustomerLog(
      data: {
        customer_log_id: $customer_log_id
        phone_consultation_staff_id: $phone_consultation_staff_id
        phone_consultation_date: $phone_consultation_date
        visit_consultation_staff_id: $visit_consultation_staff_id
        visit_consultation_date: $visit_consultation_date
        is_contract_sent: $is_contract_sent
        is_syllabus_sent: $is_syllabus_sent
        status_tags: $status_tags
        customer: $customer
      }
    )
  }
`;

const updateComment = gql`
  mutation updateComment($comment_id: Int!, $description: String!) {
    updateComment(
      data: { comment_id: $comment_id, description: $description }
    ) {
      id
      description
      created_at
    }
  }
`;
