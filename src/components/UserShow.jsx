import React, { useEffect, useState, useRef, useCallback } from "react";
import { checkAuthApi } from "../services/apis/userAuth";
import { getUserVideosApi } from "../services/apis/uploadVideo";
import {
  SimpleGrid,
  Box,
  Text,
  VStack,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import VideoCard from "./VideoCard";

const UserShow = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [userId, setUserId] = useState(null);
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const auth = await checkAuthApi();
      if (auth.authenticated && auth.user?._id) {
        setUserId(auth.user._id);
      } else {
        setLoading(false);
      }
    };
    init();
  }, []);

  const fetchVideos = useCallback(async (uid, pg) => {
    if (!uid) return;
    pg === 1 ? setLoading(true) : setLoadingMore(true);
    try {
      const data = await getUserVideosApi(uid, { page: pg, limit: 12 });
      // Backend returns { videos, pagination }
      // Each video has: _id, user (populated with username/profilePicture/subscribers),
      // title, description, videoUrl, thumbnailUrl, qualities, metadata,
      // views, likes, dislikes, likedBy, dislikedBy, savedBy,
      // comments (populated), category, audience, tags, createdAt
      setVideos((prev) => (pg === 1 ? data.videos : [...prev, ...data.videos]));
      setHasMore(data.pagination.hasMore);
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
  }, [userId, fetchVideos]);

  useEffect(() => {
    if (loading || loadingMore || !hasMore || !userId) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchVideos(userId, page);
      },
      { threshold: 1.0 },
    );
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [loading, loadingMore, hasMore, userId, page, fetchVideos]);

  return (
    <Box p="4" minH="100vh" bg="gray.50">
      {loading ? (
        <SimpleGrid columns={[1, 2, 3]} spacing="5">
          {[...Array(6)].map((_, i) => (
            <Box key={i}>
              <Skeleton height="200px" borderRadius="lg" />
              <Skeleton height="20px" mt="3" />
              <Skeleton height="16px" mt="2" width="60%" />
            </Box>
          ))}
        </SimpleGrid>
      ) : videos.length > 0 ? (
        <>
          <SimpleGrid columns={[1, 2, 3]} spacing="5">
            {videos.map((video, index) => (
              <VideoCard
                key={video._id || index}
                // IDs & core
                _id={video._id}
                videoUrl={video.videoUrl}
                thumbnailUrl={video.thumbnailUrl}
                qualities={video.qualities}
                metadata={video.metadata}
                // Display info
                title={video.title}
                description={video.description}
                category={video.category}
                audience={video.audience}
                tags={video.tags}
                uploadDate={video.createdAt}
                // Stats
                views={video.views || 0}
                likes={video.likes || 0}
                dislikes={video.dislikes || 0}
                // Interaction arrays (needed by VideoPlayerUI)
                likedBy={video.likedBy || []}
                dislikedBy={video.dislikedBy || []}
                savedBy={video.savedBy || []}
                // Channel info (populated by backend)
                channelName={video.user?.username || "Unknown"}
                channelAvatar={video.user?.profilePicture || ""}
                channelId={video.user?._id || video.user}
                subscribers={video.user?.subscribers || []}
                // Comments (populated)
                comments={video.comments || []}
              />
            ))}
          </SimpleGrid>
          <Box ref={loadMoreRef} py="6" display="flex" justifyContent="center">
            {loadingMore && <Spinner color="blue.500" />}
            {!hasMore && (
              <Text color="gray.400" fontSize="sm">
                All videos loaded
              </Text>
            )}
          </Box>
        </>
      ) : (
        <VStack spacing="4" py="20" color="gray.500">
          <Text fontSize="xl" fontWeight="bold">
            No videos uploaded yet
          </Text>
          <Text>Upload your first video to see it here</Text>
        </VStack>
      )}
    </Box>
  );
};

export default UserShow;

// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { checkAuthApi } from "../services/apis/userAuth";
// import { getUserVideosApi } from "../services/apis/uploadVideo";
// import {
//   SimpleGrid,
//   Box,
//   Text,
//   VStack,
//   Skeleton,
//   Spinner,
// } from "@chakra-ui/react";
// import VideoCard from "./VideoCard";

// const UserShow = () => {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const observerRef = useRef(null);
//   const loadMoreRef = useRef(null);

//   useEffect(() => {
//     const init = async () => {
//       const auth = await checkAuthApi();
//       if (auth.authenticated && auth.user?._id) {
//         setUserId(auth.user._id);
//       } else {
//         setLoading(false);
//       }
//     };
//     init();
//   }, []);

//   const fetchVideos = useCallback(async (uid, pg) => {
//     if (!uid) return;
//     pg === 1 ? setLoading(true) : setLoadingMore(true);
//     try {
//       const data = await getUserVideosApi(uid, { page: pg, limit: 12 });
//       setVideos((prev) => (pg === 1 ? data.videos : [...prev, ...data.videos]));
//       setHasMore(data.pagination.hasMore);
//       setPage(pg + 1);
//     } catch (e) {
//       console.error(e);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (userId) fetchVideos(userId, 1);
//   }, [userId]);

//   useEffect(() => {
//     if (loading || loadingMore || !hasMore || !userId) return;
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) fetchVideos(userId, page);
//       },
//       { threshold: 1.0 },
//     );
//     if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
//     return () => observerRef.current?.disconnect();
//   }, [loading, loadingMore, hasMore, userId, page]);

//   return (
//     <Box p="4" minH="100vh" bg="gray.50">
//       {loading ? (
//         <SimpleGrid columns={[1, 2, 3]} spacing="5">
//           {[...Array(6)].map((_, i) => (
//             <Box key={i}>
//               <Skeleton height="200px" borderRadius="lg" />
//               <Skeleton height="20px" mt="3" />
//               <Skeleton height="16px" mt="2" width="60%" />
//             </Box>
//           ))}
//         </SimpleGrid>
//       ) : videos.length > 0 ? (
//         <>
//           <SimpleGrid columns={[1, 2, 3]} spacing="5">
//             {videos.map((video, index) => (
//               <VideoCard
//                 key={video._id || index}
//                 _id={video._id}
//                 audience={video.audience}
//                 description={video.description}
//                 thumbnailUrl={video.thumbnailUrl}
//                 title={video.title}
//                 videoUrl={video.videoUrl}
//                 views={video.views || 0}
//                 likes={video.likes || 0}
//                 uploadDate={video.createdAt}
//                 category={video.category}
//                 qualities={video.qualities}
//                 metadata={video.metadata}
//               />
//             ))}
//           </SimpleGrid>
//           <Box ref={loadMoreRef} py="6" display="flex" justifyContent="center">
//             {loadingMore && <Spinner color="blue.500" />}
//             {!hasMore && (
//               <Text color="gray.400" fontSize="sm">
//                 All videos loaded
//               </Text>
//             )}
//           </Box>
//         </>
//       ) : (
//         <VStack spacing="4" py="20" color="gray.500">
//           <Text fontSize="xl" fontWeight="bold">
//             No videos uploaded yet
//           </Text>
//           <Text>Upload your first video to see it here</Text>
//         </VStack>
//       )}
//     </Box>
//   );
// };

// export default UserShow;
