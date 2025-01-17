import { Avatar, Box, Text, HStack, Divider, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileRoute from "./ProfileRoute";
const ProfileSidebar = () => {
  useEffect(() => {
    localStorage.setItem("SideBar", JSON.stringify("ProfileSideBar"));
  }, []);
  return (
    <Flex
      css={{
        "::-webkit-scrollbar": {
          display: "none",
        },
        overflow: "scroll", // Hide the scroll bar for this specific component
      }}
      height={{ base: "92.9vh", md: "91.9vh", lg: "91.9vh" }}
      textAlign="center"
      bg="#0d0503"
      // pb="3"
    >
      {/* Sidebar */}
      <Box
        bg="gray.900"
        color="white"
        width={{ base: "100%", md: "100%", lg: "100%" }}
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
        <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} fontWeight="bold">
          Aakash Vishwakarma
        </Text>
        {/* Divider */}
        <Divider mt={4} mb={4} borderColor="whiteAlpha.600" />
        {/* Menu */}
        <HStack spacing={4} justifyContent={"space-around"}  alignItems="flex-start" width="100%">
          <Link to="#">
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              _hover={{ color: "gray.400" }}
            >
              Your Shows
            </Text>
          </Link>
          <Link to="/Dashboard">
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              _hover={{ color: "gray.400" }}
            >
              Dashboard
            </Text>
          </Link>
          <Link to="#">
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              _hover={{ color: "gray.400" }}
            >
              Downloads
            </Text>
          </Link>
          <Link to="#">
            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              _hover={{ color: "gray.400" }}
            >
              Edit Profile
            </Text>
          </Link>
        </HStack>
        {/* Divider */}
        <Divider mt={4} mb={4} borderColor="whiteAlpha.600" />
        {/* Main Content Area */}
        <Box flex="1" bg="gray.800">
          <ProfileRoute />{" "}
        </Box>
      </Box>
    </Flex>
  );
};

export default ProfileSidebar;
