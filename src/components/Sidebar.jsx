import React, { useState } from "react";
import { Box, VStack, IconButton, Text, useMediaQuery } from "@chakra-ui/react";
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
        overflow="hidden"
      >
        <VStack spacing="4" align={isOpen ? "start" : "center"}>
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
                  fontSize={
                    isOpen
                      ? isMobile
                        ? "18px" // Smaller icon size for open sidebar on mobile
                        : "20px" // Default icon size for open sidebar
                      : "28px" // Larger icon size for closed sidebar
                  }
                  _hover={{ color: "#00c4ff" }} // Hover color change
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
