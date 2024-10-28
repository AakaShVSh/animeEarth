import {
  Avatar,
  Box,
  Text,
  VStack,
  Divider,
  Link,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";

const ProfileSidebar = () => {


  useEffect(() => {
    localStorage.setItem("SideBar",JSON.stringify("ProfileSideBar"))
  },[])
  return (
    <Flex height={{ base: "92.9vh", md: "91.9vh", lg: "91.9vh" }} bg="black">
      {/* Sidebar */}
      <Box
        bg="gray.900"
        color="white"
        width={{ base: "40%", md: "22%", lg: "20%" }}
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
        <VStack spacing={4} alignItems="flex-start" w="100%">
          <Link
            fontSize="md"
            href="/Profile/Upload"
            _hover={{ color: "gray.400" }}
          >
            Upload
          </Link>
          <Link fontSize="md" href="#" _hover={{ color: "gray.400" }}>
            Your shows
          </Link>
          <Link fontSize="md" href="/Profile/Dashboard" _hover={{ color: "gray.400" }}>
            Dashboard
          </Link>
          <Link fontSize="md" href="#" _hover={{ color: "gray.400" }}>
            Your Profit
          </Link>
          <Link fontSize="md" href="#" _hover={{ color: "gray.400" }}>
            Edit Profile
          </Link>
        </VStack>
      </Box>

      {/* Main Content Area */}
      <Box flex="1" bg="gray.800"></Box>
    </Flex>
  );
};

export default ProfileSidebar;
