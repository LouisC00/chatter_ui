import { gql } from "@apollo/client";

export const ChatFragment = gql`
  fragment ChatFragment on Chat {
    _id
    name
    latestMessage {
      _id
      content
      createdAt
      user {
        _id
        username
        imageUrl
      }
    }
  }
`;
