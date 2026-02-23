import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Heading,
  Badge,
  Image,
  Spinner,
  IconButton,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineWatchLater, MdDelete, MdPlayArrow } from "react-icons/md";
import { checkAuthApi } from "../services/apis/userAuth";
import { getSavedVideosApi, saveVideoApi } from "../services/apis/uploadVideo";
import { useNavigate } from "react-router-dom";

// NOTE: "Watch Later" uses the savedVideos list in the existing schema.
// If you later add a dedicated watchLater field, swap getSavedVideosApi
// with a getWatchLaterApi call.

const WatchLater = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    checkAuthApi().then(({ authenticated, user }) => {
      if (authenticated && user?._id) setUserId(user._id);
      else setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getSavedVideosApi(userId, { page: 1, limit: 50 })
      .then((data) => setVideos(data.videos || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  const handleRemove = async (videoId) => {
    setVideos((prev) => prev.filter((v) => String(v._id) !== String(videoId)));
    try {
      await saveVideoApi(videoId, userId);
    } catch {
      toast({
        title: "Failed to remove",
        status: "error",
        duration: 2000,
        position: "top",
      });
    }
  };

  const playVideo = (video) => {
    navigate("/VideoPlayer", {
      state: {
        videoUrl: video.videoUrl,
        qualities: video.qualities,
        metadata: video.metadata,
        _id: video._id,
        title: video.title,
        description: video.description,
        views: video.views,
        likes: video.likes,
        dislikes: video.dislikes,
        uploadDate: video.createdAt,
        category: video.category,
        audience: video.audience,
        tags: video.tags,
        likedBy: video.likedBy || [],
        dislikedBy: video.dislikedBy || [],
        savedBy: video.savedBy || [],
        comments: video.comments || [],
        user: video.user,
      },
    });
  };

  const fmtDuration = (s) => {
    if (!s) return null;
    const h = Math.floor(s / 3600),
      m = Math.floor((s % 3600) / 60),
      sec = Math.floor(s % 60)
        .toString()
        .padStart(2, "0");
    return h > 0
      ? `${h}:${m.toString().padStart(2, "0")}:${sec}`
      : `${m}:${sec}`;
  };

  const timeAgo = (date) => {
    if (!date) return "";
    const s = Math.floor((Date.now() - new Date(date)) / 1000);
    for (const [u, v] of Object.entries({
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    })) {
      const i = Math.floor(s / v);
      if (i >= 1) return `${i} ${u}${i > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  return (
    <Box minH="100vh" bg="gray.50" pb="80px">
      {/* Header */}
      <Box bg="white" borderBottom="1px" borderColor="gray.100" px="6" py="5">
        <HStack spacing="3">
          <Box bg="orange.50" p="3" borderRadius="xl">
            <Icon as={MdOutlineWatchLater} color="orange.500" boxSize="6" />
          </Box>
          <VStack align="start" spacing="0">
            <Heading size="md" color="gray.800">
              Queue
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Videos saved for later
            </Text>
          </VStack>
          {videos.length > 0 && (
            <Badge
              ml="auto"
              colorScheme="orange"
              borderRadius="full"
              px="3"
              py="1"
              fontSize="sm"
            >
              {videos.length} queued
            </Badge>
          )}
        </HStack>
      </Box>

      <Box maxW="800px" mx="auto" p="6">
        {loading ? (
          <VStack spacing="4">
            {[...Array(5)].map((_, i) => (
              <Box
                key={i}
                bg="white"
                borderRadius="xl"
                p="4"
                w="100%"
                boxShadow="sm"
              >
                <HStack spacing="4">
                  <Box
                    bg="gray.200"
                    borderRadius="lg"
                    w="160px"
                    h="90px"
                    flexShrink={0}
                  />
                  <VStack align="start" flex="1" spacing="2">
                    <Box bg="gray.200" h="14px" w="70%" borderRadius="md" />
                    <Box bg="gray.100" h="11px" w="45%" borderRadius="md" />
                  </VStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        ) : videos.length > 0 ? (
          <VStack spacing="3" align="stretch">
            {videos.map((video, index) => {
              const dur = fmtDuration(video.metadata?.duration);
              return (
                <Box
                  key={video._id || index}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="sm"
                  border="1px solid"
                  borderColor="gray.100"
                  transition="all 0.2s"
                  _hover={{ boxShadow: "md", borderColor: "orange.200" }}
                >
                  <HStack spacing="0">
                    {/* Index */}
                    <Text
                      fontSize="sm"
                      color="gray.400"
                      fontWeight="bold"
                      w="40px"
                      textAlign="center"
                      flexShrink={0}
                    >
                      {index + 1}
                    </Text>

                    {/* Thumbnail */}
                    <Box
                      position="relative"
                      w="160px"
                      h="90px"
                      flexShrink={0}
                      borderRadius="lg"
                      overflow="hidden"
                      cursor="pointer"
                      onClick={() => playVideo(video)}
                    >
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                      <Box
                        position="absolute"
                        inset="0"
                        bg="blackAlpha.400"
                        opacity="0"
                        _hover={{ opacity: 1 }}
                        transition="opacity 0.2s"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={MdPlayArrow} color="white" boxSize="8" />
                      </Box>
                      {dur && (
                        <Badge
                          position="absolute"
                          bottom="1"
                          right="1"
                          bg="blackAlpha.800"
                          color="white"
                          fontSize="10px"
                          borderRadius="sm"
                          px="1"
                        >
                          {dur}
                        </Badge>
                      )}
                    </Box>

                    {/* Info */}
                    <VStack
                      align="start"
                      spacing="1"
                      flex="1"
                      px="4"
                      py="3"
                      cursor="pointer"
                      onClick={() => playVideo(video)}
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        noOfLines={2}
                        lineHeight="1.3"
                      >
                        {video.title}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="orange.600"
                        fontWeight="medium"
                      >
                        {video.user?.channelName ??
                          video.user?.username ??
                          "Creator"}
                      </Text>
                      <HStack spacing="2" fontSize="xs" color="gray.400">
                        <Text>{(video.views || 0).toLocaleString()} views</Text>
                        <Text>•</Text>
                        <Text>{timeAgo(video.createdAt)}</Text>
                      </HStack>
                    </VStack>

                    {/* Remove */}
                    <IconButton
                      icon={<MdDelete />}
                      aria-label="Remove"
                      variant="ghost"
                      colorScheme="red"
                      size="sm"
                      mr="3"
                      flexShrink={0}
                      onClick={() => handleRemove(video._id)}
                      transition="opacity 0.2s"
                    />
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        ) : (
          <VStack spacing="4" py="24" color="gray.400">
            <Icon as={MdOutlineWatchLater} boxSize="16" />
            <Text fontSize="lg" fontWeight="bold">
              Your queue is empty
            </Text>
            <Text fontSize="sm">Save videos to watch them later</Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default WatchLater;
