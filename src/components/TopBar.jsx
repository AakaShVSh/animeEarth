import React, { useEffect, useState } from "react";
import { Flex, Box, Input, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getCookies } from "../services/cookies";

function TopBar() {
  const [authToken, setAuthToken] = useState(() => getCookies("AuthToken"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedCookie = getCookies("AuthToken");
      if (updatedCookie !== authToken) {
        setAuthToken(updatedCookie);
      }
    }, 1000); // Polling interval in milliseconds (adjust as needed)

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [authToken]);

  return (
    <Flex 
      position="sticky"
      gap="70px"
      h="44px"
      top="0"
      zIndex="1000"
      justify="space-between"
      align="center"
      bg="#0d0503"
      p="2"
      color="white"
    >
      {/* Search Input Box */}
      <Box ml="8%" w="70%">
        <Input
          type="search"
          width="100%"
          bg="white"
          color="gray.700"
          placeholder="Search..."
          aria-label="Search videos"
        />
      </Box>

      <Box ml="3%" w="30%" display="flex" justifyContent="flex-end">
        {authToken ? (
          <Box w="50px" h="50px" borderRadius="50%" overflow="hidden">
            <Link to="/Profile">
              <Image
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Profile"
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Link>
          </Box>
        ) : (
          <Flex gap="10px">
            <Link to="/SignIn">
              <Button fontSize="16px" height="44px" p="4px">Sign In</Button>
            </Link>
            <Link to="/SignUp">
              <Button fontSize="sm">Sign Up</Button>
            </Link>
          </Flex>
        )}
      </Box>
    </Flex>
  );
}

export default TopBar;
