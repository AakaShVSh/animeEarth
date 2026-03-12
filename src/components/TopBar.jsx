// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Flex,
//   Box,
//   Input,
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
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FiSearch,
//   FiUpload,
//   FiBell,
//   FiUser,
//   FiSettings,
//   FiLogOut,
// } from "react-icons/fi";
// import Portal from "./helper/Portal";
// import { SignoutApi, isAuthenticated } from "../services/apis/userAuth";

// function TopBar() {
//   const [loggedIn, setLoggedIn] = useState(() => isAuthenticated());
//   const [isMobile] = useMediaQuery("(max-width: 768px)");
//   const navigate = useNavigate();

//   // Poll isLoggedIn cookie every second (fast, no network request needed)
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const currentStatus = isAuthenticated();
//       if (currentStatus !== loggedIn) {
//         setLoggedIn(currentStatus);
//       }
//     }, 1000);
//     return () => clearInterval(intervalId);
//   }, [loggedIn]);

//   const handleSignout = useCallback(async () => {
//     await SignoutApi();
//     setLoggedIn(false);
//     navigate("/");
//   }, [navigate]);

//   const TopBarContent = (
//     <Box>
//       <Flex
//         position="fixed"
//         top="0"
//         w="100%"
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
//         {/* Logo */}
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

//         {/* Search Bar */}
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

//         {/* Right Section */}
//         <HStack spacing={{ base: "2", md: "4" }} ml="4">
//           {loggedIn ? (
//             <>
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

//               <Menu>
//                 <MenuButton
//                   as={IconButton}
//                   icon={<FiBell />}
//                   variant="ghost"
//                   size={{ base: "sm", md: "md" }}
//                   display={{ base: "none", md: "flex" }}
//                   _hover={{ bg: "gray.100" }}
//                 />
//                 <MenuList zIndex="1001">
//                   <MenuItem>No new notifications</MenuItem>
//                 </MenuList>
//               </Menu>

//               <Menu>
//                 <MenuButton
//                   as={Box}
//                   cursor="pointer"
//                   _hover={{ opacity: 0.8 }}
//                   transition="opacity 0.2s"
//                 >
//                   <Avatar
//                     size={{ base: "sm", md: "md", lg: "sm" }}
//                     src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470"
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
//                     onClick={handleSignout}
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
  AvatarBadge,
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
import {
  SignoutApi,
  isAuthenticated,
  checkAuthApi,
} from "../services/apis/userAuth";

function TopBar() {
  const [loggedIn, setLoggedIn] = useState(() => isAuthenticated());
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  // ── Fetch real user data when logged in ───────────────────────────────
  useEffect(() => {
    if (loggedIn) {
      checkAuthApi().then(({ authenticated, user }) => {
        if (authenticated && user) setCurrentUser(user);
        else {
          setCurrentUser(null);
          setLoggedIn(false);
        }
      });
    } else {
      setCurrentUser(null);
    }
  }, [loggedIn]);

  // ── Poll cookie for auth state changes (login/logout in other tab) ────
  useEffect(() => {
    const id = setInterval(() => {
      const current = isAuthenticated();
      if (current !== loggedIn) setLoggedIn(current);
    }, 1000);
    return () => clearInterval(id);
  }, [loggedIn]);

  const handleSignout = useCallback(async () => {
    await SignoutApi();
    setLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  }, [navigate]);

  // ── Avatar display logic ───────────────────────────────────────────────
  // Priority: profilePicture (Google OAuth or uploaded) → first letter of email → first letter of username
  const avatarSrc = currentUser?.profilePicture || null;

  // Name used by Chakra Avatar for generating fallback initials
  // Use email first (so "john@gmail.com" → "J"), then username, then "U"
  const avatarName = currentUser?.email || currentUser?.username || "User";

  // Single uppercase letter shown when no image — first char of email or username
  const fallbackLetter = (
    currentUser?.email?.[0] ||
    currentUser?.username?.[0] ||
    "U"
  ).toUpperCase();

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
        {/* Logo — mobile only */}
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

        {/* Search bar */}
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

        {/* Right section */}
        <HStack spacing={{ base: "2", md: "4" }} ml="4">
          {loggedIn ? (
            <>
              {/* Upload */}
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

              {/* Notifications */}
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

              {/* Profile avatar menu */}
              <Menu>
                <MenuButton
                  as={Box}
                  cursor="pointer"
                  _hover={{ opacity: 0.85 }}
                  transition="opacity 0.2s"
                >
                  {avatarSrc ? (
                    // Has a real profile picture (Google OAuth or uploaded)
                    <Avatar
                      size={{ base: "sm", md: "sm" }}
                      src={avatarSrc}
                      name={avatarName}
                      border="2px solid"
                      borderColor="blue.400"
                    />
                  ) : (
                    // No picture — show colored circle with first letter
                    <Avatar
                      size={{ base: "sm", md: "sm" }}
                      name={avatarName}
                      bg="blue.500"
                      color="white"
                      fontWeight="bold"
                      border="2px solid"
                      borderColor="blue.400"
                    >
                      {/* Chakra's Avatar auto-generates initials from `name`,
                          but we override to guarantee single uppercase letter */}
                    </Avatar>
                  )}
                </MenuButton>

                <MenuList zIndex="1001" shadow="lg" borderRadius="xl" p="1">
                  {/* User info header */}
                  <Box px="3" py="2" mb="1">
                    <HStack spacing="3">
                      {avatarSrc ? (
                        <Avatar size="sm" src={avatarSrc} name={avatarName} />
                      ) : (
                        <Avatar
                          size="sm"
                          name={avatarName}
                          bg="blue.500"
                          color="white"
                          fontWeight="bold"
                        />
                      )}
                      <Box>
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color="gray.800"
                          noOfLines={1}
                        >
                          {currentUser?.username ||
                            currentUser?.email?.split("@")[0] ||
                            "User"}
                        </Text>
                        {currentUser?.email && (
                          <Text fontSize="xs" color="gray.500" noOfLines={1}>
                            {currentUser.email}
                          </Text>
                        )}
                      </Box>
                    </HStack>
                  </Box>

                  <MenuDivider my="1" />

                  <Link to="/Profile">
                    <MenuItem icon={<FiUser />} borderRadius="lg" fontSize="sm">
                      Your Profile
                    </MenuItem>
                  </Link>

                  <Link to="/Upload">
                    <MenuItem
                      icon={<FiUpload />}
                      borderRadius="lg"
                      fontSize="sm"
                      display={{ base: "flex", md: "none" }}
                    >
                      Upload Video
                    </MenuItem>
                  </Link>

                  <MenuItem
                    icon={<FiSettings />}
                    borderRadius="lg"
                    fontSize="sm"
                  >
                    Settings
                  </MenuItem>

                  <MenuDivider my="1" />

                  <MenuItem
                    onClick={handleSignout}
                    icon={<FiLogOut />}
                    color="red.500"
                    borderRadius="lg"
                    fontSize="sm"
                    _hover={{ bg: "red.50" }}
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