// import React, { useState } from "react";
// import {
//   Box,
//   HStack,
//   VStack,
//   Image,
//   Text,
//   Badge,
//   IconButton,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineLike } from "react-icons/ai";
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
//   tags = [],
//   qualities = [],
//   metadata,
//   likedBy = [],
//   dislikedBy = [],
//   savedBy = [],
//   comments = [],
//   // Channel info — can arrive as individual props OR as a user object
//   user, // full populated user object from backend
//   channelName, // fallback individual prop
//   channelAvatar, // fallback individual prop
//   channelId, // fallback individual prop
//   subscribers = [], // fallback individual prop
// }) => {
//   const navigate = useNavigate();
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSaved, setIsSaved] = useState(false);

//   // ── Resolve channel data from either user object or individual props ──
//   const resolvedChannelId = user?._id ?? channelId ?? null;
//   const resolvedChannelName =
//     user?.channelName ?? user?.username ?? channelName ?? "Creator";
//   const resolvedChannelAvatar = user?.profilePicture ?? channelAvatar ?? "";
//   const resolvedSubscribers = user?.subscribers ?? subscribers ?? [];

//   // ── Helpers ──────────────────────────────────────────────────────────
//   const formatNum = (n = 0) => {
//     if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
//     if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
//     return String(n);
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return null;
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = Math.floor(seconds % 60)
//       .toString()
//       .padStart(2, "0");
//     return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${s}` : `${m}:${s}`;
//   };

//   const getTimeAgo = (date) => {
//     if (!date) return "Recently";
//     const secs = Math.floor((Date.now() - new Date(date)) / 1000);
//     const map = {
//       year: 31536000,
//       month: 2592000,
//       week: 604800,
//       day: 86400,
//       hour: 3600,
//       minute: 60,
//     };
//     for (const [unit, s] of Object.entries(map)) {
//       const i = Math.floor(secs / s);
//       if (i >= 1) return `${i} ${unit}${i > 1 ? "s" : ""} ago`;
//     }
//     return "Just now";
//   };

//   // ── Navigate to player with ALL data needed by VideoPlayerUI ─────────
//   const playVideo = () => {
//     navigate("/VideoPlayer", {
//       state: {
//         // Player
//         videoUrl,
//         qualities,
//         metadata,
//         // Video identity
//         _id,
//         title,
//         description,
//         category,
//         audience,
//         tags,
//         uploadDate,
//         // Live counters
//         views,
//         likes,
//         dislikes,
//         // Interaction arrays (for initialising liked/saved state in player)
//         likedBy,
//         dislikedBy,
//         savedBy,
//         comments,
//         // Full user object — VideoPlayerUI reads user._id, user.username,
//         // user.profilePicture, user.subscribers
//         user: user ?? {
//           _id: resolvedChannelId,
//           username: resolvedChannelName,
//           channelName: resolvedChannelName,
//           profilePicture: resolvedChannelAvatar,
//           subscribers: resolvedSubscribers,
//         },
//       },
//     });
//   };

//   const handleSaveToggle = (e) => {
//     e.stopPropagation();
//     setIsSaved((prev) => !prev);
//   };

//   const duration = formatDuration(metadata?.duration);

//   return (
//     <Box
//       onClick={playVideo}
//       cursor="pointer"
//       borderRadius="xl"
//       overflow="hidden"
//       bg="white"
//       boxShadow="sm"
//       transition="all 0.22s cubic-bezier(0.4,0,0.2,1)"
//       _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       position="relative"
//       display="flex"
//       flexDirection="column"
//       border="1px solid"
//       borderColor="gray.100"
//       role="group"
//     >
//       {/* ── Thumbnail ─────────────────────────────────────────────────── */}
//       <Box
//         position="relative"
//         w="100%"
//         paddingTop="56.25%"
//         overflow="hidden"
//         bg="gray.900"
//       >
//         {/* Save button — visible on hover */}
//         <IconButton
//           icon={isSaved ? <BsBookmarkFill /> : <BsBookmark />}
//           aria-label="Save video"
//           position="absolute"
//           top="2"
//           right="2"
//           size="xs"
//           bg={isSaved ? "purple.500" : "blackAlpha.700"}
//           color="white"
//           borderRadius="md"
//           zIndex="3"
//           opacity={isHovered ? 1 : 0}
//           transition="opacity 0.2s"
//           onClick={handleSaveToggle}
//           _hover={{ transform: "scale(1.12)" }}
//         />

//         {/* Static thumbnail */}
//         <Image
//           src={thumbnailUrl}
//           alt={title}
//           position="absolute"
//           top="0"
//           left="0"
//           w="100%"
//           h="100%"
//           objectFit="cover"
//           loading="lazy"
//           transition="transform 0.35s ease"
//           transform={isHovered ? "scale(1.05)" : "scale(1)"}
//         />

//         {/* Video preview on hover */}
//         {isHovered && videoUrl && (
//           <Box position="absolute" inset="0" zIndex="2">
//             <video
//               src={videoUrl}
//               autoPlay
//               loop
//               muted
//               playsInline
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             />
//           </Box>
//         )}

//         {/* Duration badge — mapped from real metadata.duration */}
//         {duration && (
//           <Badge
//             position="absolute"
//             bottom="2"
//             right="2"
//             bg="blackAlpha.800"
//             color="white"
//             fontSize="xs"
//             borderRadius="md"
//             px="2"
//             py="0.5"
//             zIndex="3"
//             fontWeight="semibold"
//           >
//             <HStack spacing="1">
//               <BiTime size="11" />
//               <Text>{duration}</Text>
//             </HStack>
//           </Badge>
//         )}
//       </Box>

//       {/* ── Info ──────────────────────────────────────────────────────── */}
//       <VStack align="stretch" p="3" spacing="2" flex="1">
//         {/* Channel name */}
//         <Text
//           fontSize="xs"
//           color="purple.600"
//           fontWeight="semibold"
//           noOfLines={1}
//         >
//           {resolvedChannelName}
//         </Text>

//         {/* Title — real title, no Lorem ipsum */}
//         <Text
//           fontWeight="bold"
//           fontSize="sm"
//           noOfLines={2}
//           lineHeight="1.4"
//           color="gray.900"
//         >
//           {title || "Untitled"}
//         </Text>

//         {/* Stats row */}
//         <HStack
//           spacing="2"
//           fontSize="xs"
//           color="gray.400"
//           pt="1"
//           borderTop="1px solid"
//           borderColor="gray.100"
//         >
//           <HStack spacing="1">
//             <AiOutlineEye size="12" />
//             <Text>{formatNum(views)}</Text>
//           </HStack>
//           <Text>•</Text>
//           <Text flex="1" noOfLines={1}>
//             {getTimeAgo(uploadDate)}
//           </Text>
//           <HStack spacing="1">
//             <AiOutlineLike size="12" />
//             <Text>{formatNum(likes)}</Text>
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineLike } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import {
  BsBookmark,
  BsBookmarkFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { MdEdit, MdDelete } from "react-icons/md";
import { updateVideosApi, deleteVideosApi } from "../services/apis/uploadVideo";

const CATEGORIES = [
  "Education",
  "Entertainment",
  "Gaming",
  "Music",
  "Sports",
  "Technology",
  "Science",
  "Food & Cooking",
  "Fitness",
  "Art & Design",
];

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
  user,
  channelName,
  channelAvatar,
  channelId,
  subscribers = [],
  // ── Pass isOwnProfile=true from ProfilePage to show edit/delete ──
  isOwnProfile = false,
  onDeleted, // callback(id) — ProfilePage removes card from list
  onUpdated, // callback(updatedVideo) — ProfilePage refreshes card data
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    isOpen: isEditOpen,
    onOpen: openEdit,
    onClose: closeEdit,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: openDelete,
    onClose: closeDelete,
  } = useDisclosure();

  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form state — pre-filled on open
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    audience: "",
    tags: "",
  });

  // ── Resolve channel data ──────────────────────────────────────────────
  const resolvedChannelId = user?._id ?? channelId ?? null;
  const resolvedChannelName =
    user?.channelName ?? user?.username ?? channelName ?? "Creator";
  const resolvedChannelAvatar = user?.profilePicture ?? channelAvatar ?? "";
  const resolvedSubscribers = user?.subscribers ?? subscribers ?? [];

  // ── Helpers ───────────────────────────────────────────────────────────
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

  // ── Play ──────────────────────────────────────────────────────────────
  const playVideo = () => {
    navigate("/VideoPlayer", {
      state: {
        videoUrl,
        qualities,
        metadata,
        _id,
        title,
        description,
        category,
        audience,
        tags,
        uploadDate,
        views,
        likes,
        dislikes,
        likedBy,
        dislikedBy,
        savedBy,
        comments,
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

  // ── Edit ──────────────────────────────────────────────────────────────
  const handleOpenEdit = (e) => {
    e.stopPropagation();
    setEditForm({
      title: title || "",
      description: description || "",
      category: category || "",
      audience: audience || "Above 18",
      tags: (tags || []).join(", "),
    });
    openEdit();
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      const updated = await updateVideosApi(_id, {
        title: editForm.title,
        description: editForm.description,
        category: editForm.category,
        audience: editForm.audience,
        tags: editForm.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      onUpdated?.(updated.data);
      closeEdit();
      toast({
        title: "Video updated ✓",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch {
      toast({
        title: "Update failed",
        status: "error",
        duration: 2000,
        position: "top",
      });
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteVideosApi(_id);
      onDeleted?.(_id);
      closeDelete();
      toast({
        title: "Video deleted",
        status: "info",
        duration: 2000,
        position: "top",
      });
    } catch {
      toast({
        title: "Delete failed",
        status: "error",
        duration: 2000,
        position: "top",
      });
    } finally {
      setDeleting(false);
    }
  };

  const duration = formatDuration(metadata?.duration);

  return (
    <>
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
        {/* ── Thumbnail ───────────────────────────────────────────────── */}
        <Box
          position="relative"
          w="100%"
          paddingTop="56.25%"
          overflow="hidden"
          bg="gray.900"
        >
          {/* Own profile: show edit/delete menu — hide save icon */}
          {isOwnProfile ? (
            <Box
              position="absolute"
              top="2"
              right="2"
              zIndex="3"
              opacity={isHovered ? 1 : 0}
              transition="opacity 0.2s"
              onClick={(e) => e.stopPropagation()}
            >
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<BsThreeDotsVertical />}
                  size="xs"
                  bg="blackAlpha.700"
                  color="white"
                  borderRadius="md"
                  _hover={{ bg: "blackAlpha.900" }}
                  aria-label="Video options"
                />
                <MenuList
                  minW="140px"
                  fontSize="sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MenuItem icon={<MdEdit />} onClick={handleOpenEdit}>
                    Edit
                  </MenuItem>
                  <MenuItem
                    icon={<MdDelete />}
                    color="red.500"
                    onClick={(e) => {
                      e.stopPropagation();
                      openDelete();
                    }}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            // Other profiles: show save icon as before
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
              onClick={(e) => {
                e.stopPropagation();
                setIsSaved((p) => !p);
              }}
              _hover={{ transform: "scale(1.12)" }}
            />
          )}

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

        {/* ── Info ────────────────────────────────────────────────────── */}
        <VStack align="stretch" p="3" spacing="2" flex="1">
          <Text
            fontSize="xs"
            color="purple.600"
            fontWeight="semibold"
            noOfLines={1}
          >
            {resolvedChannelName}
          </Text>
          <Text
            fontWeight="bold"
            fontSize="sm"
            noOfLines={2}
            lineHeight="1.4"
            color="gray.900"
          >
            {title || "Untitled"}
          </Text>
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

      {/* ── Edit Modal ──────────────────────────────────────────────────── */}
      <Modal isOpen={isEditOpen} onClose={closeEdit} size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl" onClick={(e) => e.stopPropagation()}>
          <ModalHeader fontSize="md">Edit Video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing="4">
              <FormControl>
                <FormLabel fontSize="sm">Title</FormLabel>
                <Input
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, title: e.target.value }))
                  }
                  focusBorderColor="purple.400"
                  maxLength={100}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Description</FormLabel>
                <Textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, description: e.target.value }))
                  }
                  focusBorderColor="purple.400"
                  rows={3}
                  resize="none"
                  maxLength={5000}
                />
              </FormControl>
              <HStack w="100%" spacing="3">
                <FormControl>
                  <FormLabel fontSize="sm">Category</FormLabel>
                  <Select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, category: e.target.value }))
                    }
                    focusBorderColor="purple.400"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">Audience</FormLabel>
                  <Select
                    value={editForm.audience}
                    onChange={(e) =>
                      setEditForm((p) => ({ ...p, audience: e.target.value }))
                    }
                    focusBorderColor="purple.400"
                  >
                    <option value="Above 18">Above 18</option>
                    <option value="Below 18">Below 18</option>
                  </Select>
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel fontSize="sm">
                  Tags{" "}
                  <Text as="span" color="gray.400" fontWeight="normal">
                    (comma separated)
                  </Text>
                </FormLabel>
                <Input
                  value={editForm.tags}
                  onChange={(e) =>
                    setEditForm((p) => ({ ...p, tags: e.target.value }))
                  }
                  placeholder="e.g. react, tutorial, javascript"
                  focusBorderColor="purple.400"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter gap="3">
            <Button variant="ghost" onClick={closeEdit}>
              Cancel
            </Button>
            <Button
              colorScheme="purple"
              onClick={handleSaveEdit}
              isLoading={saving}
              loadingText="Saving…"
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* ── Delete Confirm Modal ─────────────────────────────────────────── */}
      <Modal isOpen={isDeleteOpen} onClose={closeDelete} size="sm" isCentered>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl" onClick={(e) => e.stopPropagation()}>
          <ModalHeader fontSize="md">Delete Video?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="sm" color="gray.600">
              "<strong>{title}</strong>" will be permanently deleted. This
              cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter gap="3">
            <Button variant="ghost" onClick={closeDelete}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleDelete}
              isLoading={deleting}
              loadingText="Deleting…"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VideoCard;