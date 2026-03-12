// import React, { useEffect, useState, useRef, useCallback } from "react";
// import {
//   Box,
//   Flex,
//   VStack,
//   HStack,
//   Text,
//   Avatar,
//   Button,
//   SimpleGrid,
//   Tabs,
//   TabList,
//   Tab,
//   TabPanels,
//   TabPanel,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Icon,
//   Heading,
//   Spinner,
//   Skeleton,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   Textarea,
//   useDisclosure,
//   useToast,
// } from "@chakra-ui/react";
// import {
//   MdOutlineVideoLibrary,
//   MdOutlineInfo,
//   MdOutlinePeople,
//   MdSearch,
//   MdVerified,
//   MdOutlineOndemandVideo,
//   MdEdit,
// } from "react-icons/md";
// import { BsBellFill, BsBell } from "react-icons/bs";
// import { AiOutlineShareAlt, AiFillDashboard } from "react-icons/ai";
// import { FiUpload } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { checkAuthApi } from "../services/apis/userAuth";
// import { getUserVideosApi, subscribeApi } from "../services/apis/uploadVideo";
// import VideoCard from "./VideoCard";

// // ── API ────────────────────────────────────────────────────────────────────
// const api = axios.create({
//   baseURL:
//     window.location.hostname === "localhost"
//       ? "http://localhost:80"
//       : "https://animetubebackend.onrender.com",
//   withCredentials: true,
// });

// // Returns { message, user: { _id, username, profilePicture, channelName, channelDescription, hasChannel } }
// const activateStudioApi = (userId, channelName, channelDescription = "") =>
//   api
//     .post("/videos/studio/activate", {
//       userId,
//       channelName,
//       channelDescription,
//     })
//     .then((r) => r.data);

// // ── Helper ─────────────────────────────────────────────────────────────────
// const fmt = (n = 0) => {
//   if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
//   if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
//   return String(n);
// };

// // ============================================================================
// //  ProfilePage
// //  - Own profile:   /Profile  (no props needed)
// //  - Other profile: /channel/:userId  (pass targetUserId prop)
// // ============================================================================
// export default function ProfilePage({ targetUserId = null }) {
//   const toast = useToast();
//   const navigate = useNavigate();
//   const {
//     isOpen: isStudioOpen,
//     onOpen: openStudioModal,
//     onClose: closeStudio,
//   } = useDisclosure();

//   // ── State ──────────────────────────────────────────────────────────────────
//   const [currentUser, setCurrentUser] = useState(null);
//   const [profileUser, setProfileUser] = useState(null);
//   const [isOwnProfile, setIsOwnProfile] = useState(false);
//   const [authLoading, setAuthLoading] = useState(true);

//   const [studioName, setStudioName] = useState("");
//   const [studioDesc, setStudioDesc] = useState("");
//   const [activating, setActivating] = useState(false);

//   const [videos, setVideos] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loadingVids, setLoadingVids] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [search, setSearch] = useState("");
//   const [totalViews, setTotalViews] = useState(0);

//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followerCount, setFollowerCount] = useState(0);
//   const [followLoading, setFollowLoading] = useState(false);

//   const observerRef = useRef(null);
//   const loadMoreRef = useRef(null);

//   // ── 1. Auth ────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     checkAuthApi().then(({ authenticated, user }) => {
//       if (authenticated && user) {
//         setCurrentUser(user);
//         const own = !targetUserId || String(targetUserId) === String(user._id);
//         setIsOwnProfile(own);
//         if (own) {
//           // Own profile: use auth user directly as the profile to display
//           setProfileUser(user);
//           setFollowerCount(user.subscribers?.length ?? 0);
//         }
//       }
//       setAuthLoading(false);
//     });
//   }, [targetUserId]);

//   // ── 2. Videos ──────────────────────────────────────────────────────────────
//   const uid = targetUserId || currentUser?._id;

//   const fetchVideos = useCallback(
//     async (pg) => {
//       if (!uid) return;
//       pg === 1 ? setLoadingVids(true) : setLoadingMore(true);
//       try {
//         const data = await getUserVideosApi(uid, { page: pg, limit: 12 });
//         const vids = data.videos || [];

//         setVideos((prev) => (pg === 1 ? vids : [...prev, ...vids]));
//         setHasMore(data.pagination.hasMore);
//         setPage(pg + 1);
//         setTotalViews((prev) =>
//           pg === 1
//             ? vids.reduce((s, v) => s + (v.views || 0), 0)
//             : prev + vids.reduce((s, v) => s + (v.views || 0), 0),
//         );

//         // For another user's profile: build profileUser from first video's populated user object
//         // (backend returns user with hasChannel, channelName, channelDescription, subscribers)
//         if (!isOwnProfile && vids.length > 0) {
//           const u = vids[0].user;
//           setProfileUser((prev) => {
//             if (prev) return prev; // already set
//             setFollowerCount(u?.subscribers?.length ?? 0);
//             if (currentUser) {
//               setIsFollowing(
//                 (u?.subscribers ?? []).some(
//                   (s) => String(s) === String(currentUser._id),
//                 ),
//               );
//             }
//             return u;
//           });
//         }
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoadingVids(false);
//         setLoadingMore(false);
//       }
//     },
//     [uid, isOwnProfile, currentUser],
//   );

//   useEffect(() => {
//     if (uid) fetchVideos(1);
//   }, [uid]);

//   // ── 3. Infinite scroll ─────────────────────────────────────────────────────
//   useEffect(() => {
//     if (loadingVids || loadingMore || !hasMore) return;
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) fetchVideos(page);
//       },
//       { threshold: 0.5 },
//     );
//     if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
//     return () => observerRef.current?.disconnect();
//   }, [loadingVids, loadingMore, hasMore, page, fetchVideos]);

//   // ── Studio: open modal, pre-fill with existing data ────────────────────────
//   const openStudio = () => {
//     // Always pre-fill from profileUser so editing works correctly
//     setStudioName(profileUser?.channelName || "");
//     setStudioDesc(profileUser?.channelDescription || "");
//     openStudioModal();
//   };

//   // ── Studio: submit ─────────────────────────────────────────────────────────
//   const handleActivateStudio = async () => {
//     if (!studioName.trim() || !currentUser) return;
//     setActivating(true);
//     try {
//       // Server returns the full updated user object — use IT, not local state
//       const data = await activateStudioApi(
//         currentUser._id,
//         studioName.trim(),
//         studioDesc.trim(),
//       );

//       // data.user = { _id, username, profilePicture, channelName, channelDescription, hasChannel }
//       const serverUser = data.user;

//       // Patch both currentUser and profileUser with server truth
//       const patch = {
//         hasChannel: serverUser.hasChannel, // true
//         channelName: serverUser.channelName, // "codecraft"
//         channelDescription: serverUser.channelDescription, // "Adsterra is…"
//       };

//       setCurrentUser((prev) => ({ ...prev, ...patch }));
//       setProfileUser((prev) => ({ ...prev, ...patch }));

//       closeStudio();
//       toast({
//         title: serverUser.hasChannel
//           ? "🎬 Studio updated!"
//           : "🎬 Studio is live!",
//         status: "success",
//         duration: 2500,
//         position: "top",
//       });
//     } catch (e) {
//       toast({
//         title: e?.response?.data?.error || "Failed",
//         status: "error",
//         duration: 2000,
//         position: "top",
//       });
//     } finally {
//       setActivating(false);
//     }
//   };

//   // ── Follow ──────────────────────────────────────────────────────────────────
//   const handleFollow = async () => {
//     if (!currentUser) {
//       navigate("/SignIn");
//       return;
//     }
//     if (isOwnProfile || String(currentUser._id) === String(profileUser?._id)) {
//       toast({
//         title: "You can't follow your own studio",
//         status: "info",
//         duration: 2000,
//         position: "top",
//       });
//       return;
//     }
//     const prev = isFollowing;
//     setIsFollowing(!isFollowing);
//     setFollowerCount((c) => (isFollowing ? c - 1 : c + 1));
//     setFollowLoading(true);
//     try {
//       await subscribeApi(profileUser._id, currentUser._id);
//       toast({
//         title: isFollowing ? "Unfollowed" : "Following! 🔔",
//         status: isFollowing ? "info" : "success",
//         duration: 1500,
//         position: "top",
//       });
//     } catch {
//       setIsFollowing(prev);
//       setFollowerCount((c) => (isFollowing ? c + 1 : c - 1));
//     } finally {
//       setFollowLoading(false);
//     }
//   };

//   // ── Derived ────────────────────────────────────────────────────────────────
//   // Read ONLY from profileUser — which is always kept in sync with server responses
//   const hasChannel = profileUser?.hasChannel === true;
//   const studioDisplay = hasChannel
//     ? profileUser?.channelName || profileUser?.username || "Studio"
//     : profileUser?.username || "User";
//   const joinedYear = profileUser?.createdAt
//     ? new Date(profileUser.createdAt).getFullYear()
//     : "—";

//   const filteredVideos = search
//     ? videos.filter(
//         (v) =>
//           v.title?.toLowerCase().includes(search.toLowerCase()) ||
//           (v.tags || []).some((t) =>
//             t.toLowerCase().includes(search.toLowerCase()),
//           ),
//       )
//     : videos;

//   const statCards = [
//     { label: "Followers", value: fmt(followerCount) },
//     {
//       label: "Videos",
//       value: hasMore ? `${videos.length}+` : String(videos.length),
//     },
//     { label: "Total Views", value: fmt(totalViews) },
//     { label: "Since", value: String(joinedYear) },
//   ];

//   if (authLoading)
//     return (
//       <Flex justify="center" align="center" minH="60vh">
//         <Spinner size="xl" color="gray.400" />
//       </Flex>
//     );

//   return (
//     <Box bg="gray.50" minH="100vh">
//       {/* ── HERO ──────────────────────────────────────────────────────── */}
//       <Box bg="gray.900" position="relative" overflow="hidden">
//         <Box
//           position="absolute"
//           top="-80px"
//           right="-80px"
//           w="320px"
//           h="320px"
//           borderRadius="full"
//           border="1px solid"
//           borderColor="purple.800"
//           opacity="0.25"
//           pointerEvents="none"
//         />
//         <Box
//           position="absolute"
//           bottom="0"
//           left="0"
//           w="100%"
//           h="2px"
//           bg="linear-gradient(to right, #805AD5, #4299E1)"
//         />

//         <Box
//           maxW="1200px"
//           mx="auto"
//           px={{ base: 5, md: 10 }}
//           py={{ base: 8, md: 12 }}
//         >
//           <Flex
//             direction={{ base: "column", lg: "row" }}
//             align={{ base: "start", lg: "flex-end" }}
//             justify="space-between"
//             gap={8}
//             wrap="wrap"
//           >
//             {/* Identity */}
//             <HStack spacing={6} align="flex-end" wrap="wrap">
//               <Box position="relative" flexShrink={0}>
//                 <Box
//                   position="absolute"
//                   inset="-4px"
//                   borderRadius="full"
//                   border="2px solid"
//                   borderColor={hasChannel ? "purple.400" : "gray.600"}
//                 />
//                 <Avatar
//                   size="2xl"
//                   src={profileUser?.profilePicture}
//                   name={profileUser?.username || "User"}
//                   bg="purple.900"
//                   color="purple.100"
//                 />
//                 {hasChannel && (
//                   <Box position="absolute" bottom="0" right="-2">
//                     <Icon as={MdVerified} color="purple.400" boxSize="5" />
//                   </Box>
//                 )}
//               </Box>

//               <VStack align="flex-start" spacing="1.5">
//                 {profileUser?.username && (
//                   <Text
//                     fontSize="xs"
//                     color="purple.300"
//                     letterSpacing="widest"
//                     textTransform="uppercase"
//                   >
//                     @{profileUser.username}
//                   </Text>
//                 )}
//                 <Heading
//                   fontSize={{ base: "3xl", md: "5xl" }}
//                   fontWeight="800"
//                   color="white"
//                   lineHeight="1"
//                   letterSpacing="tight"
//                 >
//                   {studioDisplay}
//                 </Heading>
//                 {/* Channel description — from profileUser, updated on activation */}
//                 {profileUser?.channelDescription && (
//                   <Text
//                     fontSize="sm"
//                     color="whiteAlpha.500"
//                     maxW="400px"
//                     noOfLines={2}
//                   >
//                     {profileUser.channelDescription}
//                   </Text>
//                 )}
//                 {!hasChannel && isOwnProfile && (
//                   <Text fontSize="xs" color="orange.300">
//                     ⚡ Activate your studio to start uploading
//                   </Text>
//                 )}

//                 <HStack spacing="3" pt="2" wrap="wrap">
//                   {isOwnProfile ? (
//                     <>
//                       {hasChannel ? (
//                         <>
//                           <Link to="/Upload">
//                             <Button
//                               size="sm"
//                               bg="purple.500"
//                               color="white"
//                               borderRadius="md"
//                               _hover={{ bg: "purple.400" }}
//                               leftIcon={<FiUpload />}
//                               transition="all 0.2s"
//                             >
//                               Upload
//                             </Button>
//                           </Link>
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             color="whiteAlpha.600"
//                             border="1px solid"
//                             borderColor="whiteAlpha.200"
//                             borderRadius="md"
//                             leftIcon={<MdEdit />}
//                             onClick={openStudio}
//                             _hover={{ bg: "whiteAlpha.100", color: "white" }}
//                           >
//                             Edit Studio
//                           </Button>
//                         </>
//                       ) : (
//                         <Button
//                           size="sm"
//                           bg="purple.500"
//                           color="white"
//                           borderRadius="md"
//                           onClick={openStudio}
//                           _hover={{ bg: "purple.400" }}
//                           leftIcon={<FiUpload />}
//                           transition="all 0.2s"
//                         >
//                           Activate Studio
//                         </Button>
//                       )}
//                       <Link to="/Dashboard">
//                         <Button
//                           size="sm"
//                           variant="ghost"
//                           color="whiteAlpha.600"
//                           border="1px solid"
//                           borderColor="whiteAlpha.200"
//                           borderRadius="md"
//                           leftIcon={<AiFillDashboard />}
//                           _hover={{ bg: "whiteAlpha.100", color: "white" }}
//                         >
//                           Dashboard
//                         </Button>
//                       </Link>
//                     </>
//                   ) : (
//                     <>
//                       <Button
//                         size="sm"
//                         bg={isFollowing ? "transparent" : "purple.500"}
//                         color={isFollowing ? "purple.300" : "white"}
//                         border="1px solid"
//                         borderColor="purple.400"
//                         borderRadius="md"
//                         leftIcon={isFollowing ? <BsBellFill /> : <BsBell />}
//                         _hover={{
//                           bg: isFollowing ? "whiteAlpha.100" : "purple.400",
//                         }}
//                         onClick={handleFollow}
//                         isLoading={followLoading}
//                         transition="all 0.2s"
//                       >
//                         {isFollowing ? "Following" : "+ Follow"}
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         color="whiteAlpha.600"
//                         border="1px solid"
//                         borderColor="whiteAlpha.200"
//                         borderRadius="md"
//                         leftIcon={<AiOutlineShareAlt />}
//                         _hover={{ bg: "whiteAlpha.100", color: "white" }}
//                         onClick={() => {
//                           navigator.clipboard.writeText(window.location.href);
//                           toast({
//                             description: "Link copied!",
//                             status: "success",
//                             duration: 1200,
//                           });
//                         }}
//                       >
//                         Share
//                       </Button>
//                     </>
//                   )}
//                 </HStack>
//               </VStack>
//             </HStack>

//             {/* Stats */}
//             <HStack
//               spacing="0"
//               borderLeft={{ lg: "1px solid" }}
//               borderColor="whiteAlpha.100"
//               wrap="wrap"
//             >
//               {statCards.map((s, i) => (
//                 <VStack
//                   key={i}
//                   spacing="0"
//                   px={{ base: 4, md: 6 }}
//                   py="4"
//                   borderRight="1px solid"
//                   borderColor="whiteAlpha.100"
//                   align="center"
//                 >
//                   <Text
//                     fontSize={{ base: "xl", md: "3xl" }}
//                     fontWeight="800"
//                     color="white"
//                     letterSpacing="tight"
//                   >
//                     {s.value}
//                   </Text>
//                   <Text
//                     fontSize="9px"
//                     letterSpacing="widest"
//                     color="whiteAlpha.400"
//                     textTransform="uppercase"
//                   >
//                     {s.label}
//                   </Text>
//                 </VStack>
//               ))}
//             </HStack>
//           </Flex>
//         </Box>
//       </Box>

//       {/* ── TABS ──────────────────────────────────────────────────────── */}
//       <Box maxW="1200px" mx="auto" px={{ base: 5, md: 10 }}>
//         <Tabs variant="unstyled">
//           <Box
//             position="sticky"
//             top="0"
//             zIndex="10"
//             bg="gray.50"
//             borderBottom="1px solid"
//             borderColor="gray.200"
//             boxShadow="0 1px 0 rgba(0,0,0,0.04)"
//           >
//             <Flex
//               align="center"
//               justify="space-between"
//               wrap="wrap"
//               gap="3"
//               py={{ base: 1, md: 0 }}
//             >
//               <TabList>
//                 {[
//                   { label: "Videos", icon: MdOutlineVideoLibrary },
//                   { label: "About", icon: MdOutlineInfo },
//                   { label: "Followers", icon: MdOutlinePeople },
//                 ].map(({ label, icon }) => (
//                   <Tab
//                     key={label}
//                     px={{ base: 3, md: 5 }}
//                     py="4"
//                     fontSize="xs"
//                     letterSpacing="widest"
//                     textTransform="uppercase"
//                     color="gray.400"
//                     fontWeight="medium"
//                     borderBottom="2px solid"
//                     borderColor="transparent"
//                     _selected={{
//                       color: "gray.800",
//                       fontWeight: "bold",
//                       borderColor: "purple.500",
//                     }}
//                     _hover={{ color: "gray.600" }}
//                     transition="all 0.15s"
//                   >
//                     <HStack spacing="2">
//                       <Icon as={icon} boxSize="4" />
//                       <Text display={{ base: "none", sm: "block" }}>
//                         {label}
//                       </Text>
//                     </HStack>
//                   </Tab>
//                 ))}
//               </TabList>

//               <InputGroup
//                 size="sm"
//                 w={{ base: "full", sm: "200px" }}
//                 mb={{ base: 2, sm: 0 }}
//               >
//                 <InputLeftElement pointerEvents="none">
//                   <Icon as={MdSearch} color="gray.400" />
//                 </InputLeftElement>
//                 <Input
//                   placeholder="Search videos…"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   bg="white"
//                   borderRadius="full"
//                   _focus={{ borderColor: "purple.400" }}
//                 />
//               </InputGroup>
//             </Flex>
//           </Box>

//           <TabPanels>
//             {/* VIDEOS */}
//             <TabPanel px="0" py="6">
//               {loadingVids ? (
//                 <SimpleGrid columns={[1, 2, 3]} spacing="5">
//                   {[...Array(6)].map((_, i) => (
//                     <Box key={i}>
//                       <Skeleton height="200px" borderRadius="xl" />
//                       <Skeleton height="18px" mt="3" />
//                       <Skeleton height="14px" mt="2" w="60%" />
//                     </Box>
//                   ))}
//                 </SimpleGrid>
//               ) : filteredVideos.length > 0 ? (
//                 <>
//                   <SimpleGrid columns={[1, 2, 3]} spacing="5">
//                     {filteredVideos.map((video, i) => (
//                       <VideoCard
//                         key={video._id || i}
//                         _id={video._id}
//                         videoUrl={video.videoUrl}
//                         thumbnailUrl={video.thumbnailUrl}
//                         qualities={video.qualities}
//                         metadata={video.metadata}
//                         title={video.title}
//                         description={video.description}
//                         category={video.category}
//                         audience={video.audience}
//                         tags={video.tags}
//                         uploadDate={video.createdAt}
//                         views={video.views || 0}
//                         likes={video.likes || 0}
//                         dislikes={video.dislikes || 0}
//                         likedBy={video.likedBy || []}
//                         dislikedBy={video.dislikedBy || []}
//                         savedBy={video.savedBy || []}
//                         comments={video.comments || []}
//                         user={video.user}
//                         isOwnProfile={isOwnProfile}
//                         onDeleted={(id) =>
//                           setVideos((prev) => prev.filter((v) => v._id !== id))
//                         }
//                         onUpdated={(updated) =>
//                           setVideos((prev) =>
//                             prev.map((v) =>
//                               v._id === updated._id ? { ...v, ...updated } : v,
//                             ),
//                           )
//                         }
//                       />
//                     ))}
//                   </SimpleGrid>
//                   <Box
//                     ref={loadMoreRef}
//                     py="6"
//                     display="flex"
//                     justifyContent="center"
//                   >
//                     {loadingMore && <Spinner color="purple.400" />}
//                     {!hasMore && (
//                       <Text color="gray.400" fontSize="sm">
//                         All videos shown ✓
//                       </Text>
//                     )}
//                   </Box>
//                 </>
//               ) : (
//                 <VStack spacing="4" py="20" color="gray.400">
//                   <Icon as={MdOutlineOndemandVideo} boxSize="16" />
//                   <Text fontSize="lg" fontWeight="bold">
//                     {search
//                       ? "No matching videos"
//                       : isOwnProfile
//                         ? "No videos uploaded yet"
//                         : "No videos yet"}
//                   </Text>
//                   {isOwnProfile && !hasChannel && (
//                     <Button
//                       colorScheme="purple"
//                       onClick={openStudio}
//                       borderRadius="full"
//                     >
//                       Activate your studio first
//                     </Button>
//                   )}
//                   {isOwnProfile && hasChannel && !search && (
//                     <Link to="/Upload">
//                       <Button
//                         colorScheme="purple"
//                         borderRadius="full"
//                         leftIcon={<FiUpload />}
//                       >
//                         Upload your first video
//                       </Button>
//                     </Link>
//                   )}
//                 </VStack>
//               )}
//             </TabPanel>

//             {/* ABOUT */}
//             <TabPanel px="0" py="6">
//               <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
//                 {/* Left: description + categories */}
//                 <VStack align="start" spacing="6">
//                   <Box w="100%">
//                     <HStack mb="3" justify="space-between">
//                       <Text
//                         fontSize="xs"
//                         color="gray.400"
//                         textTransform="uppercase"
//                         letterSpacing="wide"
//                         fontWeight="bold"
//                       >
//                         Studio Description
//                       </Text>
//                       {isOwnProfile && (
//                         <Button
//                           size="xs"
//                           variant="ghost"
//                           colorScheme="purple"
//                           leftIcon={<MdEdit />}
//                           onClick={openStudio}
//                         >
//                           Edit
//                         </Button>
//                       )}
//                     </HStack>
//                     <Text fontSize="md" color="gray.700" lineHeight="1.9">
//                       {/* profileUser.channelDescription is the live value from server */}
//                       {profileUser?.channelDescription
//                         ? profileUser.channelDescription
//                         : isOwnProfile
//                           ? "No description yet. Click Edit to add one."
//                           : "No description provided."}
//                     </Text>
//                   </Box>

//                   {/* Content categories derived from uploaded videos */}
//                   {(() => {
//                     const cats = [
//                       ...new Set(videos.map((v) => v.category).filter(Boolean)),
//                     ];
//                     return cats.length > 0 ? (
//                       <Box w="100%">
//                         <Text
//                           fontSize="xs"
//                           color="gray.400"
//                           textTransform="uppercase"
//                           letterSpacing="wide"
//                           fontWeight="bold"
//                           mb="3"
//                         >
//                           Content Categories
//                         </Text>
//                         <Flex wrap="wrap" gap="2">
//                           {cats.map((c) => (
//                             <Box
//                               key={c}
//                               px="3"
//                               py="1"
//                               bg="purple.50"
//                               color="purple.600"
//                               borderRadius="full"
//                               fontSize="xs"
//                               fontWeight="medium"
//                               border="1px solid"
//                               borderColor="purple.100"
//                             >
//                               {c}
//                             </Box>
//                           ))}
//                         </Flex>
//                       </Box>
//                     ) : null;
//                   })()}
//                 </VStack>

//                 {/* Right: detail cards */}
//                 <VStack align="start" spacing="4">
//                   <Text
//                     fontSize="xs"
//                     color="gray.400"
//                     textTransform="uppercase"
//                     letterSpacing="wide"
//                     fontWeight="bold"
//                   >
//                     Details
//                   </Text>

//                   <SimpleGrid columns={2} spacing="4" w="100%">
//                     {[
//                       {
//                         label: "Studio Name",
//                         // Reads profileUser.channelName — updated immediately after activation via setProfileUser patch
//                         value: hasChannel
//                           ? profileUser?.channelName || "—"
//                           : "Not set",
//                       },
//                       {
//                         label: "Username",
//                         value: `@${profileUser?.username || "—"}`,
//                       },
//                       {
//                         label: "Joined",
//                         // joinedYear computed from profileUser.createdAt
//                         value: String(joinedYear),
//                       },
//                       {
//                         label: "Followers",
//                         value: fmt(followerCount),
//                       },
//                       {
//                         label: "Total Videos",
//                         value: hasMore
//                           ? `${videos.length}+`
//                           : String(videos.length),
//                       },
//                       {
//                         label: "Total Views",
//                         value: fmt(totalViews),
//                       },
//                     ].map((item) => (
//                       <Box
//                         key={item.label}
//                         bg="white"
//                         border="1px solid"
//                         borderColor="gray.200"
//                         borderRadius="lg"
//                         p="4"
//                       >
//                         <Text
//                           fontSize="9px"
//                           color="gray.400"
//                           textTransform="uppercase"
//                           letterSpacing="wide"
//                           mb="1"
//                         >
//                           {item.label}
//                         </Text>
//                         <Text
//                           fontSize="sm"
//                           color="gray.800"
//                           fontWeight="semibold"
//                           noOfLines={1}
//                         >
//                           {item.value}
//                         </Text>
//                       </Box>
//                     ))}
//                   </SimpleGrid>

//                   {/* Studio status */}
//                   <Box
//                     bg="white"
//                     border="1px solid"
//                     borderColor="gray.200"
//                     borderRadius="lg"
//                     p="4"
//                     w="100%"
//                   >
//                     <Text
//                       fontSize="9px"
//                       color="gray.400"
//                       textTransform="uppercase"
//                       letterSpacing="wide"
//                       mb="2"
//                     >
//                       Studio Status
//                     </Text>
//                     <HStack spacing="2">
//                       <Box
//                         w="8px"
//                         h="8px"
//                         borderRadius="full"
//                         bg={hasChannel ? "green.400" : "orange.400"}
//                         boxShadow={
//                           hasChannel
//                             ? "0 0 6px rgba(72,187,120,0.6)"
//                             : "0 0 6px rgba(237,137,54,0.5)"
//                         }
//                       />
//                       <Text
//                         fontSize="sm"
//                         fontWeight="semibold"
//                         color={hasChannel ? "green.600" : "orange.600"}
//                       >
//                         {hasChannel ? "Active" : "Not Activated"}
//                       </Text>
//                       {!hasChannel && isOwnProfile && (
//                         <Button
//                           size="xs"
//                           colorScheme="orange"
//                           variant="ghost"
//                           onClick={openStudio}
//                         >
//                           Activate →
//                         </Button>
//                       )}
//                     </HStack>
//                   </Box>
//                 </VStack>
//               </SimpleGrid>
//             </TabPanel>

//             {/* FOLLOWERS */}
//             <TabPanel px="0" py="6">
//               <VStack align="center" py="12" color="gray.400" spacing="3">
//                 <Icon as={MdOutlinePeople} boxSize="12" />
//                 <Text fontWeight="bold" fontSize="xl">
//                   {fmt(followerCount)} followers
//                 </Text>
//                 <Text fontSize="sm">Follower list is private</Text>
//               </VStack>
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Box>

//       {/* ── Studio Modal ───────────────────────────────────────────────── */}
//       <Modal isOpen={isStudioOpen} onClose={closeStudio} size="md">
//         <ModalOverlay backdropFilter="blur(6px)" />
//         <ModalContent borderRadius="2xl">
//           <ModalHeader>
//             <HStack spacing="3">
//               <Box bg="purple.100" p="2" borderRadius="lg">
//                 <Icon
//                   as={MdOutlineVideoLibrary}
//                   color="purple.500"
//                   boxSize="5"
//                 />
//               </Box>
//               <VStack align="start" spacing="0">
//                 <Text>
//                   {hasChannel ? "Edit Your Studio" : "Activate Your Studio"}
//                 </Text>
//                 <Text fontSize="xs" color="gray.500" fontWeight="normal">
//                   {hasChannel
//                     ? "Update your studio details"
//                     : "One-time setup — choose carefully"}
//                 </Text>
//               </VStack>
//             </HStack>
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb="6">
//             <VStack spacing="4">
//               {!hasChannel && (
//                 <Box w="100%" bg="purple.50" borderRadius="lg" p="3">
//                   <Text fontSize="xs" color="purple.700" lineHeight="1.6">
//                     🎬 Your <b>Studio</b> is your creator identity. The name can
//                     differ from your username and will appear on all your
//                     videos.
//                   </Text>
//                 </Box>
//               )}

//               <Box w="100%">
//                 <Text fontSize="sm" fontWeight="medium" mb="2">
//                   Studio Name *
//                 </Text>
//                 <Input
//                   placeholder="e.g. CodeCraft, TechVault, DesignPulse…"
//                   value={studioName}
//                   onChange={(e) => setStudioName(e.target.value)}
//                   focusBorderColor="purple.400"
//                   borderRadius="lg"
//                   maxLength={50}
//                   onKeyDown={(e) => e.key === "Enter" && handleActivateStudio()}
//                 />
//                 <Text fontSize="xs" color="gray.400" textAlign="right" mt="1">
//                   {studioName.length}/50
//                 </Text>
//               </Box>

//               <Box w="100%">
//                 <Text fontSize="sm" fontWeight="medium" mb="2">
//                   Description
//                 </Text>
//                 <Textarea
//                   placeholder="Tell people what your studio is about…"
//                   value={studioDesc}
//                   onChange={(e) => setStudioDesc(e.target.value)}
//                   focusBorderColor="purple.400"
//                   borderRadius="lg"
//                   rows={3}
//                   resize="none"
//                   maxLength={300}
//                 />
//                 <Text fontSize="xs" color="gray.400" textAlign="right" mt="1">
//                   {studioDesc.length}/300
//                 </Text>
//               </Box>

//               <Button
//                 w="100%"
//                 colorScheme="purple"
//                 size="lg"
//                 onClick={handleActivateStudio}
//                 isLoading={activating}
//                 loadingText={hasChannel ? "Saving…" : "Activating…"}
//                 borderRadius="xl"
//                 isDisabled={!studioName.trim()}
//                 transition="all 0.2s"
//               >
//                 {hasChannel ? "💾 Save Changes" : "🚀 Go Live"}
//               </Button>
//             </VStack>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// }

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Avatar,
  Button,
  SimpleGrid,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Heading,
  Spinner,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  MdOutlineVideoLibrary,
  MdOutlineInfo,
  MdOutlinePeople,
  MdSearch,
  MdVerified,
  MdOutlineOndemandVideo,
  MdEdit,
} from "react-icons/md";
import { BsBellFill, BsBell } from "react-icons/bs";
import { AiOutlineShareAlt, AiFillDashboard } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { checkAuthApi } from "../services/apis/userAuth";
import { getUserVideosApi, subscribeApi } from "../services/apis/uploadVideo";
import VideoCard from "./VideoCard";

// ── API ────────────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:80"
      : "https://animetubebackend.onrender.com",
  withCredentials: true,
});

// Returns { message, user: { _id, username, profilePicture, channelName, channelDescription, hasChannel } }
const activateStudioApi = (userId, channelName, channelDescription = "") =>
  api
    .post("/videos/studio/activate", {
      userId,
      channelName,
      channelDescription,
    })
    .then((r) => r.data);

// ── Helper ─────────────────────────────────────────────────────────────────
const fmt = (n = 0) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
};

// ============================================================================
//  ProfilePage
//  - Own profile:   /Profile  (no props needed)
//  - Other profile: /channel/:userId  (pass targetUserId prop)
// ============================================================================
export default function ProfilePage({ targetUserId = null }) {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    isOpen: isStudioOpen,
    onOpen: openStudioModal,
    onClose: closeStudio,
  } = useDisclosure();

  // ── State ──────────────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [studioName, setStudioName] = useState("");
  const [studioDesc, setStudioDesc] = useState("");
  const [activating, setActivating] = useState(false);

  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingVids, setLoadingVids] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [totalViews, setTotalViews] = useState(0);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followLoading, setFollowLoading] = useState(false);

  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // ── 1. Auth ────────────────────────────────────────────────────────────────
  useEffect(() => {
    checkAuthApi().then(({ authenticated, user }) => {
      if (authenticated && user) {
        setCurrentUser(user);
        const own = !targetUserId || String(targetUserId) === String(user._id);
        setIsOwnProfile(own);
        if (own) {
          // Own profile: use auth user directly as the profile to display
          setProfileUser(user);
          setFollowerCount(user.subscribers?.length ?? 0);
        }
      }
      setAuthLoading(false);
    });
  }, [targetUserId]);

  // ── 2. Videos ──────────────────────────────────────────────────────────────
  const uid = targetUserId || currentUser?._id;

  const fetchVideos = useCallback(
    async (pg) => {
      if (!uid) return;
      pg === 1 ? setLoadingVids(true) : setLoadingMore(true);
      try {
        const data = await getUserVideosApi(uid, { page: pg, limit: 12 });
        const vids = data.videos || [];

        setVideos((prev) => (pg === 1 ? vids : [...prev, ...vids]));
        setHasMore(data.pagination.hasMore);
        setPage(pg + 1);
        setTotalViews((prev) =>
          pg === 1
            ? vids.reduce((s, v) => s + (v.views || 0), 0)
            : prev + vids.reduce((s, v) => s + (v.views || 0), 0),
        );

        // For another user's profile: build profileUser from first video's populated user object
        // (backend returns user with hasChannel, channelName, channelDescription, subscribers)
        if (!isOwnProfile && vids.length > 0) {
          const u = vids[0].user;
          setProfileUser((prev) => {
            if (prev) return prev; // already set
            setFollowerCount(u?.subscribers?.length ?? 0);
            if (currentUser) {
              setIsFollowing(
                (u?.subscribers ?? []).some(
                  (s) => String(s) === String(currentUser._id),
                ),
              );
            }
            return u;
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingVids(false);
        setLoadingMore(false);
      }
    },
    [uid, isOwnProfile, currentUser],
  );

  useEffect(() => {
    if (uid) fetchVideos(1);
  }, [uid]);

  // ── 3. Infinite scroll ─────────────────────────────────────────────────────
  useEffect(() => {
    if (loadingVids || loadingMore || !hasMore) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchVideos(page);
      },
      { threshold: 0.5 },
    );
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [loadingVids, loadingMore, hasMore, page, fetchVideos]);

  // ── Studio: open modal, pre-fill with existing data ────────────────────────
  const openStudio = () => {
    // Always pre-fill from profileUser so editing works correctly
    setStudioName(profileUser?.channelName || "");
    setStudioDesc(profileUser?.channelDescription || "");
    openStudioModal();
  };

  // ── Studio: submit ─────────────────────────────────────────────────────────
  const handleActivateStudio = async () => {
    if (!studioName.trim() || !currentUser) return;
    setActivating(true);
    try {
      // Server returns the full updated user object — use IT, not local state
      const data = await activateStudioApi(
        currentUser._id,
        studioName.trim(),
        studioDesc.trim(),
      );

      // data.user = { _id, username, profilePicture, channelName, channelDescription, hasChannel }
      const serverUser = data.user;

      // Patch both currentUser and profileUser with server truth
      const patch = {
        hasChannel: serverUser.hasChannel, // true
        channelName: serverUser.channelName, // "codecraft"
        channelDescription: serverUser.channelDescription, // "Adsterra is…"
      };

      setCurrentUser((prev) => ({ ...prev, ...patch }));
      setProfileUser((prev) => ({ ...prev, ...patch }));

      closeStudio();
      toast({
        title: serverUser.hasChannel
          ? "🎬 Studio updated!"
          : "🎬 Studio is live!",
        status: "success",
        duration: 2500,
        position: "top",
      });
    } catch (e) {
      toast({
        title: e?.response?.data?.error || "Failed",
        status: "error",
        duration: 2000,
        position: "top",
      });
    } finally {
      setActivating(false);
    }
  };

  // ── Follow ──────────────────────────────────────────────────────────────────
  const handleFollow = async () => {
    if (!currentUser) {
      navigate("/SignIn");
      return;
    }
    if (isOwnProfile || String(currentUser._id) === String(profileUser?._id)) {
      toast({
        title: "You can't follow your own studio",
        status: "info",
        duration: 2000,
        position: "top",
      });
      return;
    }
    const prev = isFollowing;
    setIsFollowing(!isFollowing);
    setFollowerCount((c) => (isFollowing ? c - 1 : c + 1));
    setFollowLoading(true);
    try {
      await subscribeApi(profileUser._id, currentUser._id);
      toast({
        title: isFollowing ? "Unfollowed" : "Following! 🔔",
        status: isFollowing ? "info" : "success",
        duration: 1500,
        position: "top",
      });
    } catch {
      setIsFollowing(prev);
      setFollowerCount((c) => (isFollowing ? c + 1 : c - 1));
    } finally {
      setFollowLoading(false);
    }
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  // Read ONLY from profileUser — which is always kept in sync with server responses
  const hasChannel = profileUser?.hasChannel === true;
  const studioDisplay = hasChannel
    ? profileUser?.channelName || profileUser?.username || "Studio"
    : profileUser?.username || "User";
  const joinedYear = profileUser?.createdAt
    ? new Date(profileUser.createdAt).getFullYear()
    : "—";

  const filteredVideos = search
    ? videos.filter(
        (v) =>
          v.title?.toLowerCase().includes(search.toLowerCase()) ||
          (v.tags || []).some((t) =>
            t.toLowerCase().includes(search.toLowerCase()),
          ),
      )
    : videos;

  const statCards = [
    { label: "Followers", value: fmt(followerCount) },
    {
      label: "Videos",
      value: hasMore ? `${videos.length}+` : String(videos.length),
    },
    { label: "Total Views", value: fmt(totalViews) },
    { label: "Since", value: String(joinedYear) },
  ];

  if (authLoading)
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" color="gray.400" />
      </Flex>
    );

  return (
    <Box bg="gray.50" minH="100vh">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <Box bg="gray.900" position="relative" overflow="hidden">
        <Box
          position="absolute"
          top="-80px"
          right="-80px"
          w="320px"
          h="320px"
          borderRadius="full"
          border="1px solid"
          borderColor="purple.800"
          opacity="0.25"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w="100%"
          h="2px"
          bg="linear-gradient(to right, #805AD5, #4299E1)"
        />

        <Box
          maxW="1200px"
          mx="auto"
          px={{ base: 5, md: 10 }}
          py={{ base: 8, md: 12 }}
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align={{ base: "start", lg: "flex-end" }}
            justify="space-between"
            gap={8}
            wrap="wrap"
          >
            {/* Identity */}
            <HStack spacing={6} align="flex-end" wrap="wrap">
              <Box position="relative" flexShrink={0}>
                <Box
                  position="absolute"
                  inset="-4px"
                  borderRadius="full"
                  border="2px solid"
                  borderColor={hasChannel ? "purple.400" : "gray.600"}
                />
                <Avatar
                  size="2xl"
                  src={profileUser?.profilePicture || undefined}
                  name={profileUser?.email || profileUser?.username || "User"}
                  bg="purple.700"
                  color="white"
                />
                {hasChannel && (
                  <Box position="absolute" bottom="0" right="-2">
                    <Icon as={MdVerified} color="purple.400" boxSize="5" />
                  </Box>
                )}
              </Box>

              <VStack align="flex-start" spacing="1.5">
                {profileUser?.username && (
                  <Text
                    fontSize="xs"
                    color="purple.300"
                    letterSpacing="widest"
                    textTransform="uppercase"
                  >
                    @{profileUser.username}
                  </Text>
                )}
                <Heading
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="800"
                  color="white"
                  lineHeight="1"
                  letterSpacing="tight"
                >
                  {studioDisplay}
                </Heading>
                {/* Channel description — from profileUser, updated on activation */}
                {profileUser?.channelDescription && (
                  <Text
                    fontSize="sm"
                    color="whiteAlpha.500"
                    maxW="400px"
                    noOfLines={2}
                  >
                    {profileUser.channelDescription}
                  </Text>
                )}
                {!hasChannel && isOwnProfile && (
                  <Text fontSize="xs" color="orange.300">
                    ⚡ Activate your studio to start uploading
                  </Text>
                )}

                <HStack spacing="3" pt="2" wrap="wrap">
                  {isOwnProfile ? (
                    <>
                      {hasChannel ? (
                        <>
                          <Link to="/Upload">
                            <Button
                              size="sm"
                              bg="purple.500"
                              color="white"
                              borderRadius="md"
                              _hover={{ bg: "purple.400" }}
                              leftIcon={<FiUpload />}
                              transition="all 0.2s"
                            >
                              Upload
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="ghost"
                            color="whiteAlpha.600"
                            border="1px solid"
                            borderColor="whiteAlpha.200"
                            borderRadius="md"
                            leftIcon={<MdEdit />}
                            onClick={openStudio}
                            _hover={{ bg: "whiteAlpha.100", color: "white" }}
                          >
                            Edit Studio
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          bg="purple.500"
                          color="white"
                          borderRadius="md"
                          onClick={openStudio}
                          _hover={{ bg: "purple.400" }}
                          leftIcon={<FiUpload />}
                          transition="all 0.2s"
                        >
                          Activate Studio
                        </Button>
                      )}
                      <Link to="/Dashboard">
                        <Button
                          size="sm"
                          variant="ghost"
                          color="whiteAlpha.600"
                          border="1px solid"
                          borderColor="whiteAlpha.200"
                          borderRadius="md"
                          leftIcon={<AiFillDashboard />}
                          _hover={{ bg: "whiteAlpha.100", color: "white" }}
                        >
                          Dashboard
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        bg={isFollowing ? "transparent" : "purple.500"}
                        color={isFollowing ? "purple.300" : "white"}
                        border="1px solid"
                        borderColor="purple.400"
                        borderRadius="md"
                        leftIcon={isFollowing ? <BsBellFill /> : <BsBell />}
                        _hover={{
                          bg: isFollowing ? "whiteAlpha.100" : "purple.400",
                        }}
                        onClick={handleFollow}
                        isLoading={followLoading}
                        transition="all 0.2s"
                      >
                        {isFollowing ? "Following" : "+ Follow"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        color="whiteAlpha.600"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        borderRadius="md"
                        leftIcon={<AiOutlineShareAlt />}
                        _hover={{ bg: "whiteAlpha.100", color: "white" }}
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          toast({
                            description: "Link copied!",
                            status: "success",
                            duration: 1200,
                          });
                        }}
                      >
                        Share
                      </Button>
                    </>
                  )}
                </HStack>
              </VStack>
            </HStack>

            {/* Stats */}
            <HStack
              spacing="0"
              borderLeft={{ lg: "1px solid" }}
              borderColor="whiteAlpha.100"
              wrap="wrap"
            >
              {statCards.map((s, i) => (
                <VStack
                  key={i}
                  spacing="0"
                  px={{ base: 4, md: 6 }}
                  py="4"
                  borderRight="1px solid"
                  borderColor="whiteAlpha.100"
                  align="center"
                >
                  <Text
                    fontSize={{ base: "xl", md: "3xl" }}
                    fontWeight="800"
                    color="white"
                    letterSpacing="tight"
                  >
                    {s.value}
                  </Text>
                  <Text
                    fontSize="9px"
                    letterSpacing="widest"
                    color="whiteAlpha.400"
                    textTransform="uppercase"
                  >
                    {s.label}
                  </Text>
                </VStack>
              ))}
            </HStack>
          </Flex>
        </Box>
      </Box>

      {/* ── TABS ──────────────────────────────────────────────────────── */}
      <Box maxW="1200px" mx="auto" px={{ base: 5, md: 10 }}>
        <Tabs variant="unstyled">
          <Box
            position="sticky"
            top="0"
            zIndex="10"
            bg="gray.50"
            borderBottom="1px solid"
            borderColor="gray.200"
            boxShadow="0 1px 0 rgba(0,0,0,0.04)"
          >
            <Flex
              align="center"
              justify="space-between"
              wrap="wrap"
              gap="3"
              py={{ base: 1, md: 0 }}
            >
              <TabList>
                {[
                  { label: "Videos", icon: MdOutlineVideoLibrary },
                  { label: "About", icon: MdOutlineInfo },
                  { label: "Followers", icon: MdOutlinePeople },
                ].map(({ label, icon }) => (
                  <Tab
                    key={label}
                    px={{ base: 3, md: 5 }}
                    py="4"
                    fontSize="xs"
                    letterSpacing="widest"
                    textTransform="uppercase"
                    color="gray.400"
                    fontWeight="medium"
                    borderBottom="2px solid"
                    borderColor="transparent"
                    _selected={{
                      color: "gray.800",
                      fontWeight: "bold",
                      borderColor: "purple.500",
                    }}
                    _hover={{ color: "gray.600" }}
                    transition="all 0.15s"
                  >
                    <HStack spacing="2">
                      <Icon as={icon} boxSize="4" />
                      <Text display={{ base: "none", sm: "block" }}>
                        {label}
                      </Text>
                    </HStack>
                  </Tab>
                ))}
              </TabList>

              <InputGroup
                size="sm"
                w={{ base: "full", sm: "200px" }}
                mb={{ base: 2, sm: 0 }}
              >
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search videos…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  bg="white"
                  borderRadius="full"
                  _focus={{ borderColor: "purple.400" }}
                />
              </InputGroup>
            </Flex>
          </Box>

          <TabPanels>
            {/* VIDEOS */}
            <TabPanel px="0" py="6">
              {loadingVids ? (
                <SimpleGrid columns={[1, 2, 3]} spacing="5">
                  {[...Array(6)].map((_, i) => (
                    <Box key={i}>
                      <Skeleton height="200px" borderRadius="xl" />
                      <Skeleton height="18px" mt="3" />
                      <Skeleton height="14px" mt="2" w="60%" />
                    </Box>
                  ))}
                </SimpleGrid>
              ) : filteredVideos.length > 0 ? (
                <>
                  <SimpleGrid columns={[1, 2, 3]} spacing="5">
                    {filteredVideos.map((video, i) => (
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
                        isOwnProfile={isOwnProfile}
                        onDeleted={(id) =>
                          setVideos((prev) => prev.filter((v) => v._id !== id))
                        }
                        onUpdated={(updated) =>
                          setVideos((prev) =>
                            prev.map((v) =>
                              v._id === updated._id ? { ...v, ...updated } : v,
                            ),
                          )
                        }
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
                    {!hasMore && (
                      <Text color="gray.400" fontSize="sm">
                        All videos shown ✓
                      </Text>
                    )}
                  </Box>
                </>
              ) : (
                <VStack spacing="4" py="20" color="gray.400">
                  <Icon as={MdOutlineOndemandVideo} boxSize="16" />
                  <Text fontSize="lg" fontWeight="bold">
                    {search
                      ? "No matching videos"
                      : isOwnProfile
                        ? "No videos uploaded yet"
                        : "No videos yet"}
                  </Text>
                  {isOwnProfile && !hasChannel && (
                    <Button
                      colorScheme="purple"
                      onClick={openStudio}
                      borderRadius="full"
                    >
                      Activate your studio first
                    </Button>
                  )}
                  {isOwnProfile && hasChannel && !search && (
                    <Link to="/Upload">
                      <Button
                        colorScheme="purple"
                        borderRadius="full"
                        leftIcon={<FiUpload />}
                      >
                        Upload your first video
                      </Button>
                    </Link>
                  )}
                </VStack>
              )}
            </TabPanel>

            {/* ABOUT */}
            <TabPanel px="0" py="6">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing="10">
                {/* Left: description + categories */}
                <VStack align="start" spacing="6">
                  <Box w="100%">
                    <HStack mb="3" justify="space-between">
                      <Text
                        fontSize="xs"
                        color="gray.400"
                        textTransform="uppercase"
                        letterSpacing="wide"
                        fontWeight="bold"
                      >
                        Studio Description
                      </Text>
                      {isOwnProfile && (
                        <Button
                          size="xs"
                          variant="ghost"
                          colorScheme="purple"
                          leftIcon={<MdEdit />}
                          onClick={openStudio}
                        >
                          Edit
                        </Button>
                      )}
                    </HStack>
                    <Text fontSize="md" color="gray.700" lineHeight="1.9">
                      {/* profileUser.channelDescription is the live value from server */}
                      {profileUser?.channelDescription
                        ? profileUser.channelDescription
                        : isOwnProfile
                          ? "No description yet. Click Edit to add one."
                          : "No description provided."}
                    </Text>
                  </Box>

                  {/* Content categories derived from uploaded videos */}
                  {(() => {
                    const cats = [
                      ...new Set(videos.map((v) => v.category).filter(Boolean)),
                    ];
                    return cats.length > 0 ? (
                      <Box w="100%">
                        <Text
                          fontSize="xs"
                          color="gray.400"
                          textTransform="uppercase"
                          letterSpacing="wide"
                          fontWeight="bold"
                          mb="3"
                        >
                          Content Categories
                        </Text>
                        <Flex wrap="wrap" gap="2">
                          {cats.map((c) => (
                            <Box
                              key={c}
                              px="3"
                              py="1"
                              bg="purple.50"
                              color="purple.600"
                              borderRadius="full"
                              fontSize="xs"
                              fontWeight="medium"
                              border="1px solid"
                              borderColor="purple.100"
                            >
                              {c}
                            </Box>
                          ))}
                        </Flex>
                      </Box>
                    ) : null;
                  })()}
                </VStack>

                {/* Right: detail cards */}
                <VStack align="start" spacing="4">
                  <Text
                    fontSize="xs"
                    color="gray.400"
                    textTransform="uppercase"
                    letterSpacing="wide"
                    fontWeight="bold"
                  >
                    Details
                  </Text>

                  <SimpleGrid columns={2} spacing="4" w="100%">
                    {[
                      {
                        label: "Studio Name",
                        // Reads profileUser.channelName — updated immediately after activation via setProfileUser patch
                        value: hasChannel
                          ? profileUser?.channelName || "—"
                          : "Not set",
                      },
                      {
                        label: "Username",
                        value: `@${profileUser?.username || "—"}`,
                      },
                      {
                        label: "Joined",
                        // joinedYear computed from profileUser.createdAt
                        value: String(joinedYear),
                      },
                      {
                        label: "Followers",
                        value: fmt(followerCount),
                      },
                      {
                        label: "Total Videos",
                        value: hasMore
                          ? `${videos.length}+`
                          : String(videos.length),
                      },
                      {
                        label: "Total Views",
                        value: fmt(totalViews),
                      },
                    ].map((item) => (
                      <Box
                        key={item.label}
                        bg="white"
                        border="1px solid"
                        borderColor="gray.200"
                        borderRadius="lg"
                        p="4"
                      >
                        <Text
                          fontSize="9px"
                          color="gray.400"
                          textTransform="uppercase"
                          letterSpacing="wide"
                          mb="1"
                        >
                          {item.label}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="gray.800"
                          fontWeight="semibold"
                          noOfLines={1}
                        >
                          {item.value}
                        </Text>
                      </Box>
                    ))}
                  </SimpleGrid>

                  {/* Studio status */}
                  <Box
                    bg="white"
                    border="1px solid"
                    borderColor="gray.200"
                    borderRadius="lg"
                    p="4"
                    w="100%"
                  >
                    <Text
                      fontSize="9px"
                      color="gray.400"
                      textTransform="uppercase"
                      letterSpacing="wide"
                      mb="2"
                    >
                      Studio Status
                    </Text>
                    <HStack spacing="2">
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg={hasChannel ? "green.400" : "orange.400"}
                        boxShadow={
                          hasChannel
                            ? "0 0 6px rgba(72,187,120,0.6)"
                            : "0 0 6px rgba(237,137,54,0.5)"
                        }
                      />
                      <Text
                        fontSize="sm"
                        fontWeight="semibold"
                        color={hasChannel ? "green.600" : "orange.600"}
                      >
                        {hasChannel ? "Active" : "Not Activated"}
                      </Text>
                      {!hasChannel && isOwnProfile && (
                        <Button
                          size="xs"
                          colorScheme="orange"
                          variant="ghost"
                          onClick={openStudio}
                        >
                          Activate →
                        </Button>
                      )}
                    </HStack>
                  </Box>
                </VStack>
              </SimpleGrid>
            </TabPanel>

            {/* FOLLOWERS */}
            <TabPanel px="0" py="6">
              <VStack align="center" py="12" color="gray.400" spacing="3">
                <Icon as={MdOutlinePeople} boxSize="12" />
                <Text fontWeight="bold" fontSize="xl">
                  {fmt(followerCount)} followers
                </Text>
                <Text fontSize="sm">Follower list is private</Text>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      {/* ── Studio Modal ───────────────────────────────────────────────── */}
      <Modal isOpen={isStudioOpen} onClose={closeStudio} size="md">
        <ModalOverlay backdropFilter="blur(6px)" />
        <ModalContent borderRadius="2xl">
          <ModalHeader>
            <HStack spacing="3">
              <Box bg="purple.100" p="2" borderRadius="lg">
                <Icon
                  as={MdOutlineVideoLibrary}
                  color="purple.500"
                  boxSize="5"
                />
              </Box>
              <VStack align="start" spacing="0">
                <Text>
                  {hasChannel ? "Edit Your Studio" : "Activate Your Studio"}
                </Text>
                <Text fontSize="xs" color="gray.500" fontWeight="normal">
                  {hasChannel
                    ? "Update your studio details"
                    : "One-time setup — choose carefully"}
                </Text>
              </VStack>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="6">
            <VStack spacing="4">
              {!hasChannel && (
                <Box w="100%" bg="purple.50" borderRadius="lg" p="3">
                  <Text fontSize="xs" color="purple.700" lineHeight="1.6">
                    🎬 Your <b>Studio</b> is your creator identity. The name can
                    differ from your username and will appear on all your
                    videos.
                  </Text>
                </Box>
              )}

              <Box w="100%">
                <Text fontSize="sm" fontWeight="medium" mb="2">
                  Studio Name *
                </Text>
                <Input
                  placeholder="e.g. CodeCraft, TechVault, DesignPulse…"
                  value={studioName}
                  onChange={(e) => setStudioName(e.target.value)}
                  focusBorderColor="purple.400"
                  borderRadius="lg"
                  maxLength={50}
                  onKeyDown={(e) => e.key === "Enter" && handleActivateStudio()}
                />
                <Text fontSize="xs" color="gray.400" textAlign="right" mt="1">
                  {studioName.length}/50
                </Text>
              </Box>

              <Box w="100%">
                <Text fontSize="sm" fontWeight="medium" mb="2">
                  Description
                </Text>
                <Textarea
                  placeholder="Tell people what your studio is about…"
                  value={studioDesc}
                  onChange={(e) => setStudioDesc(e.target.value)}
                  focusBorderColor="purple.400"
                  borderRadius="lg"
                  rows={3}
                  resize="none"
                  maxLength={300}
                />
                <Text fontSize="xs" color="gray.400" textAlign="right" mt="1">
                  {studioDesc.length}/300
                </Text>
              </Box>

              <Button
                w="100%"
                colorScheme="purple"
                size="lg"
                onClick={handleActivateStudio}
                isLoading={activating}
                loadingText={hasChannel ? "Saving…" : "Activating…"}
                borderRadius="xl"
                isDisabled={!studioName.trim()}
                transition="all 0.2s"
              >
                {hasChannel ? "💾 Save Changes" : "🚀 Go Live"}
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}