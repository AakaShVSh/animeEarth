import React, { useEffect, useState } from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Main from "./components/Main";

function App() {
  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />
        <Box
          flex="1"
          p=""
          h="100vh"
          css={{
            "::-webkit-scrollbar": {
              display: "none",
            },
            overflow: "scroll", // Hide the scroll bar for this specific component
          }}
          bg="#0e1525"
        >
          <TopBar />
          {/* <VideoGrid /> */}
          {/* <Profile/> */}
          {/* <Dashboard/> */}
          {/* <UploadForm/> */}
          {/* <VideoPlayerUI/> */}
          {/* <SignIn/> */}
          {/* <SignUp/> */}
          {/* <Settings/> */}
          <Main />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
