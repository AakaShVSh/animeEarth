// import React, { useState } from "react";
// import {
//   Box,
//   HStack,
//   VStack,
//   IconButton,
//   Text,
//   useMediaQuery,
//   Divider,
//   Collapse,
//   Tooltip,
// } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import {
//   FiHome,
//   FiTrendingUp,
//   FiUpload,
//   FiMenu,
//   FiX,
//   FiClock,
//   FiThumbsUp,
//   FiPlayCircle,
// } from "react-icons/fi";
// import { MdPrivacyTip, MdPolicy } from "react-icons/md";
// import { BsBookmarkFill, BsCollectionPlay } from "react-icons/bs";
// import { RiHistoryLine } from "react-icons/ri";

// function Sidebar({ isExpanded, onToggle }) {
//   // ← receive from parent
//   const [isMobile] = useMediaQuery("(max-width: 768px)");
//   const [showLibrary, setShowLibrary] = useState(true);

//   // Use prop instead of internal state
//   const isOpen = isExpanded;

//   const mainMenuItems = [
//     { label: "Home", icon: FiHome, link: "/" },
//     { label: "Trending", icon: FiTrendingUp, link: "/trending" },
//     { label: "Upload", icon: FiUpload, link: "/Upload" },
//     { label: "Subscriptions", icon: FiPlayCircle, link: "/subscriptions" },
//   ];

//   const libraryItems = [
//     { label: "History", icon: RiHistoryLine, link: "/history" },
//     { label: "Watch Later", icon: FiClock, link: "/watch-later" },
//     { label: "Liked Videos", icon: FiThumbsUp, link: "/liked" },
//     { label: "Saved", icon: BsBookmarkFill, link: "/saved" },
//     { label: "Playlists", icon: BsCollectionPlay, link: "/playlists" },
//   ];

//   const footerItems = [
//     { label: "Privacy", icon: MdPrivacyTip, link: "/privacy" },
//     { label: "Terms", icon: MdPolicy, link: "/terms" },
//   ];

//   const MenuItem = ({ item, fontSize = "20px" }) => (
//     <Link to={item.link || "#"} style={{ width: "100%" }}>
//       <Tooltip
//         label={item.label}
//         placement="right"
//         isDisabled={isOpen}
//         hasArrow
//         bg="gray.700"
//       >
//         <HStack
//           spacing={isOpen ? "3" : "0"}
//           p="3"
//           borderRadius="lg"
//           cursor="pointer"
//           justify={isOpen ? "flex-start" : "center"}
//           _hover={{
//             bg: "blue.50",
//             color: "blue.600",
//             transform: "translateX(2px)",
//           }}
//           transition="all 0.2s"
//         >
//           <Box as={item.icon} fontSize={fontSize} minW={fontSize} />
//           {isOpen && (
//             <Text fontWeight="medium" fontSize="sm" noOfLines={1}>
//               {item.label}
//             </Text>
//           )}
//         </HStack>
//       </Tooltip>
//     </Link>
//   );

//   // Mobile bottom nav
//   if (isMobile) {
//     return (
//       <Box
//         position="fixed"
//         bottom="0"
//         left="0"
//         right="0"
//         bg="white"
//         borderTop="2px"
//         borderColor="gray.200"
//         p="2"
//         zIndex="100"
//         boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
//       >
//         <HStack spacing="0" justify="space-around">
//           {mainMenuItems.map((item, index) => (
//             <Link key={index} to={item.link || "#"}>
//               <VStack
//                 spacing="1"
//                 color="gray.600"
//                 _hover={{ color: "blue.500" }}
//                 transition="all 0.2s"
//                 px="3"
//                 py="1"
//                 minW="60px"
//               >
//                 <Box as={item.icon} fontSize="24px" />
//                 <Text fontSize="10px" fontWeight="medium" noOfLines={1}>
//                   {item.label}
//                 </Text>
//               </VStack>
//             </Link>
//           ))}
//         </HStack>
//       </Box>
//     );
//   }

//   return (
//     <>
//       {/* Toggle Button */}
//       <IconButton
//         icon={isOpen ? <FiX /> : <FiMenu />}
//         onClick={onToggle} // ← use parent's toggle
//         aria-label="Toggle Sidebar"
//         position="fixed"
//         top="730px"
//         left={isOpen ? "290px" : "60px"}
//         zIndex="1001"
//         bg="white"
//         color="gray.700"
//         size="md"
//         borderRadius="full"
//         boxShadow="lg"
//         _hover={{ bg: "gray.100", transform: "scale(1.05)" }}
//         _active={{ transform: "scale(0.95)" }}
//         transition="all 0.3s ease"
//       />

//       {/* Sidebar */}
//       <Box
//         bg="white"
//         color="gray.700"
//         w={isOpen ? "280px" : "80px"}
//         h="100%"
//         position="fixed"
//         left="0"
//         top="0"
//         transition="width 0.3s ease" // ← matches MainLayout transition
//         overflow="hidden"
//         borderRight="1px"
//         borderColor="gray.200"
//         boxShadow="lg"
//         zIndex="999"
//       >
//         <VStack
//           spacing="0"
//           align="stretch"
//           h="100%"
//           overflowY="auto"
//           overflowX="hidden"
//           css={{
//             "&::-webkit-scrollbar": { width: "6px" },
//             "&::-webkit-scrollbar-track": { background: "transparent" },
//             "&::-webkit-scrollbar-thumb": {
//               background: "#cbd5e0",
//               borderRadius: "3px",
//             },
//             "&::-webkit-scrollbar-thumb:hover": { background: "#a0aec0" },
//           }}
//         >
//           <Box
//             p={isOpen ? "6" : "4"}
//             pt="50"
//             textAlign={isOpen ? "left" : "center"}
//           />

//           {/* Main Menu */}
//           <VStack spacing="1" align="stretch" px={isOpen ? "3" : "2"} mb="4">
//             {mainMenuItems.map((item, index) => (
//               <MenuItem key={index} item={item} />
//             ))}
//           </VStack>

//           <Divider />

//           {/* Library */}
//           <Box px={isOpen ? "3" : "2"} py="2">
//             {isOpen ? (
//               <>
//                 <HStack
//                   justify="space-between"
//                   cursor="pointer"
//                   onClick={() => setShowLibrary(!showLibrary)}
//                   p="2"
//                   borderRadius="md"
//                   _hover={{ bg: "gray.50" }}
//                 >
//                   <Text
//                     fontSize="xs"
//                     fontWeight="bold"
//                     color="gray.600"
//                     letterSpacing="wide"
//                   >
//                     LIBRARY
//                   </Text>
//                   <Text fontSize="xs" color="gray.400">
//                     {showLibrary ? "▼" : "▶"}
//                   </Text>
//                 </HStack>
//                 <Collapse in={showLibrary}>
//                   <VStack spacing="1" align="stretch" mt="2">
//                     {libraryItems.map((item, index) => (
//                       <MenuItem key={index} item={item} fontSize="18px" />
//                     ))}
//                   </VStack>
//                 </Collapse>
//               </>
//             ) : (
//               <VStack spacing="1" align="stretch">
//                 {libraryItems.map((item, index) => (
//                   <MenuItem key={index} item={item} fontSize="18px" />
//                 ))}
//               </VStack>
//             )}
//           </Box>

//           <Divider />

//           {/* Footer */}
//           <VStack
//             spacing="1"
//             align="stretch"
//             px={isOpen ? "3" : "2"}
//             py="4"
//             mt="auto"
//           >
//             {footerItems.map((item, index) => (
//               <Tooltip
//                 key={index}
//                 label={item.label}
//                 placement="right"
//                 isDisabled={isOpen}
//                 hasArrow
//                 bg="gray.700"
//               >
//                 <Link to={item.link || "#"} style={{ width: "100%" }}>
//                   <HStack
//                     spacing={isOpen ? "3" : "0"}
//                     p={isOpen ? "2" : "3"}
//                     borderRadius="lg"
//                     cursor="pointer"
//                     justify={isOpen ? "flex-start" : "center"}
//                     _hover={{ bg: "gray.50" }}
//                     fontSize="sm"
//                     color="gray.500"
//                     transition="all 0.2s"
//                   >
//                     <Box as={item.icon} fontSize="16px" minW="16px" />
//                     {isOpen && <Text noOfLines={1}>{item.label}</Text>}
//                   </HStack>
//                 </Link>
//               </Tooltip>
//             ))}
//             {isOpen && (
//               <Text
//                 fontSize="xs"
//                 color="gray.400"
//                 pt="2"
//                 px="2"
//                 textAlign="center"
//               >
//                 © 2026 VideoHub
//               </Text>
//             )}
//           </VStack>
//         </VStack>
//       </Box>
//     </>
//   );
// }

// export default Sidebar;

import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  IconButton,
  Text,
  useMediaQuery,
  Divider,
  Collapse,
  Tooltip,
  Badge,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiTrendingUp,
  FiUpload,
  FiMenu,
  FiX,
  FiPlayCircle,
} from "react-icons/fi";
import { MdPrivacyTip, MdPolicy, MdNotifications } from "react-icons/md";
import { BsBookmarkFill, BsCollectionPlay } from "react-icons/bs";
import { RiHistoryLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";

function Sidebar({ isExpanded, onToggle, unreadNotifications = 0 }) {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [showLibrary, setShowLibrary] = useState(true);
  const location = useLocation();
  const isOpen = isExpanded;

  const mainMenuItems = [
    { label: "Home", icon: FiHome, link: "/" },
    { label: "Trending", icon: FiTrendingUp, link: "/Trending" },
    { label: "Upload", icon: FiUpload, link: "/Upload" },
    { label: "Following", icon: FiPlayCircle, link: "/subscriptions" },
  ];

  // Our new terminology: Rewind (history), Queue (watch later),
  // Reels (liked), Stash (saved), Vaults (playlists)
  const libraryItems = [
    { label: "Rewind", icon: RiHistoryLine, link: "/rewind" },
    { label: "Queue", icon: MdOutlineWatchLater, link: "/queue" },
    { label: "Reels", icon: AiFillLike, link: "/reels" },
    { label: "Stash", icon: BsBookmarkFill, link: "/stash" },
    { label: "Vaults", icon: BsCollectionPlay, link: "/vaults" },
  ];

  const footerItems = [
    {
      label: "Alerts",
      icon: MdNotifications,
      link: "/notifications",
      badge: unreadNotifications,
    },
    { label: "Privacy", icon: MdPrivacyTip, link: "/privacy" },
    { label: "Terms", icon: MdPolicy, link: "/terms" },
  ];

  const isActive = (link) => location.pathname === link;

  const MenuItem = ({ item, fontSize = "20px" }) => (
    <Link to={item.link || "#"} style={{ width: "100%" }}>
      <Tooltip
        label={item.label}
        placement="right"
        isDisabled={isOpen}
        hasArrow
        bg="gray.800"
      >
        <HStack
          spacing={isOpen ? "3" : "0"}
          p="3"
          borderRadius="lg"
          cursor="pointer"
          justify={isOpen ? "flex-start" : "center"}
          bg={isActive(item.link) ? "purple.50" : "transparent"}
          color={isActive(item.link) ? "purple.600" : "inherit"}
          _hover={{
            bg: "purple.50",
            color: "purple.600",
            transform: "translateX(2px)",
          }}
          transition="all 0.2s"
          position="relative"
        >
          <Box as={item.icon} fontSize={fontSize} minW={fontSize} />
          {isOpen && (
            <Text
              fontWeight={isActive(item.link) ? "semibold" : "medium"}
              fontSize="sm"
              noOfLines={1}
              flex="1"
            >
              {item.label}
            </Text>
          )}
          {/* Notification badge */}
          {item.badge > 0 && (
            <Badge
              colorScheme="red"
              borderRadius="full"
              fontSize="9px"
              minW="18px"
              h="18px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position={isOpen ? "static" : "absolute"}
              top={isOpen ? "auto" : "6px"}
              right={isOpen ? "auto" : "6px"}
            >
              {item.badge > 9 ? "9+" : item.badge}
            </Badge>
          )}
        </HStack>
      </Tooltip>
    </Link>
  );

  // ── Mobile bottom nav ────────────────────────────────────────────────
  if (isMobile) {
    return (
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        borderTop="1px"
        borderColor="gray.200"
        p="1"
        zIndex="100"
        boxShadow="0 -2px 16px rgba(0,0,0,0.08)"
      >
        <HStack spacing="0" justify="space-around">
          {mainMenuItems.slice(0, 4).map((item, i) => (
            <Link key={i} to={item.link || "#"}>
              <VStack
                spacing="0.5"
                px="2"
                py="2"
                minW="54px"
                color={isActive(item.link) ? "purple.600" : "gray.500"}
                _hover={{ color: "purple.600" }}
                transition="all 0.2s"
              >
                <Box as={item.icon} fontSize="22px" />
                <Text fontSize="9px" fontWeight="medium" noOfLines={1}>
                  {item.label}
                </Text>
              </VStack>
            </Link>
          ))}
          <Link to="/notifications">
            <VStack
              spacing="0.5"
              px="2"
              py="2"
              minW="54px"
              position="relative"
              color={isActive("/notifications") ? "purple.600" : "gray.500"}
              _hover={{ color: "purple.600" }}
              transition="all 0.2s"
            >
              <Box as={MdNotifications} fontSize="22px" />
              {unreadNotifications > 0 && (
                <Badge
                  position="absolute"
                  top="1"
                  right="1"
                  colorScheme="red"
                  borderRadius="full"
                  fontSize="8px"
                  minW="15px"
                  h="15px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {unreadNotifications}
                </Badge>
              )}
              <Text fontSize="9px" fontWeight="medium">
                Alerts
              </Text>
            </VStack>
          </Link>
        </HStack>
      </Box>
    );
  }

  // ── Desktop sidebar ──────────────────────────────────────────────────
  return (
    <>
      {/* Toggle button */}
      <IconButton
        icon={isOpen ? <FiX /> : <FiMenu />}
        onClick={onToggle}
        aria-label="Toggle sidebar"
        position="fixed"
        top="16px"
        left={isOpen ? "290px" : "68px"}
        zIndex="1001"
        bg="white"
        color="gray.700"
        size="sm"
        borderRadius="full"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.200"
        _hover={{ bg: "gray.50", transform: "scale(1.05)" }}
        _active={{ transform: "scale(0.95)" }}
        transition="all 0.3s cubic-bezier(0.4,0,0.2,1)"
      />

      <Box
        bg="white"
        color="gray.700"
        w={isOpen ? "280px" : "80px"}
        h="100vh"
        position="fixed"
        left="0"
        top="0"
        transition="width 0.3s cubic-bezier(0.4,0,0.2,1)"
        overflow="hidden"
        borderRight="1px"
        borderColor="gray.100"
        boxShadow={isOpen ? "lg" : "sm"}
        zIndex="999"
      >
        <VStack
          spacing="0"
          align="stretch"
          h="100%"
          overflowY="auto"
          overflowX="hidden"
          css={{
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "#e2e8f0",
              borderRadius: "4px",
            },
          }}
        >
          {/* Logo */}
          <Box
            px={isOpen ? "5" : "3"}
            py="5"
            borderBottom="1px"
            borderColor="gray.50"
          >
            <HStack spacing="2" justify={isOpen ? "flex-start" : "center"}>
              <Box
                w="32px"
                h="32px"
                bg="purple.500"
                borderRadius="lg"
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box as={FiPlayCircle} color="white" fontSize="18px" />
              </Box>
              {isOpen && (
                <Text
                  fontWeight="800"
                  fontSize="lg"
                  color="gray.800"
                  letterSpacing="tight"
                >
                  Wavelength
                </Text>
              )}
            </HStack>
          </Box>

          {/* Main menu */}
          <VStack spacing="1" align="stretch" px={isOpen ? "3" : "2"} py="3">
            {mainMenuItems.map((item, i) => (
              <MenuItem key={i} item={item} />
            ))}
          </VStack>

          <Divider borderColor="gray.100" />

          {/* Library */}
          <Box px={isOpen ? "3" : "2"} py="2">
            {isOpen ? (
              <>
                <HStack
                  justify="space-between"
                  cursor="pointer"
                  onClick={() => setShowLibrary((s) => !s)}
                  p="2"
                  borderRadius="md"
                  _hover={{ bg: "gray.50" }}
                >
                  <Text
                    fontSize="10px"
                    fontWeight="700"
                    color="gray.400"
                    letterSpacing="widest"
                    textTransform="uppercase"
                  >
                    My Library
                  </Text>
                  <Text fontSize="xs" color="gray.300">
                    {showLibrary ? "▾" : "▸"}
                  </Text>
                </HStack>
                <Collapse in={showLibrary} animateOpacity>
                  <VStack spacing="1" align="stretch" mt="1">
                    {libraryItems.map((item, i) => (
                      <MenuItem key={i} item={item} fontSize="18px" />
                    ))}
                  </VStack>
                </Collapse>
              </>
            ) : (
              <VStack spacing="1" align="stretch">
                {libraryItems.map((item, i) => (
                  <MenuItem key={i} item={item} fontSize="18px" />
                ))}
              </VStack>
            )}
          </Box>

          <Divider borderColor="gray.100" />

          {/* Footer */}
          <VStack
            spacing="1"
            align="stretch"
            px={isOpen ? "3" : "2"}
            py="3"
            mt="auto"
          >
            {footerItems.map((item, i) => (
              <MenuItem key={i} item={item} fontSize="16px" />
            ))}
            {isOpen && (
              <Text
                fontSize="xs"
                color="gray.300"
                pt="3"
                px="2"
                textAlign="center"
              >
                © 2026 Wavelength
              </Text>
            )}
          </VStack>
        </VStack>
      </Box>
    </>
  );
}

export default Sidebar;