import React, { useEffect, useState, useRef, useCallback } from "react";
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
  Button,
  IconButton,
  SimpleGrid,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { RiHistoryLine } from "react-icons/ri";
import { MdPlayArrow, MdDeleteSweep } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { checkAuthApi } from "../services/apis/userAuth";
import {
  getWatchHistoryApi,
  clearWatchHistoryApi,
} from "../services/apis/uploadVideo";
import { useNavigate } from "react-router-dom";

const WatchHistory = () => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userId, setUserId] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [clearing, setClearing] = useState(false);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    checkAuthApi().then(({ authenticated, user }) => {
      if (authenticated && user?._id) setUserId(user._id);
      else setLoading(false);
    });
  }, []);

  const fetchHistory = useCallback(async (uid, pg) => {
    if (!uid) return;
    pg === 1 ? setLoading(true) : setLoadingMore(true);
    try {
      const data = await getWatchHistoryApi(uid, { page: pg, limit: 20 });
      setHistory((prev) =>
        pg === 1 ? data.history : [...prev, ...data.history],
      );
      setHasMore(data.pagination.hasMore);
      setTotalCount(data.pagination.total);
      setPage(pg + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    if (userId) fetchHistory(userId, 1);
  }, [userId]);

  useEffect(() => {
    if (loading || loadingMore || !hasMore || !userId) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchHistory(userId, page);
      },
      { threshold: 0.5 },
    );
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [loading, loadingMore, hasMore, userId, page]);

  const handleClear = async () => {
    if (!userId) return;
    setClearing(true);
    try {
      await clearWatchHistoryApi(userId);
      setHistory([]);
      setTotalCount(0);
      toast({
        title: "Rewind cleared",
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch {
      toast({
        title: "Failed to clear",
        status: "error",
        duration: 2000,
        position: "top",
      });
    } finally {
      setClearing(false);
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

  // Group by date label
  const grouped = history.reduce((acc, item) => {
    const now = new Date(),
      created = new Date(item.watchedAt);
    const diffDays = Math.floor((now - created) / 86400000);
    const label =
      diffDays === 0
        ? "Today"
        : diffDays === 1
          ? "Yesterday"
          : diffDays < 7
            ? "This week"
            : "Earlier";
    if (!acc[label]) acc[label] = [];
    acc[label].push(item);
    return acc;
  }, {});

  return (
    <Box minH="100vh" bg="gray.50" pb="80px">
      {/* Header */}
      <Box bg="white" borderBottom="1px" borderColor="gray.100" px="6" py="5">
        <HStack spacing="3">
          <Box bg="teal.50" p="3" borderRadius="xl">
            <Icon as={RiHistoryLine} color="teal.500" boxSize="6" />
          </Box>
          <VStack align="start" spacing="0">
            <Heading size="md" color="gray.800">
              Rewind
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Your watch history
            </Text>
          </VStack>
          <HStack ml="auto" spacing="3">
            {totalCount > 0 && (
              <Badge
                colorScheme="teal"
                borderRadius="full"
                px="3"
                py="1"
                fontSize="sm"
              >
                {totalCount} watched
              </Badge>
            )}
            {history.length > 0 && (
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                leftIcon={<MdDeleteSweep />}
                onClick={handleClear}
                isLoading={clearing}
                fontSize="xs"
              >
                Clear all
              </Button>
            )}
          </HStack>
        </HStack>
      </Box>

      <Box maxW="900px" mx="auto" p="6">
        {loading ? (
          <VStack spacing="6" align="stretch">
            {[...Array(3)].map((_, gi) => (
              <Box key={gi}>
                <Box
                  bg="gray.200"
                  h="12px"
                  w="120px"
                  borderRadius="md"
                  mb="4"
                />
                <VStack spacing="3">
                  {[...Array(3)].map((_, i) => (
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
                          w="140px"
                          h="79px"
                          flexShrink={0}
                        />
                        <VStack align="start" flex="1" spacing="2">
                          <Box
                            bg="gray.200"
                            h="14px"
                            w="70%"
                            borderRadius="md"
                          />
                          <Box
                            bg="gray.100"
                            h="11px"
                            w="40%"
                            borderRadius="md"
                          />
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            ))}
          </VStack>
        ) : history.length > 0 ? (
          <>
            {Object.entries(grouped).map(([dateLabel, items]) => (
              <Box key={dateLabel} mb="8">
                <Text
                  fontSize="xs"
                  fontWeight="700"
                  color="gray.400"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  mb="3"
                >
                  {dateLabel}
                </Text>
                <VStack spacing="3" align="stretch">
                  {items.map((item, i) => {
                    const video = item.video;
                    if (!video) return null;
                    const dur = fmtDuration(video.metadata?.duration);
                    return (
                      <Box
                        key={video._id || i}
                        bg="white"
                        borderRadius="xl"
                        boxShadow="sm"
                        border="1px solid"
                        borderColor="gray.100"
                        transition="all 0.2s"
                        _hover={{ boxShadow: "md", borderColor: "teal.200" }}
                        cursor="pointer"
                        onClick={() => playVideo(video)}
                      >
                        <HStack spacing="0">
                          <Box
                            position="relative"
                            w="140px"
                            h="79px"
                            flexShrink={0}
                            borderRadius="lg"
                            overflow="hidden"
                            m="3"
                            mr="0"
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
                              <Icon
                                as={MdPlayArrow}
                                color="white"
                                boxSize="7"
                              />
                            </Box>
                            {dur && (
                              <Badge
                                position="absolute"
                                bottom="1"
                                right="1"
                                bg="blackAlpha.800"
                                color="white"
                                fontSize="9px"
                                borderRadius="sm"
                                px="1"
                              >
                                {dur}
                              </Badge>
                            )}
                          </Box>
                          <VStack
                            align="start"
                            spacing="1"
                            flex="1"
                            px="4"
                            py="3"
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
                              color="teal.600"
                              fontWeight="medium"
                            >
                              {video.user?.channelName ??
                                video.user?.username ??
                                "Creator"}
                            </Text>
                            <HStack spacing="2" fontSize="xs" color="gray.400">
                              <Text>
                                {(video.views || 0).toLocaleString()} views
                              </Text>
                              <Text>•</Text>
                              <Text>{video.category}</Text>
                            </HStack>
                          </VStack>
                          <Text
                            fontSize="xs"
                            color="gray.300"
                            pr="4"
                            flexShrink={0}
                          >
                            {timeAgo(item.watchedAt)}
                          </Text>
                        </HStack>
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            ))}
            <Box
              ref={loadMoreRef}
              py="4"
              display="flex"
              justifyContent="center"
            >
              {loadingMore && <Spinner color="teal.400" />}
              {!hasMore && (
                <Text color="gray.400" fontSize="sm">
                  That's all your history ✓
                </Text>
              )}
            </Box>
          </>
        ) : (
          <VStack spacing="4" py="24" color="gray.400">
            <Icon as={RiHistoryLine} boxSize="16" />
            <Text fontSize="lg" fontWeight="bold">
              No history yet
            </Text>
            <Text fontSize="sm">Videos you watch will appear here</Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default WatchHistory;
