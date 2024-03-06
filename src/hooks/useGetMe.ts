import { useQuery } from "@apollo/client";
import { graphql } from "../gql/gql";

const getMeDocument = graphql(`
  query Me {
    me {
      ...UserFragment
    }
  }
`);

const useGetMe = () => {
  return useQuery(getMeDocument);
};

// const useGetMe = () => {
//   const { data, loading, error, refetch } = useQuery(getMeDocument);
//   return { data, loading, error, refetch };
// };

export { useGetMe };
