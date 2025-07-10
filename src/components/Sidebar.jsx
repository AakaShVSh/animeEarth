import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  IconButton,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiTrendingUp,
  FiUpload,
  FiVideo,
  FiMenu,
  FiX,
} from "react-icons/fi";
import {
  MdPrivacyTip,
  MdPolicy,
  MdVideogameAsset,
  MdSchool,
  MdSportsEsports,
  MdPalette,
  MdMovie,
} from "react-icons/md";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)"); // Detects phones or tablets

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const menuItems = [
    { label: "Home", icon: FiHome, link: "/" },
    { label: "New Videos", icon: FiVideo },
    { label: "Upload Video", icon: FiUpload, link: "/Upload" },
    { label: "Top Videos", icon: FiTrendingUp, link: "/trending" },
    { label: "Creator Movies", icon: MdMovie },
    { label: "Education Videos", icon: MdSchool },
    { label: "Entertainment Videos", icon: MdSportsEsports },
    { label: "Gaming Videos", icon: MdVideogameAsset },
    { label: "Art Videos", icon: MdPalette },
    { label: "Privacy", icon: MdPrivacyTip },
    { label: "Policy", icon: MdPolicy },
  ];

  if (isMobile) {
    return (
      <Box position="relative" h="100vh">
        {/* Mobile Bottom Navigation */}
        <Box
          position="fixed"
          bottom="0"
          left="0"
          w="100%"
          bg="gray.800"
          p="3"
          zIndex="10"
          boxShadow="md"
          overflowX="auto" // Enable horizontal scrolling
          whiteSpace="nowrap" // Prevent items from wrapping
        >
          <HStack spacing="4" minWidth="max-content">
            {menuItems.map((item, index) => (
              <Link key={index} to={item.link || "#"}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  color="white"
                  _hover={{ color: "#00c4ff" }}
                  flex="0 0 auto" // Prevent shrinking
                  px="2" // Add horizontal padding
                >
                  <Box as={item.icon} fontSize="24px" />
                  <Text fontSize="xs" mt="1">
                    {item.label}
                  </Text>
                </Box>
              </Link>
            ))}
          </HStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box position="relative" h="100vh">
      {/* Toggle Button */}
      <IconButton
        icon={isOpen ? <FiX /> : <FiMenu />}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        position="absolute"
        top="96vh"
        left={isOpen ? "230px" : "10px"}
        transform="translateY(-50%)"
        zIndex="10"
        bg="gray.800"
        color="white"
        _hover={{ bg: "gray.700" }}
      />

      {/* Sidebar */}
      <Box
        bg="#0d0503"
        color="white"
        w={isOpen ? "220px" : "60px"}
        h="100vh"
        p={isOpen ? "5" : "2"}
        transition="width 0.3s ease-in-out"
        //overflow="hidden"
      >
        <VStack spacing="4"  align={isOpen ? "start" : "center"}>
          {menuItems.map((item, index) => (
            <Link key={index} to={item.link || "#"}>
              <Text
                display="flex"
                alignItems="center"
                gap="2"
                _hover={{
                  transform: "scale(1.2)",
                  transition: "0.3s ease-in-out",
                }}
                cursor="pointer"
                fontSize={isOpen ? "md" : "sm"}
              >
                <Box
                  as={item.icon}
                  fontSize={isOpen ? "20px" : "28px"}
                  _hover={{ color: "#00c4ff" }}
                />
                {isOpen && item.label}
              </Text>
            </Link>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}

export default Sidebar;
