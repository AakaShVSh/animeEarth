// // src/App.js
// import React, { useState } from "react";
// import axios from "axios";
// import app from './App.css'
// function App() {
//   const [prompt, setPrompt] = useState("");
//   const [script, setScript] = useState("");
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/generate-script",
//         { prompt }
//       );
//       setScript(response.data.script);
//       setError(null); // Clear any previous errors
//     } catch (error) {
//       setError("Error generating script: " + error.message);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Script Writer</h1>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Enter your prompt here"
//         />
//         <button type="submit">Generate Script</button>
//       </form>
//       {error && <div style={{ color: "red" }}>{error}</div>}
//       {script && (
//         <div>
//           <h2>Generated Script:</h2>
//           <p>{script}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;




import React, { useEffect, useState } from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import VideoGrid from "./components/VideoGrid";
import TopBar from "./components/TopBar";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import UploadForm from "./components/UploadForm";
import VideoPlayerUI from "./components/VideoPlayer";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Settings from "./components/Setting";
import Main from "./components/Main";

function App() {
  const [sideBar,SetSideBar] = useState("");
  

  useEffect(() => {
    const bar = localStorage.getItem("SideBar");
    SetSideBar(bar);
    
  },[])
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
          <Main/>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
