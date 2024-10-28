import React from "react";
import { Box, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      // bg="blue.900"
      bg="#0d0503"
      color="white"
      w="200px"
      h="100vh"
      p="5"
    >
      <VStack spacing="4" align="start">
        <Link to={"/"}>
          <Text
            _hover={{
              transform: "scale(1.2)",
              transition: "0.5s ease-in-out",
            }}
            cursor="pointer"
          >
            Home
          </Text>
        </Link>{" "}
        <Link to={"/"}>
          {" "}
          <Text
            _hover={{
              transform: "scale(1.2)",
              transition: "0.5s ease-in-out",
            }}
            cursor="pointer"
          >
            Trending
          </Text>
        </Link>
        <Text
          _hover={{
            transform: "scale(1.2)",
            transition: "0.5s ease-in-out",
          }}
          cursor="pointer"
        >
          New Videos
        </Text>
        <Text
          _hover={{
            transform: "scale(1.2)",
            transition: "0.5s ease-in-out",
          }}
          cursor="pointer"
        >
          Gaming Videos
        </Text>
        <Text
          _hover={{
            transform: "scale(1.2)",
            transition: "0.5s ease-in-out",
          }}
          cursor="pointer"
        >
          Upload Video
        </Text>
        <Text
          _hover={{
            transform: "scale(1.2)",
            transition: "0.5s ease-in-out",
          }}
          cursor="pointer"
        >
          Privacy
        </Text>
        <Text
          _hover={{
            transform: "scale(1.2)",
            transition: "0.5s ease-in-out",
          }}
          cursor="pointer"
        >
          Policy
        </Text>
        {/* <Text
          _hover={{
            transform: "scale(1.2)",
            transition: "0.5s ease-in-out",
          }}
          cursor="pointer"
        >
          Setting
        </Text> */}
      </VStack>
    </Box>
  );
}

export default Sidebar;
