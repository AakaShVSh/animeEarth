import React, { useEffect, useState } from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Main from "./components/Main";
import VoiceCommandControl from "./components/VoiceCommandControl";
import Portal from "./components/helper/Portal";
import { useNavigate } from "react-router-dom";
import { handleGoogleCallback } from "./services/apis/userAuth";

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const success = handleGoogleCallback();
  //   if(success){
  //     navigate("/");
  //   }
  // },[navigate]);
  return (
    <ChakraProvider>
      {/* <Flex>
        {/* <Portal>
        <Sidebar /></Portal> */}
        {/* <Box
          flex="1"
          p=""
          h="100vh"
          css={{
            "::-webkit-scrollbar": {
              display: "none",
            },
            overflow: "scroll", // Hide the scroll bar for this specific component
          }}
 
        > */}
          {/* <TopBar /> */} 
          {/* <VideoGrid /> */}
          {/* <Profile/> */}
          {/* <Dashboard/> */}
          {/* <UploadForm/> */}
          {/* <VideoPlayerUI/> */}
          {/* <SignIn/> */}
          {/* <SignUp/> */}
          {/* <Settings/> */}
          <Main />
        {/* </Box>
      </Flex> */}

      {/* Add this line at the end */}
      {/* <VoiceCommandControl /> */}
    </ChakraProvider>
  );
}

export default App;
