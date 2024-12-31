import React from "react";
import { Box, Button, HStack, VStack, Text, Avatar } from "@chakra-ui/react";
import { FaRegCommentAlt, FaRegShareSquare } from "react-icons/fa";
import { GrLike, GrDislike } from "react-icons/gr";
import { LuSave } from "react-icons/lu";
import { RiDownload2Fill } from "react-icons/ri";
import VideoPlayerDisplay from "./VideoPlayerDisplay";
const VideoPlayerUI = () => {
  return (
    <Box p={5} borderRadius="md">
      {/* Video Player Section */}
      <VideoPlayerDisplay />

      {/* User and Follow Section */}
      <HStack
        justifyContent="space-between"
        bg="gray.200"
        borderRightRadius="10px"
        borderLeftRadius="50"
        mb={4}
      >
        <HStack>
          <Avatar src="https://bit.ly/code-beast" name="CoderWalaGyan" />
          <Text fontSize="lg" fontWeight="bold">
            CoderWalaGyan
          </Text>
        </HStack>

        {/* icons */}
        <FaRegCommentAlt />
        <GrLike />
        <GrDislike />
        <FaRegShareSquare />
        <LuSave />
        <RiDownload2Fill />
        <Button colorScheme="blue" mr="1">
          Follow
        </Button>
      </HStack>

      {/* Posts and Comments Section */}
      <HStack alignItems="flex-start">
        {/* Posts Section */}
        <VStack
          align="start"
          flex="1"
          spacing={2}
          bg="gray.200"
          p="1%"
          w="100%"
          // borderRightRadius="10px"
          // borderLeftRadius="50"
        >
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>{" "}
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>{" "}
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>{" "}
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>{" "}
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>{" "}
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>{" "}
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>{" "}
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>{" "}
          <Box bg="blue.400" p="1" borderRadius="md" w="100%">
            {/* video box */}
            <Box
              bg="gray.400"
              h="200px"
              mb={2}
              // display="flex"
              borderRadius="2"
            ></Box>{" "}
            <HStack alignItems="flex-start" spacing={2}>
              <Avatar
                size="sm"
                src="https://bit.ly/code-beast"
                name="CoderWalaGyan"
              />
              <Text>Such a wonderful video I have watched</Text>
            </HStack>
            {/* <Text color="white">Such a wonderful video I have watched</Text> */}
          </Box>
        </VStack>

        {/* Comments Section */}
        <VStack display={""} align="start" flex="1" spacing={4}>
          <Text fontWeight="bold" mb={2}>
            Comments
          </Text>
          <HStack alignItems="flex-start" spacing={2}>
            <Avatar
              size="sm"
              src="https://bit.ly/code-beast"
              name="CoderWalaGyan"
            />
            <Text>Such a wonderful video I have watched</Text>
          </HStack>
          <HStack alignItems="flex-start" spacing={2}>
            <Avatar
              size="sm"
              src="https://bit.ly/code-beast"
              name="CoderWalaGyan"
            />
            <Text>Such a wonderful video I have watched</Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default VideoPlayerUI;
