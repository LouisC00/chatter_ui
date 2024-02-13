import { graphql } from "../gql/gql";

export const ChatFragment = graphql(`
  fragment ChatFragment on Chat {
    _id
    name
    latestMessage {
      ...MessageFragment
    }
  }
`);
