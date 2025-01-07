import { Avatar, Box, Text, HStack, Divider, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";import VideoGrid from "./VideoGrid";
const ProfileSidebar = () => {
  useEffect(() => {
    localStorage.setItem("SideBar", JSON.stringify("ProfileSideBar"));
  }, []);
  return (
    <Flex
      height={{ base: "92.9vh", md: "91.9vh", lg: "91.9vh" }}
      textAlign="center"
      bg="#0d0503"
    >
      {/* Sidebar */}
      <Box
        bg="gray.900"
        color="white"
        width={{ base: "40%", md: "22%", lg: "100%" }}
        height="9vh"
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        // justifyContent="center"
      >
        {/* Avatar */}
        <Avatar
          size="2xl"
          name="Aakash Vishwakarma"
          src="/path/to/avatar.jpg" // Replace with your image path
          mb={4}
        />

        {/* Name */}
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          Aakash Vishwakarma
        </Text>

        {/* Divider */}
        <Divider mt={4} mb={4} borderColor="whiteAlpha.600" />

        {/* Menu */}
        <HStack spacing={7} alignItems="flex-start" w="100%">
          {/* <Link
            fontSize="md"
            href="/Upload"
            _hover={{ color: "gray.400" }}
          >
            Upload
          </Link> */}
          <Link to="#">
            <Text fontSize="md" _hover={{ color: "gray.400" }}>
              {" "}
              Your shows
            </Text>
          </Link>
          <Link to="/Dashboard">
            <Text fontSize="md" _hover={{ color: "gray.400" }}>
              Dashboard
            </Text>
          </Link>
          <Link to="#">
            <Text fontSize="md" _hover={{ color: "gray.400" }}>
              Downloads
            </Text>
          </Link>
          <Link to="#">
            <Text fontSize="md" _hover={{ color: "gray.400" }}>
              Edit Profile
            </Text>
          </Link>
        </HStack>
        {/* Divider */}
        <Divider mt={4} mb={4} borderColor="whiteAlpha.600" />
        {/* Main Content Area */}
      <Box flex="1" bg="gray.800"><VideoGrid/></Box>  </Box>

  
    </Flex>
  );
};

export default ProfileSidebar;
