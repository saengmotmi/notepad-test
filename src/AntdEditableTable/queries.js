import { gql } from "@apollo/client";

const getBatches = gql`
  query {
    batches {
      id
      name
      max_capacity
      start_date
      end_date
    }
  }
`;

const createBatch = gql`
  mutation {
    addBatch(
      data: {
        batch_status_id: 3
        name: 17
        max_capacity: 40
        remaining_early_birds: 0
        remaining_super_early_birds: 0
        available_seats: 0
        start_date: "2020-12-14T09:00:00.000Z"
        end_date: "2020-12-14T09:00:00.000Z"
        description: "test"
      }
    ) {
      id
    }
  }
`;

const deleteBatch = gql`
  mutation deleteBatch($batch_id: Int!) {
    deleteBatch(batch_id: $batch_id) {
      id
    }
  }
`;

export default {
  getBatches,
  createBatch,
  deleteBatch,
};
