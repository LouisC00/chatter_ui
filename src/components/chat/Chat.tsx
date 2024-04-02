import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { useGetMe } from "../../hooks/useGetMe";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { Fragment, useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../constants/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data: meData } = useGetMe();
  const currentUserId = meData?.me?._id;

  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: messages, fetchMore } = useGetMessages({
    chatId,
    skip: 0,
    limit: PAGE_SIZE,
  });
  const divRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { messagesCount, countMessages } = useCountMessages(chatId);

  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      isUserAtBottom();
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isUserAtBottom = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const atBottom = scrollHeight - scrollTop === clientHeight;
    setIsAtBottom(atBottom);
  };

  const scrollToBottom = () => {
    // if (isAtBottom) {
    divRef.current?.scrollIntoView();
    // }
    setIsAtBottom(true);
  };

  useEffect(() => {
    if (messages?.messages && isAtBottom) {
      scrollToBottom();
    }
  }, [messages?.messages.length]);

  const handleCreateMessage = async () => {
    if (!message.trim()) return;

    const startTime = Date.now();
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    console.log("Message send time:", Date.now() - startTime, "ms");

    setMessage("");
    // setIsAtBottom(true);
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: "100%" }}>
      <Box style={{ flexGrow: 1 }} />
      <Box
        sx={{
          // maxHeight: "70vh",
          overflow: "auto",
        }}
        ref={scrollContainerRef}
      >
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() =>
            fetchMore({ variables: { skip: messages?.messages.length } })
          }
          hasMore={
            messages && messagesCount
              ? messages.messages.length < messagesCount
              : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages.messages]
              .sort(
                (messageA, messageB) =>
                  new Date(messageA.createdAt).getTime() -
                  new Date(messageB.createdAt).getTime()
              )
              .map((message, index) => (
                <Grid
                  container
                  alignItems="center"
                  marginBottom="1rem"
                  key={`${message.createdAt}-${index}`}
                >
                  {message.user._id === currentUserId && <Box flex={1} />}
                  <Grid item xs={2} lg={1}>
                    <Stack
                      spacing={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        src={message.user.imageUrl}
                        sx={{ width: 52, height: 52 }}
                      />
                      <Typography variant="caption">
                        {message.user.username}
                      </Typography>{" "}
                    </Stack>
                  </Grid>

                  <Grid item xs={10} lg={11}>
                    <Stack>
                      <Paper sx={{ width: "fit-content" }}>
                        <Typography
                          sx={{ padding: "0.9rem", wordBreak: "break-all" }}
                        >
                          {message.content.split("\n").map((line, index) => (
                            <Fragment key={index}>
                              {line}
                              {index <
                                message.content.split("\n").length - 1 && (
                                <br />
                              )}
                            </Fragment>
                          ))}
                        </Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        sx={{ marginLeft: "0.25rem" }}
                      >
                        {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                        {new Date(message.createdAt).toLocaleDateString()}{" "}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
          <div ref={divRef}></div>
        </InfiniteScroll>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message"
          multiline
          maxRows={4}
          onKeyDown={async (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault(); // Prevent the default action to avoid line break in input
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
