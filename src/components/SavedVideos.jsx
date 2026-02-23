import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Heading,
  Badge,
  SimpleGrid,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import { BsBookmarkFill } from "react-icons/bs";
import { checkAuthApi } from "../services/apis/userAuth";
import { getSavedVideosApi } from "../services/apis/uploadVideo";
import VideoCard from "./VideoCard";

const SavedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userId, setUserId] = useState(null);
  const [total, setTotal] = useState(0);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    checkAuthApi().then(({ authenticated, user }) => {
      if (authenticated && user?._id) setUserId(user._id);
      else setLoading(false);
    });
  }, []);

  const fetchVideos = useCallback(async (uid, pg) => {
    if (!uid) return;
    pg === 1 ? setLoading(true) : setLoadingMore(true);
    try {
      const data = await getSavedVideosApi(uid, { page: pg, limit: 12 });
      setVideos((prev) => (pg === 1 ? data.videos : [...prev, ...data.videos]));
      setHasMore(data.pagination.hasMore);
      setTotal(data.pagination.total);
      setPage(pg + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    if (userId) fetchVideos(userId, 1);
  }, [userId]);

  useEffect(() => {
    if (loading || loadingMore || !hasMore || !userId) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchVideos(userId, page);
      },
      { threshold: 0.5 },
    );
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [loading, loadingMore, hasMore, userId, page]);

  return (
    <Box minH="100vh" bg="gray.50" pb="80px">
      {/* Header */}
      <Box bg="white" borderBottom="1px" borderColor="gray.100" px="6" py="5">
        <HStack spacing="3">
          <Box bg="purple.50" p="3" borderRadius="xl">
            <Icon as={BsBookmarkFill} color="purple.500" boxSize="5" />
          </Box>
          <VStack align="start" spacing="0">
            <Heading size="md" color="gray.800">
              Stash
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Your saved videos
            </Text>
          </VStack>
          {total > 0 && (
            <Badge
              ml="auto"
              colorScheme="purple"
              borderRadius="full"
              px="3"
              py="1"
              fontSize="sm"
            >
              {total} saved
            </Badge>
          )}
        </HStack>
      </Box>

      <Box p="6">
        {loading ? (
          <SimpleGrid columns={[1, 2, 3]} spacing="5">
            {[...Array(9)].map((_, i) => (
              <Box key={i}>
                <Skeleton height="200px" borderRadius="xl" />
                <Skeleton height="18px" mt="3" borderRadius="md" />
                <Skeleton height="14px" mt="2" w="60%" borderRadius="md" />
              </Box>
            ))}
          </SimpleGrid>
        ) : videos.length > 0 ? (
          <>
            <SimpleGrid columns={[1, 2, 3]} spacing="5">
              {videos.map((video, i) => (
                <VideoCard
                  key={video._id || i}
                  _id={video._id}
                  videoUrl={video.videoUrl}
                  thumbnailUrl={video.thumbnailUrl}
                  qualities={video.qualities}
                  metadata={video.metadata}
                  title={video.title}
                  description={video.description}
                  category={video.category}
                  audience={video.audience}
                  tags={video.tags}
                  uploadDate={video.createdAt}
                  views={video.views || 0}
                  likes={video.likes || 0}
                  dislikes={video.dislikes || 0}
                  likedBy={video.likedBy || []}
                  dislikedBy={video.dislikedBy || []}
                  savedBy={video.savedBy || []}
                  comments={video.comments || []}
                  user={video.user}
                />
              ))}
            </SimpleGrid>
            <Box
              ref={loadMoreRef}
              py="6"
              display="flex"
              justifyContent="center"
            >
              {loadingMore && <Spinner color="purple.400" />}
              {!hasMore && videos.length > 0 && (
                <Text color="gray.400" fontSize="sm">
                  All saved videos shown ✓
                </Text>
              )}
            </Box>
          </>
        ) : (
          <VStack spacing="4" py="24" color="gray.400">
            <Icon as={BsBookmarkFill} boxSize="14" />
            <Text fontSize="lg" fontWeight="bold">
              Your stash is empty
            </Text>
            <Text fontSize="sm">Bookmark videos to save them here</Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default SavedVideos;
