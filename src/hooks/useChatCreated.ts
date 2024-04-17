import { useSubscription, gql, ApolloClient } from "@apollo/client";
import { ChatFragment } from "../fragments/chat.fragment";

const CHAT_CREATED_SUBSCRIPTION = gql`
  subscription ChatCreated {
    chatCreated {
      ...ChatFragment
    }
  }
  ${ChatFragment}
`;

export const useChatCreated = () => {
  useSubscription(CHAT_CREATED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      console.log("New chat data:", subscriptionData.data);
      const { chatCreated } = subscriptionData.data;

      // Proceed only if chatCreated is not null
      if (chatCreated) {
        updateLocalChatsCache(client, chatCreated);
      }
    },
  });
};

function updateLocalChatsCache(client: ApolloClient<object>, newChat: any) {
  const chatsQuery = gql`
    query GetChats {
      chats {
        ...ChatFragment
      }
    }
    ${ChatFragment}
  `;

  try {
    // Attempt to read the existing chats from the cache
    const { chats } = client.readQuery({ query: chatsQuery }) || { chats: [] };

    // Update the cache with the new chat added
    client.writeQuery({
      query: chatsQuery,
      data: { chats: [newChat, ...chats] },
    });
  } catch (error) {
    console.error("Error updating cache:", error);
  }
}
