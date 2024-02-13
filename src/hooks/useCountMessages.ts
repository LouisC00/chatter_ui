import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/errors";

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await fetch(`${API_URL}/messages/count?chatId=${chatId}`);
    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      return;
    }
    const { messages } = await res.json();
    setMessagesCount(messages);
  }, [chatId]);

  return { messagesCount, countMessages };
};

// const useCountMessages = (chatId: string) => {
//   const [messagesCount, setMessagesCount] = useState<number | undefined>();
//   const countMessages = useCallback(async () => {
//     try {
//       const res = await fetch(`${API_URL}/messages/count?chatId=${chatId}`);
//       if (!res.ok) {
//         throw new Error(`HTTP status ${res.status}`);
//       }
//       const data = await res.json();
//       // Assuming the backend sends the count directly or within a nested structure, adjust accordingly
//       const messagesCount = data.messages || data.count; // Adjust based on actual response structure
//       setMessagesCount(messagesCount);
//     } catch (error) {
//       console.error("Failed to count messages:", error);
//       snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
//     }
//   }, [chatId]);
//   return { messagesCount, countMessages };
// };

export { useCountMessages };
