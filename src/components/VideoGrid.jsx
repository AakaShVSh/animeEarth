// import React, { useEffect, useState, useRef, useCallback } from "react";
// import {
//   Box,
//   SimpleGrid,
//   HStack,
//   Text,
//   Skeleton,
//   VStack,
//   Button,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Select,
//   Spinner,
// } from "@chakra-ui/react";
// import {
//   MdHome,
//   MdTrendingUp,
//   MdMovie,
//   MdSchool,
//   MdSportsEsports,
//   MdMusicNote,
//   MdScience,
// } from "react-icons/md";
// import { FiSearch } from "react-icons/fi";
// import VideoCard from "./VideoCard";
// import { getVideosApi } from "../services/apis/uploadVideo";

// const categories = [
//   { name: "All", icon: MdHome, value: "all" },
//   { name: "Trending", icon: MdTrendingUp, value: "trending" },
//   { name: "Entertainment", icon: MdMovie, value: "entertainment" },
//   { name: "Education", icon: MdSchool, value: "education" },
//   { name: "Gaming", icon: MdSportsEsports, value: "gaming" },
//   { name: "Music", icon: MdMusicNote, value: "music" },
//   { name: "Science & Tech", icon: MdScience, value: "science" },
// ];

// function VideoGrid() {
//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sort, setSort] = useState("latest");
//   const [search, setSearch] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const observerRef = useRef(null);
//   const loadMoreRef = useRef(null);
//   const searchTimeout = useRef(null);

//   const fetchVideos = useCallback(
//     async (reset = false) => {
//       const currentPage = reset ? 1 : page;
//       if (reset) {
//         setLoading(true);
//         setVideos([]);
//       } else setLoadingMore(true);

//       try {
//         const data = await getVideosApi({
//           page: currentPage,
//           limit: 12,
//           search,
//           category: selectedCategory,
//           sort,
//         });
//         setVideos((prev) => (reset ? data.videos : [...prev, ...data.videos]));
//         setHasMore(data.pagination.hasMore);
//         if (!reset) setPage((p) => p + 1);
//         else setPage(2);
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//         setLoadingMore(false);
//       }
//     },
//     [page, search, selectedCategory, sort],
//   );

//   // Reset and fetch on filter/search/sort change
//   useEffect(() => {
//     fetchVideos(true);
//   }, [selectedCategory, sort, search]);

//   // IntersectionObserver for infinite scroll
//   useEffect(() => {
//     if (loading || loadingMore || !hasMore) return;
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) fetchVideos(false);
//       },
//       { threshold: 1.0 },
//     );
//     if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
//     return () => observerRef.current?.disconnect();
//   }, [loading, loadingMore, hasMore, fetchVideos]);

//   // Debounced search
//   const handleSearchChange = (e) => {
//     setSearchInput(e.target.value);
//     clearTimeout(searchTimeout.current);
//     searchTimeout.current = setTimeout(() => setSearch(e.target.value), 500);
//   };

//   return (
//     <Box w="100%" minH="100vh" bg="gray.50" pb="80px">
//       {/* Filter Bar */}
//       <Box
//         position="sticky"
//         top="0"
//         zIndex="5"
//         bg="white"
//         borderBottom="1px"
//         borderColor="gray.200"
//         px="3"
//         boxShadow="sm"
//       >
//         <HStack
//           spacing="2"
//           py="2"
//           overflowX="auto"
//           css={{
//             "&::-webkit-scrollbar": { height: "4px" },
//             "&::-webkit-scrollbar-thumb": {
//               background: "#888",
//               borderRadius: "3px",
//             },
//           }}
//         >
//           {categories.map((cat) => {
//             const Icon = cat.icon;
//             return (
//               <Button
//                 key={cat.value}
//                 size="sm"
//                 leftIcon={<Icon />}
//                 onClick={() => setSelectedCategory(cat.value)}
//                 variant={selectedCategory === cat.value ? "solid" : "outline"}
//                 colorScheme={selectedCategory === cat.value ? "blue" : "gray"}
//                 borderRadius="full"
//                 px="4"
//                 whiteSpace="nowrap"
//                 _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
//                 transition="all 0.2s"
//               >
//                 {cat.name}
//               </Button>
//             );
//           })}
//         </HStack>

//         {/* Search + Sort */}
//         <HStack spacing="3" pb="2">
//           <InputGroup size="sm" flex="1">
//             <InputLeftElement pointerEvents="none">
//               <FiSearch color="gray" />
//             </InputLeftElement>
//             <Input
//               value={searchInput}
//               onChange={handleSearchChange}
//               placeholder="Search videos..."
//               borderRadius="full"
//               bg="gray.50"
//             />
//           </InputGroup>
//           <Select
//             size="sm"
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             w="140px"
//             borderRadius="full"
//             bg="gray.50"
//           >
//             <option value="latest">Latest</option>
//             <option value="popular">Most Viewed</option>
//             <option value="liked">Most Liked</option>
//             <option value="oldest">Oldest</option>
//           </Select>
//         </HStack>
//       </Box>

//       {/* Video Grid */}
//       <Box p="4">
//         {loading ? (
//           <SimpleGrid columns={[1, 2, 3]} spacing="5">
//             {[...Array(9)].map((_, i) => (
//               <Box key={i}>
//                 <Skeleton height="200px" borderRadius="lg" />
//                 <Skeleton height="20px" mt="3" />
//                 <Skeleton height="16px" mt="2" width="60%" />
//               </Box>
//             ))}
//           </SimpleGrid>
//         ) : videos.length > 0 ? (
//           <>
//             <SimpleGrid columns={[1, 2, 3]} spacing="5">
//               {videos.map((video, index) => (
//                 <VideoCard
//                   key={video._id || index}
//                   _id={video._id}
//                   audience={video.audience}
//                   description={video.description}
//                   thumbnailUrl={video.thumbnailUrl}
//                   title={video.title}
//                   videoUrl={video.videoUrl}
//                   views={video.views || 0}
//                   likes={video.likes || 0}
//                   uploadDate={video.createdAt}
//                   category={video.category}
//                   qualities={video.qualities}
//                   metadata={video.metadata}
//                 />
//               ))}
//             </SimpleGrid>

//             {/* Infinite scroll trigger */}
//             <Box
//               ref={loadMoreRef}
//               py="4"
//               display="flex"
//               justifyContent="center"
//             >
//               {loadingMore && <Spinner color="blue.500" size="lg" />}
//               {!hasMore && videos.length > 0 && (
//                 <Text color="gray.400" fontSize="sm">
//                   You've seen all videos
//                 </Text>
//               )}
//             </Box>
//           </>
//         ) : (
//           <VStack spacing="4" py="20" color="gray.500">
//             <Text fontSize="xl" fontWeight="bold">
//               No videos found
//             </Text>
//             <Text>Try a different search or category</Text>
//           </VStack>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default VideoGrid;

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  SimpleGrid,
  HStack,
  Text,
  Skeleton,
  VStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spinner,
} from "@chakra-ui/react";
import {
  MdHome,
  MdTrendingUp,
  MdMovie,
  MdSchool,
  MdSportsEsports,
  MdMusicNote,
  MdScience,
} from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import VideoCard from "./VideoCard";
import { getVideosApi } from "../services/apis/uploadVideo";

const categories = [
  { name: "All", icon: MdHome, value: "all" },
  { name: "Trending", icon: MdTrendingUp, value: "trending" },
  { name: "Entertainment", icon: MdMovie, value: "entertainment" },
  { name: "Education", icon: MdSchool, value: "education" },
  { name: "Gaming", icon: MdSportsEsports, value: "gaming" },
  { name: "Music", icon: MdMusicNote, value: "music" },
  { name: "Science & Tech", icon: MdScience, value: "science" },
];

function VideoGrid() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const searchTimer = useRef(null);

  const fetchVideos = useCallback(
    async (reset = false) => {
      const pg = reset ? 1 : page;
      if (reset) {
        setLoading(true);
        setVideos([]);
      } else setLoadingMore(true);
      try {
        const data = await getVideosApi({
          page: pg,
          limit: 12,
          search,
          category: selectedCategory,
          sort,
        });
        setVideos((prev) => (reset ? data.videos : [...prev, ...data.videos]));
        setHasMore(data.pagination.hasMore);
        if (reset) setPage(2);
        else setPage((p) => p + 1);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [page, search, selectedCategory, sort],
  );

  useEffect(() => {
    fetchVideos(true);
  }, [selectedCategory, sort, search]);

  useEffect(() => {
    if (loading || loadingMore || !hasMore) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchVideos(false);
      },
      { threshold: 0.5 },
    );
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [loading, loadingMore, hasMore, fetchVideos]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => setSearch(e.target.value), 500);
  };

  return (
    <Box w="100%" minH="100vh" bg="gray.50" pb="80px">
      {/* ── Filter bar ─────────────────────────────────────── */}
      <Box
        position="sticky"
        top="0"
        zIndex="5"
        bg="white"
        borderBottom="1px"
        borderColor="gray.200"
        px="3"
        boxShadow="sm"
      >
        <HStack
          spacing="2"
          py="2"
          overflowX="auto"
          css={{
            "&::-webkit-scrollbar": { height: "4px" },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "3px",
            },
          }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Button
                key={cat.value}
                size="sm"
                leftIcon={<Icon />}
                onClick={() => setSelectedCategory(cat.value)}
                variant={selectedCategory === cat.value ? "solid" : "outline"}
                colorScheme={selectedCategory === cat.value ? "purple" : "gray"}
                borderRadius="full"
                px="4"
                whiteSpace="nowrap"
                _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
                transition="all 0.2s"
              >
                {cat.name}
              </Button>
            );
          })}
        </HStack>
        <HStack spacing="3" pb="2">
          <InputGroup size="sm" flex="1">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray" />
            </InputLeftElement>
            <Input
              value={searchInput}
              onChange={handleSearch}
              placeholder="Search videos…"
              borderRadius="full"
              bg="gray.50"
            />
          </InputGroup>
          <Select
            size="sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            w="140px"
            borderRadius="full"
            bg="gray.50"
          >
            <option value="latest">Latest</option>
            <option value="popular">Most Viewed</option>
            <option value="liked">Most Liked</option>
            <option value="oldest">Oldest</option>
          </Select>
        </HStack>
      </Box>

      {/* ── Grid ───────────────────────────────────────────── */}
      <Box p="4">
        {loading ? (
          <SimpleGrid columns={[1, 2, 3]} spacing="5">
            {[...Array(9)].map((_, i) => (
              <Box key={i}>
                <Skeleton height="200px" borderRadius="xl" />
                <Skeleton height="18px" mt="3" />
                <Skeleton height="14px" mt="2" width="60%" />
              </Box>
            ))}
          </SimpleGrid>
        ) : videos.length > 0 ? (
          <>
            <SimpleGrid columns={[1, 2, 3]} spacing="5">
              {videos.map((video, i) => (
                <VideoCard
                  key={video._id || i}
                  /* ── Core ─────────────────────────────── */
                  _id={video._id}
                  videoUrl={video.videoUrl}
                  thumbnailUrl={video.thumbnailUrl}
                  qualities={video.qualities}
                  metadata={video.metadata}
                  /* ── Display ──────────────────────────── */
                  title={video.title}
                  description={video.description}
                  category={video.category}
                  audience={video.audience}
                  tags={video.tags}
                  uploadDate={video.createdAt}
                  /* ── Live counters ─────────────────────── */
                  views={video.views || 0}
                  likes={video.likes || 0}
                  dislikes={video.dislikes || 0}
                  /* ── Interaction arrays ────────────────── */
                  likedBy={video.likedBy || []}
                  dislikedBy={video.dislikedBy || []}
                  savedBy={video.savedBy || []}
                  comments={video.comments || []}
                  /* ── Full user object (backend-populated) ─ */
                  user={video.user}
                />
              ))}
            </SimpleGrid>
            <Box
              ref={loadMoreRef}
              py="4"
              display="flex"
              justifyContent="center"
            >
              {loadingMore && <Spinner color="purple.500" size="lg" />}
              {!hasMore && videos.length > 0 && (
                <Text color="gray.400" fontSize="sm">
                  You've seen all videos ✓
                </Text>
              )}
            </Box>
          </>
        ) : (
          <VStack spacing="4" py="20" color="gray.500">
            <Text fontSize="xl" fontWeight="bold">
              No videos found
            </Text>
            <Text>Try a different search or category</Text>
          </VStack>
        )}
      </Box>
    </Box>
  );
}

export default VideoGrid;