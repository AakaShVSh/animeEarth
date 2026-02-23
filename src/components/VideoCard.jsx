// import React, { useState } from "react";
// import {
//   Box,
//   HStack,
//   VStack,
//   Image,
//   Text,
//   Avatar,
//   Badge,
//   IconButton,
//   Tooltip,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
// import { BiTime } from "react-icons/bi";
// import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

// const VideoCard = ({
//   _id,
//   audience,
//   description,
//   thumbnailUrl,
//   title,
//   videoUrl,
//   views = 0,
//   likes = 0,
//   dislikes = 0,
//   uploadDate,
//   category,
//   tags,
//   qualities,
//   metadata,
//   likedBy = [],
//   dislikedBy = [],
//   savedBy = [],
//   comments = [],
//   channelName = "Creator",
//   channelAvatar = "",
//   channelId,
//   subscribers = [],
// }) => {
//   const navigate = useNavigate();
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);

// const playVideo = () => {
//   navigate("/VideoPlayer", {
//     state: {
//       // Player needs
//       videoUrl,
//       qualities,
//       metadata,
//       // Video info
//       _id,
//       title,
//       description,
//       category,
//       audience,
//       tags,
//       views,
//       likes,
//       dislikes,
//       uploadDate,
//       // Interaction arrays
//       likedBy,
//       dislikedBy,
//       savedBy,
//       comments,
//       // Channel info
//       user: {
//         _id: channelId,
//         username: channelName,
//         profilePicture: channelAvatar,
//         subscribers,
//       },
//     },
//   });
// };

//   const formatViews = (num) => {
//     if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
//     if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
//     return num.toString();
//   };

//   const getTimeAgo = (date) => {
//     if (!date) return "Recently";
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);
//     const intervals = {
//       year: 31536000,
//       month: 2592000,
//       week: 604800,
//       day: 86400,
//       hour: 3600,
//       minute: 60,
//     };

//     for (const [unit, secondsInUnit] of Object.entries(intervals)) {
//       const interval = Math.floor(seconds / secondsInUnit);
//       if (interval >= 1) {
//         return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
//       }
//     }
//     return "Just now";
//   };

//   const handleSaveToggle = (e) => {
//     e.stopPropagation();
//     setIsSaved(!isSaved);
//   };

//   return (
//     <Box
//       onClick={playVideo}
//       cursor="pointer"
//       borderRadius="lg"
//       overflow="hidden"
//       bg="white"
//       boxShadow="md"
//       transition="all 0.2s ease"
//       _hover={{
//         boxShadow: "2xl",
//       }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       position="relative"
//       h="100%"
//       display="flex"
//       flexDirection="column"
//       border="1px solid"
//       borderColor="gray.200"
//     >
//       {/* Thumbnail Container */}
//       <Box
//         position="relative"
//         w="100%"
//         paddingTop="56.25%"
//         overflow="hidden"
//         bg="gray.900"
//       >
//         {/* Category Badge */}
//         {/* {category && (
//           <Badge
//             position="absolute"
//             top="3"
//             left="3"
//             colorScheme="red"
//             fontSize="xs"
//             borderRadius="md"
//             px="2"
//             py="1"
//             zIndex="2"
//             textTransform="capitalize"
//             fontWeight="bold"
//           >
//             {category}
//           </Badge>
//         )} */}

//         {/* Save Button */}
//         <IconButton
//           icon={isSaved ? <BsBookmarkFill /> : <BsBookmark />}
//           aria-label="Save video"
//           position="absolute"
//           top="3"
//           right="3"
//           size="sm"
//           colorScheme={isSaved ? "red" : "whiteAlpha"}
//           bg={isSaved ? "red.500" : "blackAlpha.700"}
//           color="white"
//           borderRadius="md"
//           zIndex="2"
//           opacity={isHovered ? 1 : 0}
//           transition="opacity 0.2s"
//           onClick={handleSaveToggle}
//           _hover={{
//             transform: "scale(1.1)",
//             bg: isSaved ? "red.600" : "blackAlpha.800",
//           }}
//         />

//         {/* Thumbnail Image */}
//         <Image
//           src={thumbnailUrl}
//           alt={title}
//           position="absolute"
//           top="0"
//           left="0"
//           w="100%"
//           h="100%"
//           objectFit="cover"
//         />

//         {/* Video Preview on Hover */}
//         {isHovered && videoUrl && (
//           <Box
//             position="absolute"
//             top="0"
//             left="0"
//             w="100%"
//             h="100%"
//             zIndex="1"
//           >
//             <video
//               src={videoUrl}
//               autoPlay
//               loop
//               muted
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </Box>
//         )}

//         {/* Duration Badge */}
//         <Badge
//           position="absolute"
//           bottom="3"
//           right="3"
//           bg="blackAlpha.800"
//           color="white"
//           fontSize="xs"
//           borderRadius="md"
//           px="2"
//           py="1"
//           zIndex="2"
//           fontWeight="semibold"
//         >
//           <HStack spacing="1">
//             <BiTime />
//             <Text>5:24</Text>
//           </HStack>
//         </Badge>
//       </Box>

//       {/* Content Section */}
//       <VStack align="stretch" p="3" spacing="3" flex="1" bg="white">
//         {/* Title */}
//         <Text
//           fontWeight="bold"
//           fontSize="sm"
//           noOfLines={2}
//           lineHeight="1.4"
//           color="gray.900"
//           minH="40px"
//         >
//           {title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cum ad, architecto ratione sequi facilis excepturi beatae nesciunt. Inventore repellat laboriosam laudantium eos aliquid saepe odit molestias tempora provident omnis.
//         </Text>

//         {/* Channel Info */}
//         {/* <HStack spacing="2">
//           <Avatar size="xs" src={channelAvatar} name={channelName} />
//           <Text fontSize="xs" color="gray.600" fontWeight="medium">
//             {channelName}
//           </Text>
//         </HStack> */}

//         {/* Stats */}
//         <HStack
//           spacing="2"
//           fontSize="xs"
//           color="gray.500"
//           pt="1"
//           borderTop="1px"
//           borderColor="gray.100"
//         >
//           <HStack spacing="1">
//             <AiOutlineEye />
//             <Text>{formatViews(views)} views</Text>
//           </HStack>
//           <Text>•</Text>
//           <Text>{getTimeAgo(uploadDate)}</Text>
//           <HStack spacing="1" ml="auto">
//             <AiOutlineLike />
//             <Text>{formatViews(likes)}</Text>
//           </HStack>
//         </HStack>
//       </VStack>
//     </Box>
//   );
// };

// export default VideoCard;

import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Image,
  Text,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineLike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const VideoCard = ({
  _id,
  audience,
  description,
  thumbnailUrl,
  title,
  videoUrl,
  views = 0,
  likes = 0,
  dislikes = 0,
  uploadDate,
  category,
  tags = [],
  qualities = [],
  metadata,
  likedBy = [],
  dislikedBy = [],
  savedBy = [],
  comments = [],
  // Channel info — can arrive as individual props OR as a user object
  user, // full populated user object from backend
  channelName, // fallback individual prop
  channelAvatar, // fallback individual prop
  channelId, // fallback individual prop
  subscribers = [], // fallback individual prop
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // ── Resolve channel data from either user object or individual props ──
  const resolvedChannelId = user?._id ?? channelId ?? null;
  const resolvedChannelName =
    user?.channelName ?? user?.username ?? channelName ?? "Creator";
  const resolvedChannelAvatar = user?.profilePicture ?? channelAvatar ?? "";
  const resolvedSubscribers = user?.subscribers ?? subscribers ?? [];

  // ── Helpers ──────────────────────────────────────────────────────────
  const formatNum = (n = 0) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return null;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${s}` : `${m}:${s}`;
  };

  const getTimeAgo = (date) => {
    if (!date) return "Recently";
    const secs = Math.floor((Date.now() - new Date(date)) / 1000);
    const map = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };
    for (const [unit, s] of Object.entries(map)) {
      const i = Math.floor(secs / s);
      if (i >= 1) return `${i} ${unit}${i > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  // ── Navigate to player with ALL data needed by VideoPlayerUI ─────────
  const playVideo = () => {
    navigate("/VideoPlayer", {
      state: {
        // Player
        videoUrl,
        qualities,
        metadata,
        // Video identity
        _id,
        title,
        description,
        category,
        audience,
        tags,
        uploadDate,
        // Live counters
        views,
        likes,
        dislikes,
        // Interaction arrays (for initialising liked/saved state in player)
        likedBy,
        dislikedBy,
        savedBy,
        comments,
        // Full user object — VideoPlayerUI reads user._id, user.username,
        // user.profilePicture, user.subscribers
        user: user ?? {
          _id: resolvedChannelId,
          username: resolvedChannelName,
          channelName: resolvedChannelName,
          profilePicture: resolvedChannelAvatar,
          subscribers: resolvedSubscribers,
        },
      },
    });
  };

  const handleSaveToggle = (e) => {
    e.stopPropagation();
    setIsSaved((prev) => !prev);
  };

  const duration = formatDuration(metadata?.duration);

  return (
    <Box
      onClick={playVideo}
      cursor="pointer"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      boxShadow="sm"
      transition="all 0.22s cubic-bezier(0.4,0,0.2,1)"
      _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
      display="flex"
      flexDirection="column"
      border="1px solid"
      borderColor="gray.100"
      role="group"
    >
      {/* ── Thumbnail ─────────────────────────────────────────────────── */}
      <Box
        position="relative"
        w="100%"
        paddingTop="56.25%"
        overflow="hidden"
        bg="gray.900"
      >
        {/* Save button — visible on hover */}
        <IconButton
          icon={isSaved ? <BsBookmarkFill /> : <BsBookmark />}
          aria-label="Save video"
          position="absolute"
          top="2"
          right="2"
          size="xs"
          bg={isSaved ? "purple.500" : "blackAlpha.700"}
          color="white"
          borderRadius="md"
          zIndex="3"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.2s"
          onClick={handleSaveToggle}
          _hover={{ transform: "scale(1.12)" }}
        />

        {/* Static thumbnail */}
        <Image
          src={thumbnailUrl}
          alt={title}
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          objectFit="cover"
          loading="lazy"
          transition="transform 0.35s ease"
          transform={isHovered ? "scale(1.05)" : "scale(1)"}
        />

        {/* Video preview on hover */}
        {isHovered && videoUrl && (
          <Box position="absolute" inset="0" zIndex="2">
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        )}

        {/* Duration badge — mapped from real metadata.duration */}
        {duration && (
          <Badge
            position="absolute"
            bottom="2"
            right="2"
            bg="blackAlpha.800"
            color="white"
            fontSize="xs"
            borderRadius="md"
            px="2"
            py="0.5"
            zIndex="3"
            fontWeight="semibold"
          >
            <HStack spacing="1">
              <BiTime size="11" />
              <Text>{duration}</Text>
            </HStack>
          </Badge>
        )}
      </Box>

      {/* ── Info ──────────────────────────────────────────────────────── */}
      <VStack align="stretch" p="3" spacing="2" flex="1">
        {/* Channel name */}
        <Text
          fontSize="xs"
          color="purple.600"
          fontWeight="semibold"
          noOfLines={1}
        >
          {resolvedChannelName}
        </Text>

        {/* Title — real title, no Lorem ipsum */}
        <Text
          fontWeight="bold"
          fontSize="sm"
          noOfLines={2}
          lineHeight="1.4"
          color="gray.900"
        >
          {title || "Untitled"}
        </Text>

        {/* Stats row */}
        <HStack
          spacing="2"
          fontSize="xs"
          color="gray.400"
          pt="1"
          borderTop="1px solid"
          borderColor="gray.100"
        >
          <HStack spacing="1">
            <AiOutlineEye size="12" />
            <Text>{formatNum(views)}</Text>
          </HStack>
          <Text>•</Text>
          <Text flex="1" noOfLines={1}>
            {getTimeAgo(uploadDate)}
          </Text>
          <HStack spacing="1">
            <AiOutlineLike size="12" />
            <Text>{formatNum(likes)}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default VideoCard;