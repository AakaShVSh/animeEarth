// import React, { useEffect, useState } from "react";
// import {
//   Flex,
//   Box,
//   Input,
//   Image,
//   Button,
//   HStack,
//   InputGroup,
//   InputLeftElement,
//   Avatar,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   IconButton,
//   useMediaQuery,
//   Text,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import {
//   FiSearch,
//   FiUpload,
//   FiBell,
//   FiUser,
//   FiSettings,
//   FiLogOut,
// } from "react-icons/fi";
// import { getCookies } from "../services/cookies";
// import Portal from "./helper/Portal";
// import { SignoutApi } from "../services/apis/userAuth";
// // import Portal from "./Portal";

// function TopBar() {
//   const [authToken, setAuthToken] = useState(() => getCookies("AuthToken"));
//   const [isMobile] = useMediaQuery("(max-width: 768px)");

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const updatedCookie = getCookies("AuthToken");
//       if (updatedCookie !== authToken) {
//         setAuthToken(updatedCookie);
//       }
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [authToken]);

//   const TopBarContent = (
//     <Box>
//       {" "}
//       <Flex
//         position="fixed"
//         top="0"
//         w={"100%"}
//         // left={{ base: "0", md: "80px" }} // Space for collapsed sidebar on desktop
//         right="0"
//         zIndex="1000"
//         justify="space-between"
//         align="center"
//         bg="white"
//         borderBottom="1px"
//         borderColor="gray.200"
//         px={{ base: "4", md: "6" }}
//         py="3"
//         boxShadow="sm"
//         transition="left 0.3s ease"
//       >
//         {/* Logo - Hidden on desktop when sidebar is visible */}
//         <Box display={{ base: "block", md: "none" }} mr="4">
//           <Text
//             fontSize="xl"
//             fontWeight="bold"
//             bgGradient="linear(to-r, blue.500, purple.500)"
//             bgClip="text"
//           >
//             VH
//           </Text>
//         </Box>

//         {/* Search Bar - Center on desktop, full width on mobile */}
//         <Box
//           flex="1"
//           maxW={{ base: "100%", md: "600px" }}
//           mx={{ base: "0", md: "auto" }}
//         >
//           <InputGroup size={{ base: "sm", md: "md" }}>
//             <InputLeftElement pointerEvents="none">
//               <FiSearch color="gray" />
//             </InputLeftElement>
//             <Input
//               type="search"
//               bg="gray.50"
//               border="1px"
//               borderColor="gray.300"
//               borderRadius="full"
//               placeholder="Search videos..."
//               _hover={{ borderColor: "gray.400" }}
//               _focus={{
//                 borderColor: "blue.500",
//                 boxShadow: "0 0 0 1px #3182ce",
//                 bg: "white",
//               }}
//             />
//           </InputGroup>
//         </Box>

//         {/* Right Section - Actions and Profile */}
//         <HStack spacing={{ base: "2", md: "4" }} ml="4">
//           {authToken ? (
//             <>
//               {/* Upload Button - Hidden on mobile */}
//               <Link to="/Upload">
//                 <IconButton
//                   icon={<FiUpload />}
//                   aria-label="Upload video"
//                   variant="ghost"
//                   size={{ base: "sm", md: "md" }}
//                   display={{ base: "none", md: "flex" }}
//                   _hover={{ bg: "gray.100" }}
//                 />
//               </Link>

//               {/* Notifications - Hidden on mobile */}
//               <Menu>
//                 <MenuButton
//                   as={IconButton}
//                   icon={<FiBell />}
//                   variant="ghost"
//                   size={{ base: "sm", md: "md" }}
//                   display={{ base: "none", md: "flex" }}
//                   _hover={{ bg: "gray.100" }}
//                   position="relative"
//                 >
//                   {/* Notification Badge */}
//                   <Box
//                     position="absolute"
//                     top="1"
//                     right="1"
//                     w="8px"
//                     h="8px"
//                     bg="red.500"
//                     borderRadius="full"
//                   />
//                 </MenuButton>
//                 <MenuList zIndex="1001">
//                   <MenuItem>No new notifications</MenuItem>
//                 </MenuList>
//               </Menu>

//               {/* Profile Menu */}
//               <Menu>
//                 <MenuButton
//                   as={Box}
//                   cursor="pointer"
//                   _hover={{ opacity: 0.8 }}
//                   transition="opacity 0.2s"
//                 >
//                   <Avatar
//                     size={{ base: "sm", md: "md", lg: "sm" }}
//                     src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                     name="User"
//                     border="2px solid"
//                     borderColor="blue.500"
//                   />
//                 </MenuButton>
//                 <MenuList zIndex="1001">
//                   <Link to="/Profile">
//                     <MenuItem icon={<FiUser />}>Your Profile</MenuItem>
//                   </Link>
//                   <Link to="/Upload">
//                     <MenuItem
//                       icon={<FiUpload />}
//                       display={{ base: "flex", md: "none" }}
//                     >
//                       Upload Video
//                     </MenuItem>
//                   </Link>
//                   <MenuItem icon={<FiSettings />}>Settings</MenuItem>
//                   <MenuDivider />
//                   <MenuItem
//                     onClick={SignoutApi}
//                     icon={<FiLogOut />}
//                     color="red.500"
//                   >
//                     Sign Out
//                   </MenuItem>
//                 </MenuList>
//               </Menu>
//             </>
//           ) : (
//             <HStack spacing="2">
//               <Link to="/SignIn">
//                 <Button
//                   size={{ base: "sm", md: "md" }}
//                   variant="ghost"
//                   colorScheme="blue"
//                   borderRadius="full"
//                   _hover={{ bg: "blue.50" }}
//                 >
//                   Sign In
//                 </Button>
//               </Link>
//               <Link to="/SignUp">
//                 <Button
//                   size={{ base: "sm", md: "md" }}
//                   colorScheme="blue"
//                   borderRadius="full"
//                   boxShadow="sm"
//                   _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
//                   transition="all 0.2s"
//                 >
//                   Sign Up
//                 </Button>
//               </Link>
//             </HStack>
//           )}
//         </HStack>
//       </Flex>
//     </Box>
//   );

//   // Use Portal to render TopBar at body level to prevent overlap
//   return <Portal>{TopBarContent}</Portal>;
// }

// export default TopBar;

import React, { useEffect, useState, useCallback } from "react";
import {
  Flex,
  Box,
  Input,
  Button,
  HStack,
  InputGroup,
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUpload,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import Portal from "./helper/Portal";
import { SignoutApi, isAuthenticated } from "../services/apis/userAuth";

function TopBar() {
  const [loggedIn, setLoggedIn] = useState(() => isAuthenticated());
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  // Poll isLoggedIn cookie every second (fast, no network request needed)
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentStatus = isAuthenticated();
      if (currentStatus !== loggedIn) {
        setLoggedIn(currentStatus);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [loggedIn]);

  const handleSignout = useCallback(async () => {
    await SignoutApi();
    setLoggedIn(false);
    navigate("/");
  }, [navigate]);

<<<<<<< HEAD
  const TopBarContent = (
    <Box>
      <Flex
        position="fixed"
        top="0"
        w="100%"
        right="0"
        zIndex="1000"
        justify="space-between"
        align="center"
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        px={{ base: "4", md: "6" }}
        py="3"
        boxShadow="sm"
        transition="left 0.3s ease"
      >
        {/* Logo */}
        <Box display={{ base: "block", md: "none" }} mr="4">
          <Text
            fontSize="xl"
            fontWeight="bold"
            bgGradient="linear(to-r, blue.500, purple.500)"
            bgClip="text"
          >
            VH
          </Text>
        </Box>
=======
  return (
    <Flex 
      position="sticky"
      gap="70px"
      top="0"
      zIndex="1000"
      justify="space-between"
      align="center"
      bg="#0d0503"
      p="2"
      color="white"
    >
      {/* Search Input Box */}
      <Box ml="8%" w="70%" h="44px">
        <Input
          type="search"
          width="100%"
          bg="white"
          color="gray.700"
          placeholder="Search..."
          aria-label="Search videos"
        />
      </Box>
>>>>>>> 9adf1f3b424eaf9756e48732b75e2d3ece328434

        {/* Search Bar */}
        <Box
          flex="1"
          maxW={{ base: "100%", md: "600px" }}
          mx={{ base: "0", md: "auto" }}
        >
          <InputGroup size={{ base: "sm", md: "md" }}>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray" />
            </InputLeftElement>
            <Input
              type="search"
              bg="gray.50"
              border="1px"
              borderColor="gray.300"
              borderRadius="full"
              placeholder="Search videos..."
              _hover={{ borderColor: "gray.400" }}
              _focus={{
                borderColor: "blue.500",
                boxShadow: "0 0 0 1px #3182ce",
                bg: "white",
              }}
            />
          </InputGroup>
        </Box>

        {/* Right Section */}
        <HStack spacing={{ base: "2", md: "4" }} ml="4">
          {loggedIn ? (
            <>
              <Link to="/Upload">
                <IconButton
                  icon={<FiUpload />}
                  aria-label="Upload video"
                  variant="ghost"
                  size={{ base: "sm", md: "md" }}
                  display={{ base: "none", md: "flex" }}
                  _hover={{ bg: "gray.100" }}
                />
              </Link>

              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiBell />}
                  variant="ghost"
                  size={{ base: "sm", md: "md" }}
                  display={{ base: "none", md: "flex" }}
                  _hover={{ bg: "gray.100" }}
                />
                <MenuList zIndex="1001">
                  <MenuItem>No new notifications</MenuItem>
                </MenuList>
              </Menu>

              <Menu>
                <MenuButton
                  as={Box}
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                  transition="opacity 0.2s"
                >
                  <Avatar
                    size={{ base: "sm", md: "md", lg: "sm" }}
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470"
                    name="User"
                    border="2px solid"
                    borderColor="blue.500"
                  />
                </MenuButton>
                <MenuList zIndex="1001">
                  <Link to="/Profile">
                    <MenuItem icon={<FiUser />}>Your Profile</MenuItem>
                  </Link>
                  <Link to="/Upload">
                    <MenuItem
                      icon={<FiUpload />}
                      display={{ base: "flex", md: "none" }}
                    >
                      Upload Video
                    </MenuItem>
                  </Link>
                  <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={handleSignout}
                    icon={<FiLogOut />}
                    color="red.500"
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <HStack spacing="2">
              <Link to="/SignIn">
                <Button
                  size={{ base: "sm", md: "md" }}
                  variant="ghost"
                  colorScheme="blue"
                  borderRadius="full"
                  _hover={{ bg: "blue.50" }}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/SignUp">
                <Button
                  size={{ base: "sm", md: "md" }}
                  colorScheme="blue"
                  borderRadius="full"
                  boxShadow="sm"
                  _hover={{ transform: "translateY(-1px)", boxShadow: "md" }}
                  transition="all 0.2s"
                >
                  Sign Up
                </Button>
              </Link>
            </HStack>
          )}
        </HStack>
      </Flex>
    </Box>
  );

  return <Portal>{TopBarContent}</Portal>;
}

export default TopBar;