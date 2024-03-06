// import ChatListItem from "./chat-list-item/ChatListItem";
// import { Box, Divider, Stack } from "@mui/material";
// import ChatListHeader from "./chat-list-header/ChatListHeader";
// import { useEffect, useState } from "react";
// import ChatListAdd from "./chat-list-add/ChatListAdd";
// import { useGetChats } from "../../hooks/useGetChats";
// import { usePath } from "../../hooks/usePath";
// import { useMessageCreated } from "../../hooks/useMessageCreated";
// import { PAGE_SIZE } from "../../constants/page-size";
// import InfiniteScroll from "react-infinite-scroller";
// import { useCountChats } from "../../hooks/useCountChats";
// import { key } from "localforage";

// const ChatList = () => {
//   const [chatListAddVisible, setChatListAddVisible] = useState(false);
//   const [selectedChatId, setSelectedChatId] = useState("");
//   const { data, fetchMore } = useGetChats({
//     skip: 0,
//     limit: PAGE_SIZE,
//   });
//   const { path } = usePath();
//   const { chatsCount, countChats } = useCountChats();

//   useEffect(() => {
//     countChats();
//   }, [countChats]);

//   useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

//   useEffect(() => {
//     const pathSplit = path.split("chats/");
//     if (pathSplit.length === 2) {
//       setSelectedChatId(pathSplit[1]);
//     }
//   }, [path]);

//   return (
//     <>
//       <ChatListAdd
//         open={chatListAddVisible}
//         handleClose={() => setChatListAddVisible(false)}
//       />
//       <Stack>
//         <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
//         <Divider />
//         <Box
//           sx={{
//             width: "100%",
//             bgcolor: "background.paper",
//             maxHeight: "80vh",
//             overflow: "auto",
//           }}
//         >
//           <InfiniteScroll
//             pageStart={0}
//             loadMore={() =>
//               fetchMore({
//                 variables: {
//                   skip: data?.chats.length,
//                 },
//               })
//             }
//             hasMore={
//               data?.chats && chatsCount ? data.chats.length < chatsCount : false
//             }
//             useWindow={false}
//           >
//             {data?.chats &&
//               [...data.chats]
//                 .sort((chatA, chatB) => {
//                   if (!chatA.latestMessage) {
//                     return -1;
//                   }
//                   return (
//                     new Date(chatA.latestMessage?.createdAt).getTime() -
//                     new Date(chatB.latestMessage?.createdAt).getTime()
//                   );
//                 })
//                 .map((chat) => (
//                   <ChatListItem
//                     key={chat._id}
//                     chat={chat}
//                     selected={chat._id === selectedChatId}
//                   />
//                 ))
//                 .reverse()}
//           </InfiniteScroll>
//         </Box>
//       </Stack>
//     </>
//   );
// };

// export default ChatList;

import { useEffect, useState, useRef } from "react";
import ChatListItem from "./chat-list-item/ChatListItem";
import { Box, Divider, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { PAGE_SIZE } from "../../constants/page-size";
import InfiniteScroll from "react-infinite-scroller";
import { useCountChats } from "../../hooks/useCountChats";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data, fetchMore } = useGetChats({
    skip: 0,
    limit: PAGE_SIZE,
  });
  const { path } = usePath();
  const { chatsCount, countChats } = useCountChats();
  // const chatListRef = useRef(null);

  useEffect(() => {
    countChats();
  }, [countChats]);

  useMessageCreated({ chatIds: data?.chats.map((chat) => chat._id) || [] });

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  const chatListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatListRef.current) {
      const isScrolledToBottom =
        chatListRef.current.scrollHeight - chatListRef.current.clientHeight <=
        chatListRef.current.scrollTop + 1; // Add a small tolerance (e.g., 1px)

      if (isScrolledToBottom) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    }
  }, [data?.chats.length]);

  // useEffect(() => {
  //   let timeoutId: string | number | NodeJS.Timeout | undefined;

  //   if (chatListRef.current) {
  //     const isScrolledToBottom =
  //       chatListRef.current.scrollHeight - chatListRef.current.clientHeight <=
  //       chatListRef.current.scrollTop + 10; // Adjust tolerance as needed

  //     if (isScrolledToBottom) {
  //       timeoutId = setTimeout(() => {
  //         chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  //       }, 100); // Delay scrolling to ensure chat items are rendered
  //     }
  //   }

  //   return () => {
  //     clearTimeout(timeoutId); // Clear the timeout when the component unmounts or dependencies change
  //   };
  // }, [data.chats.length]); // Depend on the number of chats

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <Box
          ref={chatListRef}
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  skip: data?.chats.length,
                },
              })
            }
            hasMore={
              data?.chats && chatsCount ? data.chats.length < chatsCount : false
            }
            useWindow={false}
          >
            {data?.chats &&
              [...data.chats]
                .sort((chatA, chatB) => {
                  if (!chatA.latestMessage) {
                    return -1;
                  }
                  return (
                    new Date(chatA.latestMessage?.createdAt).getTime() -
                    new Date(chatB.latestMessage?.createdAt).getTime()
                  );
                })
                .map((chat) => (
                  <ChatListItem
                    key={chat._id}
                    chat={chat}
                    selected={chat._id === selectedChatId}
                  />
                ))
                .reverse()}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
};

export default ChatList;
