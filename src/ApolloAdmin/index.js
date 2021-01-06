import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

export default function Index() {
  const getCustomer = gql`
    query {
      customers {
        id
        name
        phone_number
        created_at
        inquiry
        course {
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
        }
      }
    }
  `;
  const { data } = useQuery(getCustomer);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>ㅎㅇ</div>;
}
