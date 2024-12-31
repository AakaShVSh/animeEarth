// import React from "react";
// import { Flex, Box, Text, Switch, Input, Img } from "@chakra-ui/react";

// function TopBar() {
//   return (
//     <Flex
//       justify="space-between"
//       align="center"
//       bg="blue.900"
//       p="1"
//       color="white"
//       //   borderRadius="md"
//     >
//       <Box ml="8%" w="70%" border="1px solid red">
//         <Input type="search" width="100%" bg="white" name="" id="" />
//       </Box>{" "}
//       <Box ml="3%" w="30%" border="1px solid red">
//         {/* <Input type="search" width="100%" bg="white" name="" id="" /> */}
//         <Box w="20%" border={"1px solid yellow"} alignItems={"right"} borderRadius="50%">
//           <Img
//           borderRadius="50%"
//             src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt=""
//           />
//         </Box>
//       </Box>
//     </Flex>
//   );
// }

// export default TopBar;


import React from "react";
import { Flex, Box, Input, Image, Button} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function TopBar() {
  const searchVideos = (e) => {
        
  }
  return (
    <Flex
      position="sticky"
      top="0" // Sticks the component to the top of the viewport
      zIndex="1000" // Ensures it stays above other content
      justify="space-between"
      align="center"
      // bg="blue.900"
      bg="#0d0503"
      p="2"
      color="white"
    >
      {/* Search Input Box */}
      <Box ml="8%" w="70%">
        <Input onChange={(e) => searchVideos(e)} type="search" width="100%" bg="white" color="GrayText" placeholder="Search..." />
      </Box>

      {/* Profile Image */}
      <Box ml="3%" w="30%" display="flex" justifyContent="flex-end">
        <Box w="50px" h="50px" borderRadius="50%" overflow="hidden">
          <Link to={"Profile"}>
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile Image"
            objectFit="cover"
            width="100%"
            height="100%"
          /></Link>
        </Box>
      </Box>
      <Link to={"/SignIn"}>
        <Button marginLeft="3">Sign In</Button>
      </Link>
      
      <Link to={"/SignUp"}>
        <Button marginLeft="3">Sign Up</Button>
      </Link>
    </Flex>
  );
}

export default TopBar;
