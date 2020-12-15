import React, { useEffect } from "react";
import { gql, useQuery, useMutation, useApolloClient } from "@apollo/client";

const USER_ID = 2682;

export default function Index() {
  const client = useApolloClient();
  const { loading, error, data: user } = useQuery(getUserInfoById, {
    variables: { id: USER_ID },
  });
  const [mutateUser] = useMutation(updateCustomer);
  const [mutateComment] = useMutation(addCommentById);

  const sendComment = () => {
    const comment = "후후후후";
    const onCommentUpdate = (client, { data: { addComment } }) => {
      client.writeQuery({
        query: getUserInfoById,
        variables: { id: USER_ID },
        data: {
          customerById: {
            ...user.customerById,
            customer_information: [
              ...user.customerById.customer_information,
              addComment,
            ],
          },
        },
      });
    };
    mutateComment({
      variables: {
        customer_id: USER_ID,
        staff_id: 9,
        description: comment,
      },
      update: onCommentUpdate,
    });
  };

  const modifyUser = () => {
    const newUserInfo = {
      customer_id: USER_ID,
      name: "asdf",
      email: "asdfasdf@naver.com",
    };
    mutateUser({
      variables: { ...newUserInfo },
      refetchQueries: [{ query: getUserInfoById, variables: { id: USER_ID } }],
    });
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;

  return (
    <div>
      <ul>
        {Object.entries(user.customerById).map(([k, v], idx) => (
          <li key={idx}>{k + " : " + v}</li>
        ))}
      </ul>
      <ul>
        {Object.entries(user.customerById.customer_information).map(
          (comment, idx) => (
            <li key={idx}>{JSON.stringify(comment)}</li>
          )
        )}
      </ul>
      <input type="text" placeholder="email" />
      <button onClick={sendComment}>댓글 등록</button>
      <button onClick={modifyUser}>유저 이메일 업데이트</button>
    </div>
  );
}

export const getUserInfoById = gql`
  query customerById($id: Int!) {
    customerById(id: $id) {
      id
      name
      email
      phone_number
      course {
        id
        name
      }
      course_other
      prior_coding_experience {
        id
        name
      }
      prior_coding_experience_other
      medium {
        id
        name
      }
      medium_other
      inquiry
      referrer
      created_at
      status_tags {
        id
        name
      }
      customer_information {
        id
        description
        staffs {
          id
          name
        }
        created_at
      }
      phone_consultation_staff {
        id
        name
      }
      phone_consultation_date
      visit_consultation_staff {
        id
        name
      }
      visit_consultation_date
      is_contract_sent
      is_syllabus_sent
      is_follow_up_needed
    }
  }
`;

export const addCommentById = gql`
  mutation addComment(
    $customer_id: Int!
    $staff_id: Int!
    $description: String!
  ) {
    addComment(
      data: {
        customer_id: $customer_id
        staff_id: $staff_id
        description: $description
      }
    ) {
      id
      description
      staffs {
        id
        name
      }
      created_at
    }
  }
`;

export const updateCustomer = gql`
  mutation updateCustomer($email: String, $customer_id: Int!, $name: String) {
    updateCustomer(
      data: { customer_id: $customer_id, email: $email, name: $name }
    )
  }
`;
