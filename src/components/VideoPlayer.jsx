// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Button,
//   HStack,
//   VStack,
//   Text,
//   Avatar,
//   Textarea,
//   IconButton,
//   Divider,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   useToast,
//   Skeleton,
//   SkeletonText,
//   Image,
//   Badge,
//   Spinner,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   useDisclosure,
//   Collapse,
//   SimpleGrid,
//   Tabs,
//   TabList,
//   Tab,
//   TabPanels,
//   TabPanel,
// } from "@chakra-ui/react";
// import { FaRegShareSquare } from "react-icons/fa";
// import {
//   AiOutlineLike,
//   AiOutlineDislike,
//   AiFillLike,
//   AiFillDislike,
// } from "react-icons/ai";
// import {
//   BsBookmark,
//   BsBookmarkFill,
//   BsThreeDots,
//   BsReply,
// } from "react-icons/bs";
// import { RiPlayListAddLine } from "react-icons/ri";
// import {
//   MdNotificationsActive,
//   MdNotificationsNone,
//   MdDelete,
// } from "react-icons/md";
// import { BiTime } from "react-icons/bi";
// import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import VideoPlayerDisplay from "./VideoPlayerDisplay";
// import {
//   getVideosApi,
//   getVideoByIdApi,
//   likeVideoApi,
//   saveVideoApi,
//   subscribeApi,
//   addCommentApi,
//   deleteCommentApi,
//   replyCommentApi,
//   likeCommentApi,
//   createOrAddToPlaylistApi,
//   getPlaylistsApi,
// } from "../services/apis/uploadVideo";
// import { checkAuthApi } from "../services/apis/userAuth";

// export const videoStatCache = new Map();

// const VideoPlayerUI = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [searchParams] = useSearchParams();
//   const observerRef = useRef(null);
//   const loadMoreRef = useRef(null);
//   const {
//     isOpen: isPlaylistOpen,
//     onOpen: openPlaylist,
//     onClose: closePlaylist,
//   } = useDisclosure();

//   // ── Load video: state (normal nav) OR fetch by ?v=id (refresh) ──────────
//   const [videoData, setVideoData] = useState(null);
//   const [loadingVideo, setLoadingVideo] = useState(false);
//   const state = location.state || {};
//   const videoIdFromUrl = searchParams.get("v");

//   useEffect(() => {
//     if (state._id) {
//       setVideoData(state);
//       const url = new URL(window.location);
//       if (url.searchParams.get("v") !== state._id) {
//         url.searchParams.set("v", state._id);
//         window.history.replaceState({}, "", url.toString());
//       }
//     } else if (videoIdFromUrl) {
//       setLoadingVideo(true);
//       getVideoByIdApi(videoIdFromUrl)
//         .then((data) =>
//           setVideoData({
//             _id: data._id,
//             title: data.title,
//             description: data.description,
//             uploadDate: data.createdAt,
//             category: data.category,
//             audience: data.audience,
//             tags: data.tags || [],
//             qualities: data.qualities || [],
//             metadata: data.metadata,
//             videoUrl: data.videoUrl,
//             views: data.views || 0,
//             likes: data.likes || 0,
//             dislikes: data.dislikes || 0,
//             likedBy: data.likedBy || [],
//             dislikedBy: data.dislikedBy || [],
//             savedBy: data.savedBy || [],
//             comments: data.comments || [],
//             user: data.user,
//           }),
//         )
//         .catch(() => {
//           toast({ title: "Video not found", status: "error", duration: 3000 });
//           navigate("/");
//         })
//         .finally(() => setLoadingVideo(false));
//     } else {
//       navigate("/");
//     }
//   }, [videoIdFromUrl]);

//   const {
//     title,
//     description,
//     uploadDate,
//     category,
//     audience,
//     tags = [],
//     qualities = [],
//     metadata,
//     _id,
//     user: channelUser,
//     views: initViews = 0,
//     likes: initLikes = 0,
//     dislikes: initDislikes = 0,
//     likedBy: initLikedBy = [],
//     dislikedBy: initDislikedBy = [],
//     savedBy: initSavedBy = [],
//     comments: initComments = [],
//   } = videoData || {};

//   // ── State ──────────────────────────────────────────────────────────────────
//   const [currentUser, setCurrentUser] = useState(null);
//   const [views, setViews] = useState(initViews);
//   const [likesCount, setLikes] = useState(initLikes);
//   const [dislikesCount, setDislikes] = useState(initDislikes);
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const [subscriberCount, setSubscriberCount] = useState(
//     channelUser?.subscribers?.length ?? 0,
//   );
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isNotified, setIsNotified] = useState(false);
//   const [comments, setComments] = useState(initComments);
//   const [commentText, setCommentText] = useState("");
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [replyText, setReplyText] = useState("");
//   const [commentSort, setCommentSort] = useState("newest");
//   const [showDesc, setShowDesc] = useState(false);
//   const [playlists, setPlaylists] = useState([]);
//   const [newPlaylist, setNewPlaylist] = useState("");
//   const [allVideos, setAllVideos] = useState([]);
//   const [recommended, setRecommended] = useState([]);
//   const [recPage, setRecPage] = useState(1);
//   const [hasMoreRec, setHasMoreRec] = useState(true);
//   const [loadingRec, setLoadingRec] = useState(true);
//   const [loadingMoreRec, setLoadingMoreRec] = useState(false);
//   const PAGE_SIZE = 8;

//   useEffect(() => {
//     if (!videoData) return;
//     setViews(videoData.views || 0);
//     setLikes(videoData.likes || 0);
//     setDislikes(videoData.dislikes || 0);
//     setComments(videoData.comments || []);
//     setSubscriberCount(videoData.user?.subscribers?.length ?? 0);
//   }, [videoData?._id]);

//   useEffect(() => {
//     checkAuthApi().then(({ authenticated, user }) => {
//       if (authenticated) setCurrentUser(user);
//     });
//   }, []);

//   useEffect(() => {
//     if (!currentUser || !videoData) return;
//     const uid = String(currentUser._id);
//     setLiked((videoData.likedBy || []).some((id) => String(id) === uid));
//     setDisliked((videoData.dislikedBy || []).some((id) => String(id) === uid));
//     setSaved((videoData.savedBy || []).some((id) => String(id) === uid));
//     if (videoData.user?.subscribers)
//       setIsSubscribed(
//         videoData.user.subscribers.some((id) => String(id) === uid),
//       );
//   }, [currentUser, videoData?._id]);

//   useEffect(() => {
//     if (_id) {
//       setViews((v) => v + 1);
//       const cached = videoStatCache.get(_id) || {};
//       videoStatCache.set(_id, {
//         ...cached,
//         views: (cached.views ?? initViews) + 1,
//       });
//     }
//   }, [_id]);

//   useEffect(() => {
//     if (currentUser?._id)
//       getPlaylistsApi(currentUser._id)
//         .then((d) => setPlaylists(d.playlists || []))
//         .catch(() => {});
//   }, [currentUser]);

//   useEffect(() => {
//     if (!_id) return;
//     (async () => {
//       setLoadingRec(true);
//       try {
//         const data = await getVideosApi({
//           page: 1,
//           limit: 50,
//           sort: "popular",
//         });
//         const filtered = data.videos.filter((v) => v._id !== _id);
//         setAllVideos(filtered);
//         setRecommended(filtered.slice(0, PAGE_SIZE));
//         setHasMoreRec(filtered.length > PAGE_SIZE);
//         setRecPage(2);
//       } catch {
//       } finally {
//         setLoadingRec(false);
//       }
//     })();
//   }, [_id]);

//   useEffect(() => {
//     if (loadingRec || loadingMoreRec || !hasMoreRec) return;
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setLoadingMoreRec(true);
//           setTimeout(() => {
//             const next = allVideos.slice(0, recPage * PAGE_SIZE);
//             setRecommended(next);
//             setHasMoreRec(next.length < allVideos.length);
//             setRecPage((p) => p + 1);
//             setLoadingMoreRec(false);
//           }, 400);
//         }
//       },
//       { threshold: 1 },
//     );
//     if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
//     return () => observerRef.current?.disconnect();
//   }, [loadingRec, loadingMoreRec, hasMoreRec, allVideos, recPage]);

//   // ── Helpers ────────────────────────────────────────────────────────────────
//   const requireAuth = () => {
//     if (!currentUser) {
//       toast({
//         title: "Sign in required",
//         status: "warning",
//         duration: 2000,
//         position: "top",
//       });
//       return false;
//     }
//     return true;
//   };

//   const fmt = (n = 0) => {
//     if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
//     if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
//     return String(n);
//   };

//   const formatDate = (d) =>
//     !d
//       ? ""
//       : new Date(d).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         });
//   const fmtDur = (s) => {
//     if (!s) return "0:00";
//     const h = Math.floor(s / 3600),
//       m = Math.floor((s % 3600) / 60),
//       sec = Math.floor(s % 60)
//         .toString()
//         .padStart(2, "0");
//     return h > 0
//       ? `${h}:${m.toString().padStart(2, "0")}:${sec}`
//       : `${m}:${sec}`;
//   };
//   const timeAgo = (d) => {
//     if (!d) return "Recently";
//     const s = Math.floor((Date.now() - new Date(d)) / 1000);
//     for (const [u, v] of Object.entries({
//       year: 31536000,
//       month: 2592000,
//       week: 604800,
//       day: 86400,
//       hour: 3600,
//       minute: 60,
//     })) {
//       const i = Math.floor(s / v);
//       if (i >= 1) return `${i} ${u}${i > 1 ? "s" : ""} ago`;
//     }
//     return "Just now";
//   };

//   const writeCache = (patch) => {
//     if (!_id) return;
//     videoStatCache.set(_id, { ...(videoStatCache.get(_id) || {}), ...patch });
//   };

//   // ── Actions ────────────────────────────────────────────────────────────────
//   const handleLike = async () => {
//     if (!requireAuth()) return;
//     const action = liked ? "unlike" : "like";
//     const nl = liked ? likesCount - 1 : likesCount + 1;
//     const nd = !liked && disliked ? dislikesCount - 1 : dislikesCount;
//     setLiked(!liked);
//     setDisliked(!liked ? false : disliked);
//     setLikes(nl);
//     setDislikes(nd);
//     writeCache({ likes: nl, dislikes: nd });
//     try {
//       const res = await likeVideoApi(_id, currentUser._id, action);
//       setLikes(res.likes);
//       setDislikes(res.dislikes);
//       writeCache({ likes: res.likes, dislikes: res.dislikes });
//     } catch {
//       setLiked(liked);
//       setLikes(likesCount);
//       setDislikes(dislikesCount);
//     }
//   };

//   const handleDislike = async () => {
//     if (!requireAuth()) return;
//     const action = disliked ? "undislike" : "dislike";
//     const nd = disliked ? dislikesCount - 1 : dislikesCount + 1;
//     const nl = !disliked && liked ? likesCount - 1 : likesCount;
//     setDisliked(!disliked);
//     setLiked(!disliked ? false : liked);
//     setDislikes(nd);
//     setLikes(nl);
//     writeCache({ likes: nl, dislikes: nd });
//     try {
//       const res = await likeVideoApi(_id, currentUser._id, action);
//       setLikes(res.likes);
//       setDislikes(res.dislikes);
//       writeCache({ likes: res.likes, dislikes: res.dislikes });
//     } catch {
//       setDisliked(disliked);
//       setDislikes(dislikesCount);
//       setLikes(likesCount);
//     }
//   };

//   const handleSave = async () => {
//     if (!requireAuth()) return;
//     const prev = saved;
//     setSaved(!saved);
//     try {
//       await saveVideoApi(_id, currentUser._id);
//       toast({
//         title: saved ? "Removed from saved" : "Saved!",
//         status: "success",
//         duration: 1500,
//         position: "top",
//       });
//     } catch {
//       setSaved(prev);
//     }
//   };

//   const channelOwnerId = channelUser?._id;
//   const isOwnChannel =
//     currentUser &&
//     channelOwnerId &&
//     String(currentUser._id) === String(channelOwnerId);

//   const handleSubscribe = async () => {
//     if (!requireAuth()) return;
//     if (isOwnChannel) {
//       toast({
//         title: "You can't follow your own studio",
//         status: "info",
//         duration: 2000,
//         position: "top",
//       });
//       return;
//     }
//     const prev = isSubscribed;
//     setIsSubscribed(!isSubscribed);
//     setSubscriberCount((c) => (isSubscribed ? c - 1 : c + 1));
//     try {
//       await subscribeApi(channelOwnerId, currentUser._id);
//       toast({
//         title: isSubscribed ? "Unfollowed studio" : "Following studio! 🔔",
//         status: isSubscribed ? "info" : "success",
//         duration: 1500,
//         position: "top",
//       });
//     } catch {
//       setIsSubscribed(prev);
//       setSubscriberCount((c) => (isSubscribed ? c + 1 : c - 1));
//     }
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({ title, url: window.location.href });
//       } catch {}
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       toast({ description: "Link copied!", status: "success", duration: 1500 });
//     }
//   };

//   const handleAddComment = async () => {
//     if (!requireAuth() || !commentText.trim()) return;
//     try {
//       const newC = await addCommentApi(
//         _id,
//         currentUser._id,
//         commentText.trim(),
//       );
//       setComments((prev) => [{ ...newC, user: currentUser }, ...prev]);
//       setCommentText("");
//     } catch {
//       toast({ title: "Failed to post", status: "error", duration: 2000 });
//     }
//   };

//   const handleDeleteComment = async (cid) => {
//     setComments((prev) => prev.filter((c) => c._id !== cid));
//     try {
//       await deleteCommentApi(_id, cid, currentUser._id);
//     } catch {}
//   };

//   const handleReply = async (cid) => {
//     if (!requireAuth() || !replyText.trim()) return;
//     try {
//       await replyCommentApi(_id, cid, currentUser._id, replyText.trim());
//       setReplyingTo(null);
//       setReplyText("");
//       toast({ title: "Reply added", status: "success", duration: 1500 });
//     } catch {}
//   };

//   const handleLikeComment = async (cid) => {
//     if (!requireAuth()) return;
//     try {
//       const res = await likeCommentApi(_id, cid, currentUser._id);
//       setComments((prev) =>
//         prev.map((c) => (c._id === cid ? { ...c, likes: res.likes } : c)),
//       );
//     } catch {}
//   };

//   const handleAddToPlaylist = async (name) => {
//     if (!requireAuth()) return;
//     try {
//       const data = await createOrAddToPlaylistApi(currentUser._id, name, _id);
//       setPlaylists(data.playlists);
//       toast({ title: `Added to "${name}"`, status: "success", duration: 1500 });
//       closePlaylist();
//     } catch {}
//   };

//   const playRecommended = (video) => {
//     navigate(`/VideoPlayer?v=${video._id}`, {
//       state: {
//         videoUrl: video.videoUrl,
//         qualities: video.qualities,
//         metadata: video.metadata,
//         title: video.title,
//         description: video.description,
//         category: video.category,
//         audience: video.audience,
//         tags: video.tags,
//         _id: video._id,
//         uploadDate: video.createdAt,
//         views: videoStatCache.get(video._id)?.views ?? video.views,
//         likes: videoStatCache.get(video._id)?.likes ?? video.likes,
//         dislikes: videoStatCache.get(video._id)?.dislikes ?? video.dislikes,
//         likedBy: video.likedBy || [],
//         dislikedBy: video.dislikedBy || [],
//         savedBy: video.savedBy || [],
//         comments: video.comments || [],
//         user: video.user,
//       },
//     });
//     window.scrollTo(0, 0);
//   };

//   const studioName =
//     channelUser?.channelName ?? channelUser?.username ?? "Creator";
//   const sortedComments = [...comments].sort((a, b) =>
//     commentSort === "top"
//       ? (b.likes || 0) - (a.likes || 0)
//       : new Date(b.createdAt) - new Date(a.createdAt),
//   );

//   if (loadingVideo)
//     return (
//       <Box
//         bg="gray.50"
//         minH="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Spinner size="xl" color="purple.400" />
//       </Box>
//     );

//   if (!videoData) return null;

//   // ─────────────────────────────────────────────────────────────────────────
//   //  LAYOUT:
//   //
//   //  ┌─────────────────────────────────────────────┐
//   //  │            PLAYER  (full width)             │
//   //  └─────────────────────────────────────────────┘
//   //  ┌──────────────────────┬──────────────────────┐
//   //  │  TITLE + META        │  CHANNEL + ACTIONS   │
//   //  └──────────────────────┴──────────────────────┘
//   //  ┌──────────────────────┬──────────────────────┐
//   //  │  COMMENTS            │  RECOMMENDED VIDEOS  │
//   //  └──────────────────────┴──────────────────────┘
//   //
//   // ─────────────────────────────────────────────────────────────────────────

//   return (
//     <Box bg="gray.50" minH="100vh">
//       {/* ── PLAYER — full bleed, max width ─────────────────────────────── */}
//       <Box
//         maxW="1400px"
//         mx="auto"
//         px={{ base: 0, md: 4 }}
//         pt={{ base: 0, md: 4 }}
//       >
//         <Box
//           borderRadius={{ base: 0, md: "xl" }}
//           overflow="hidden"
//           boxShadow="xl"
//         >
//           <VideoPlayerDisplay />
//         </Box>
//       </Box>

//       {/* ── INFO STRIP — title left, channel+actions right ─────────────── */}
//       <Box maxW="1400px" mx="auto" px={{ base: 4, md: 4 }} mt="4">
//         <Box
//           bg="white"
//           borderRadius="xl"
//           boxShadow="sm"
//           border="1px solid"
//           borderColor="gray.100"
//           p={{ base: 4, md: 6 }}
//         >
//           <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="6">
//             {/* LEFT: Title + meta + description */}
//             <VStack align="stretch" spacing="3">
//               <Text
//                 fontSize={{ base: "lg", md: "xl" }}
//                 fontWeight="bold"
//                 lineHeight="1.3"
//                 color="gray.800"
//               >
//                 {title || "Untitled Video"}
//               </Text>

//               <HStack
//                 spacing="3"
//                 fontSize="sm"
//                 color="gray.500"
//                 flexWrap="wrap"
//               >
//                 <Text fontWeight="semibold" color="gray.700">
//                   {fmt(views)} views
//                 </Text>
//                 <Text>•</Text>
//                 <Text>{formatDate(uploadDate)}</Text>
//                 {category && (
//                   <>
//                     <Text>•</Text>
//                     <Badge colorScheme="purple" variant="subtle">
//                       {category}
//                     </Badge>
//                   </>
//                 )}
//                 {audience && (
//                   <>
//                     <Text>•</Text>
//                     <Badge colorScheme="gray" variant="outline" fontSize="xs">
//                       {audience}
//                     </Badge>
//                   </>
//                 )}
//               </HStack>

//               {/* Tags */}
//               {tags?.length > 0 && (
//                 <HStack flexWrap="wrap" spacing="1.5">
//                   {tags.map((tag) => (
//                     <Box
//                       key={tag}
//                       px="2.5"
//                       py="0.5"
//                       bg="purple.50"
//                       color="purple.600"
//                       borderRadius="full"
//                       fontSize="xs"
//                       fontWeight="medium"
//                       border="1px solid"
//                       borderColor="purple.100"
//                     >
//                       #{tag}
//                     </Box>
//                   ))}
//                 </HStack>
//               )}

//               {/* Expandable description */}
//               <Box
//                 bg="gray.50"
//                 px="4"
//                 py="3"
//                 borderRadius="lg"
//                 cursor="pointer"
//                 onClick={() => setShowDesc((s) => !s)}
//                 border="1px solid"
//                 borderColor="gray.100"
//                 _hover={{ bg: "gray.100" }}
//                 transition="background 0.15s"
//               >
//                 <Text
//                   fontSize="sm"
//                   color="gray.600"
//                   noOfLines={showDesc ? undefined : 2}
//                   lineHeight="1.7"
//                 >
//                   {description || "No description provided."}
//                 </Text>
//                 {showDesc && metadata && (
//                   <Text fontSize="xs" color="gray.400" mt="2">
//                     📐 {metadata.width}×{metadata.height} · ⏱{" "}
//                     {fmtDur(metadata.duration)} · 🎬 {metadata.fps} fps
//                   </Text>
//                 )}
//                 <Text
//                   fontSize="xs"
//                   color="purple.500"
//                   fontWeight="semibold"
//                   mt="1.5"
//                 >
//                   {showDesc ? "Show less ▲" : "Show more ▼"}
//                 </Text>
//               </Box>
//             </VStack>

//             {/* RIGHT: Channel info + action buttons */}
//             <VStack align="stretch" spacing="4">
//               {/* Channel card */}
//               <Box
//                 p="4"
//                 bg="gray.50"
//                 borderRadius="xl"
//                 border="1px solid"
//                 borderColor="gray.200"
//               >
//                 <HStack justify="space-between" align="center">
//                   <HStack spacing="3">
//                     <Avatar
//                       size="md"
//                       src={channelUser?.profilePicture}
//                       name={studioName}
//                     />
//                     <VStack align="start" spacing="0">
//                       <Text fontWeight="bold" fontSize="md" color="gray.800">
//                         {studioName}
//                       </Text>
//                       <Text fontSize="sm" color="gray.500">
//                         {fmt(subscriberCount)} followers
//                       </Text>
//                     </VStack>
//                   </HStack>
//                   {!isOwnChannel && channelOwnerId && (
//                     <Button
//                       colorScheme={isSubscribed ? "gray" : "purple"}
//                       size="sm"
//                       borderRadius="full"
//                       leftIcon={
//                         isNotified ? (
//                           <MdNotificationsActive />
//                         ) : (
//                           <MdNotificationsNone />
//                         )
//                       }
//                       onClick={handleSubscribe}
//                       onMouseEnter={() => isSubscribed && setIsNotified(true)}
//                       onMouseLeave={() => setIsNotified(false)}
//                     >
//                       {isSubscribed ? "Following" : "+ Follow"}
//                     </Button>
//                   )}
//                 </HStack>
//               </Box>

//               {/* Action buttons — 2×2 grid */}
//               <SimpleGrid columns={2} spacing="2">
//                 <Button
//                   variant={liked ? "solid" : "outline"}
//                   colorScheme={liked ? "blue" : "gray"}
//                   leftIcon={liked ? <AiFillLike /> : <AiOutlineLike />}
//                   size="sm"
//                   borderRadius="full"
//                   onClick={handleLike}
//                   justifyContent="start"
//                 >
//                   {fmt(likesCount)} Like
//                 </Button>

//                 <Button
//                   variant={disliked ? "solid" : "outline"}
//                   colorScheme={disliked ? "red" : "gray"}
//                   leftIcon={disliked ? <AiFillDislike /> : <AiOutlineDislike />}
//                   size="sm"
//                   borderRadius="full"
//                   onClick={handleDislike}
//                   justifyContent="start"
//                 >
//                   Dislike
//                 </Button>

//                 <Button
//                   variant={saved ? "solid" : "outline"}
//                   colorScheme={saved ? "purple" : "gray"}
//                   leftIcon={saved ? <BsBookmarkFill /> : <BsBookmark />}
//                   size="sm"
//                   borderRadius="full"
//                   onClick={handleSave}
//                   justifyContent="start"
//                 >
//                   {saved ? "Saved" : "Save"}
//                 </Button>

//                 <Button
//                   variant="outline"
//                   colorScheme="gray"
//                   leftIcon={<FaRegShareSquare />}
//                   size="sm"
//                   borderRadius="full"
//                   onClick={handleShare}
//                   justifyContent="start"
//                 >
//                   Share
//                 </Button>

//                 <Button
//                   variant="outline"
//                   colorScheme="gray"
//                   leftIcon={<RiPlayListAddLine />}
//                   size="sm"
//                   borderRadius="full"
//                   onClick={openPlaylist}
//                   justifyContent="start"
//                   gridColumn="span 2"
//                 >
//                   Add to Playlist
//                 </Button>
//               </SimpleGrid>
//             </VStack>
//           </SimpleGrid>
//         </Box>
//       </Box>

//       {/* ── BOTTOM SECTION — comments LEFT, recommended RIGHT ──────────── */}
//       <Box maxW="1400px" mx="auto" px={{ base: 4, md: 4 }} mt="4" pb="8">
//         <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="4" alignItems="start">
//           {/* ── COMMENTS (left column) ───────────────────────────────── */}
//           <Box
//             bg="white"
//             borderRadius="xl"
//             boxShadow="sm"
//             border="1px solid"
//             borderColor="gray.100"
//             p="5"
//           >
//             <HStack justify="space-between" mb="4">
//               <Text fontWeight="bold" fontSize="lg" color="gray.800">
//                 💬 {fmt(comments.length)} Comments
//               </Text>
//               <Menu>
//                 <MenuButton
//                   as={Button}
//                   variant="ghost"
//                   size="sm"
//                   rightIcon={<BsThreeDots />}
//                   color="gray.500"
//                   _hover={{ bg: "gray.50" }}
//                 >
//                   Sort
//                 </MenuButton>
//                 <MenuList
//                   shadow="lg"
//                   borderRadius="xl"
//                   border="1px solid"
//                   borderColor="gray.100"
//                 >
//                   <MenuItem
//                     onClick={() => setCommentSort("newest")}
//                     fontSize="sm"
//                   >
//                     🕐 Newest first
//                   </MenuItem>
//                   <MenuItem onClick={() => setCommentSort("top")} fontSize="sm">
//                     🔥 Top comments
//                   </MenuItem>
//                 </MenuList>
//               </Menu>
//             </HStack>

//             {/* Add comment */}
//             <HStack align="start" spacing="3" mb="5">
//               <Avatar
//                 size="sm"
//                 src={currentUser?.profilePicture}
//                 name={currentUser?.username || "You"}
//               />
//               <VStack flex="1" align="stretch" spacing="2">
//                 <Textarea
//                   placeholder="Add a comment…"
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   size="sm"
//                   resize="none"
//                   rows={2}
//                   borderRadius="lg"
//                   focusBorderColor="purple.400"
//                   bg="gray.50"
//                   border="1px solid"
//                   borderColor="gray.200"
//                 />
//                 {commentText && (
//                   <HStack justify="end" spacing="2">
//                     <Button
//                       size="sm"
//                       variant="ghost"
//                       color="gray.500"
//                       onClick={() => setCommentText("")}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       size="sm"
//                       colorScheme="purple"
//                       borderRadius="full"
//                       onClick={handleAddComment}
//                     >
//                       Post
//                     </Button>
//                   </HStack>
//                 )}
//               </VStack>
//             </HStack>

//             <Divider mb="4" />

//             {/* Comment list */}
//             <VStack
//               align="stretch"
//               spacing="5"
//               maxH="520px"
//               overflowY="auto"
//               pr="1"
//               css={{
//                 "&::-webkit-scrollbar": { width: "4px" },
//                 "&::-webkit-scrollbar-thumb": {
//                   background: "#e2e8f0",
//                   borderRadius: "4px",
//                 },
//               }}
//             >
//               {sortedComments.length === 0 ? (
//                 <Text color="gray.400" fontSize="sm" textAlign="center" py="8">
//                   No comments yet. Be the first!
//                 </Text>
//               ) : (
//                 sortedComments.map((c) => (
//                   <Box key={c._id || Math.random()}>
//                     <HStack align="start" spacing="3">
//                       <Avatar
//                         size="sm"
//                         src={c.user?.profilePicture}
//                         name={c.user?.username || "User"}
//                         flexShrink={0}
//                       />
//                       <VStack align="start" spacing="1" flex="1">
//                         <HStack justify="space-between" w="100%">
//                           <HStack spacing="2">
//                             <Text
//                               fontWeight="semibold"
//                               fontSize="sm"
//                               color="gray.800"
//                             >
//                               {c.user?.username || "User"}
//                             </Text>
//                             <Text fontSize="xs" color="gray.400">
//                               {timeAgo(c.createdAt)}
//                             </Text>
//                           </HStack>
//                           {currentUser &&
//                             (String(c.user?._id) === String(currentUser._id) ||
//                               c.user === currentUser._id) && (
//                               <IconButton
//                                 icon={<MdDelete />}
//                                 size="xs"
//                                 variant="ghost"
//                                 colorScheme="red"
//                                 aria-label="Delete"
//                                 onClick={() => handleDeleteComment(c._id)}
//                               />
//                             )}
//                         </HStack>
//                         <Text fontSize="sm" color="gray.700" lineHeight="1.6">
//                           {c.text}
//                         </Text>
//                         <HStack spacing="3" pt="1">
//                           <HStack spacing="1">
//                             <IconButton
//                               icon={<AiOutlineLike />}
//                               size="xs"
//                               variant="ghost"
//                               aria-label="Like"
//                               onClick={() => handleLikeComment(c._id)}
//                             />
//                             <Text fontSize="xs" color="gray.500">
//                               {c.likes || 0}
//                             </Text>
//                           </HStack>
//                           <Button
//                             size="xs"
//                             variant="ghost"
//                             leftIcon={<BsReply />}
//                             color="gray.500"
//                             onClick={() =>
//                               setReplyingTo(replyingTo === c._id ? null : c._id)
//                             }
//                           >
//                             Reply
//                           </Button>
//                         </HStack>

//                         <Collapse in={replyingTo === c._id} animateOpacity>
//                           <HStack align="start" spacing="2" mt="2" w="100%">
//                             <Avatar
//                               size="xs"
//                               src={currentUser?.profilePicture}
//                               name={currentUser?.username}
//                             />
//                             <VStack flex="1" align="stretch" spacing="1">
//                               <Textarea
//                                 placeholder="Write a reply…"
//                                 value={replyText}
//                                 onChange={(e) => setReplyText(e.target.value)}
//                                 size="xs"
//                                 resize="none"
//                                 rows={2}
//                                 borderRadius="lg"
//                                 focusBorderColor="purple.400"
//                               />
//                               <HStack justify="end">
//                                 <Button
//                                   size="xs"
//                                   variant="ghost"
//                                   onClick={() => setReplyingTo(null)}
//                                 >
//                                   Cancel
//                                 </Button>
//                                 <Button
//                                   size="xs"
//                                   colorScheme="purple"
//                                   onClick={() => handleReply(c._id)}
//                                 >
//                                   Reply
//                                 </Button>
//                               </HStack>
//                             </VStack>
//                           </HStack>
//                         </Collapse>

//                         {c.replies?.length > 0 && (
//                           <VStack
//                             align="stretch"
//                             spacing="2"
//                             mt="2"
//                             pl="3"
//                             borderLeft="2px solid"
//                             borderColor="gray.100"
//                           >
//                             {c.replies.map((r, ri) => (
//                               <HStack key={ri} align="start" spacing="2">
//                                 <Avatar
//                                   size="xs"
//                                   src={r.user?.profilePicture}
//                                   name={r.user?.username}
//                                 />
//                                 <VStack align="start" spacing="0">
//                                   <HStack spacing="1.5">
//                                     <Text
//                                       fontWeight="semibold"
//                                       fontSize="xs"
//                                       color="gray.700"
//                                     >
//                                       {r.user?.username}
//                                     </Text>
//                                     <Text fontSize="xs" color="gray.400">
//                                       {timeAgo(r.createdAt)}
//                                     </Text>
//                                   </HStack>
//                                   <Text fontSize="xs" color="gray.600">
//                                     {r.text}
//                                   </Text>
//                                 </VStack>
//                               </HStack>
//                             ))}
//                           </VStack>
//                         )}
//                       </VStack>
//                     </HStack>
//                   </Box>
//                 ))
//               )}
//             </VStack>
//           </Box>

//           {/* ── RECOMMENDED (right column, card grid) ────────────────── */}
//           <Box>
//             <Text
//               fontWeight="bold"
//               fontSize="lg"
//               color="gray.800"
//               mb="3"
//               px="1"
//             >
//               🎬 More Videos
//             </Text>

//             {loadingRec ? (
//               <SimpleGrid columns={1} spacing="3">
//                 {[...Array(4)].map((_, i) => (
//                   <Box
//                     key={i}
//                     bg="white"
//                     borderRadius="xl"
//                     p="3"
//                     border="1px solid"
//                     borderColor="gray.100"
//                   >
//                     <HStack spacing="3">
//                       <Skeleton
//                         w="120px"
//                         h="68px"
//                         borderRadius="lg"
//                         flexShrink={0}
//                       />
//                       <VStack align="start" spacing="2" flex="1">
//                         <SkeletonText noOfLines={2} spacing="2" w="100%" />
//                         <Skeleton h="10px" w="50%" />
//                       </VStack>
//                     </HStack>
//                   </Box>
//                 ))}
//               </SimpleGrid>
//             ) : (
//               <VStack
//                 spacing="2"
//                 align="stretch"
//                 maxH="640px"
//                 overflowY="auto"
//                 pr="1"
//                 css={{
//                   "&::-webkit-scrollbar": { width: "4px" },
//                   "&::-webkit-scrollbar-thumb": {
//                     background: "#e2e8f0",
//                     borderRadius: "4px",
//                   },
//                 }}
//               >
//                 {recommended.map((video) => {
//                   const cached = videoStatCache.get(video._id) || {};
//                   const vViews = cached.views ?? video.views;
//                   return (
//                     <Box
//                       key={video._id}
//                       bg="white"
//                       borderRadius="xl"
//                       p="3"
//                       border="1px solid"
//                       borderColor="gray.100"
//                       cursor="pointer"
//                       transition="all 0.18s"
//                       _hover={{
//                         boxShadow: "md",
//                         borderColor: "purple.200",
//                         transform: "translateY(-1px)",
//                       }}
//                       onClick={() => playRecommended(video)}
//                     >
//                       <HStack spacing="3" align="start">
//                         {/* Thumbnail */}
//                         <Box
//                           position="relative"
//                           w="120px"
//                           h="68px"
//                           flexShrink={0}
//                           borderRadius="lg"
//                           overflow="hidden"
//                           bg="gray.100"
//                         >
//                           <Image
//                             src={video.thumbnailUrl}
//                             alt={video.title}
//                             w="100%"
//                             h="100%"
//                             objectFit="cover"
//                             loading="lazy"
//                           />
//                           {video.metadata?.duration && (
//                             <Box
//                               position="absolute"
//                               bottom="1"
//                               right="1"
//                               bg="blackAlpha.800"
//                               color="white"
//                               fontSize="10px"
//                               fontWeight="700"
//                               px="1.5"
//                               py="0.5"
//                               borderRadius="md"
//                             >
//                               <HStack spacing="0.5">
//                                 <BiTime size="9" />
//                                 <Text>{fmtDur(video.metadata.duration)}</Text>
//                               </HStack>
//                             </Box>
//                           )}
//                         </Box>
//                         {/* Info */}
//                         <VStack align="start" spacing="0.5" flex="1" minW={0}>
//                           <Text
//                             fontSize="13px"
//                             fontWeight="semibold"
//                             color="gray.800"
//                             noOfLines={2}
//                             lineHeight="1.35"
//                           >
//                             {video.title}
//                           </Text>
//                           <Text
//                             fontSize="11px"
//                             color="purple.600"
//                             fontWeight="medium"
//                             noOfLines={1}
//                           >
//                             {video.user?.channelName ??
//                               video.user?.username ??
//                               "Creator"}
//                           </Text>
//                           <Text fontSize="11px" color="gray.400">
//                             {fmt(vViews)} views · {timeAgo(video.createdAt)}
//                           </Text>
//                         </VStack>
//                       </HStack>
//                     </Box>
//                   );
//                 })}

//                 <Box
//                   ref={loadMoreRef}
//                   py="3"
//                   display="flex"
//                   justifyContent="center"
//                 >
//                   {loadingMoreRec && <Spinner size="sm" color="purple.400" />}
//                   {!hasMoreRec && recommended.length > 0 && (
//                     <Text fontSize="xs" color="gray.400">
//                       All videos shown ✓
//                     </Text>
//                   )}
//                 </Box>
//               </VStack>
//             )}
//           </Box>
//         </SimpleGrid>
//       </Box>

//       {/* ── Playlist modal ─────────────────────────────────────────────── */}
//       <Modal isOpen={isPlaylistOpen} onClose={closePlaylist} size="sm">
//         <ModalOverlay backdropFilter="blur(4px)" />
//         <ModalContent borderRadius="2xl" boxShadow="2xl">
//           <ModalHeader fontSize="md" fontWeight="bold">
//             Add to Playlist
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb="5">
//             <VStack align="stretch" spacing="2">
//               {playlists.length === 0 && (
//                 <Text fontSize="sm" color="gray.400" textAlign="center" py="3">
//                   No playlists yet
//                 </Text>
//               )}
//               {playlists.map((pl) => (
//                 <Button
//                   key={pl._id}
//                   variant="outline"
//                   justifyContent="start"
//                   size="sm"
//                   borderRadius="lg"
//                   onClick={() => handleAddToPlaylist(pl.name)}
//                 >
//                   {pl.name}
//                   <Text
//                     as="span"
//                     color="gray.400"
//                     fontWeight="normal"
//                     ml="2"
//                     fontSize="xs"
//                   >
//                     ({pl.videos?.length || 0} videos)
//                   </Text>
//                 </Button>
//               ))}
//               <Divider />
//               <Text fontSize="sm" fontWeight="semibold" color="gray.700">
//                 New playlist
//               </Text>
//               <HStack>
//                 <Input
//                   size="sm"
//                   placeholder="Playlist name"
//                   value={newPlaylist}
//                   onChange={(e) => setNewPlaylist(e.target.value)}
//                   onKeyDown={(e) =>
//                     e.key === "Enter" && handleAddToPlaylist(newPlaylist.trim())
//                   }
//                   borderRadius="lg"
//                   focusBorderColor="purple.400"
//                 />
//                 <Button
//                   size="sm"
//                   colorScheme="purple"
//                   borderRadius="lg"
//                   onClick={() => handleAddToPlaylist(newPlaylist.trim())}
//                 >
//                   Create
//                 </Button>
//               </HStack>
//             </VStack>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default VideoPlayerUI;









import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Avatar,
  Textarea,
  IconButton,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Skeleton,
  SkeletonText,
  Image,
  Badge,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { FaRegShareSquare } from "react-icons/fa";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import {
  BsBookmark,
  BsBookmarkFill,
  BsThreeDots,
  BsReply,
} from "react-icons/bs";
import { RiDownload2Fill, RiPlayListAddLine } from "react-icons/ri";
import {
  MdNotificationsActive,
  MdNotificationsNone,
  MdDelete,
} from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import VideoPlayerDisplay from "./VideoPlayerDisplay";
import {
  getVideosApi,
  likeVideoApi,
  saveVideoApi,
  subscribeApi,
  addCommentApi,
  deleteCommentApi,
  replyCommentApi,
  likeCommentApi,
  createOrAddToPlaylistApi,
  getPlaylistsApi,
} from "../services/apis/uploadVideo";
import { checkAuthApi } from "../services/apis/userAuth";

// ─── Global store for real-time video stat updates ──────────────────────────
// VideoGrid/VideoCard read from this map on next render.
// Key: videoId, Value: { views, likes, dislikes, likedBy, dislikedBy }
export const videoStatCache = new Map();

const VideoPlayerUI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const {
    isOpen: isPlaylistOpen,
    onOpen: openPlaylist,
    onClose: closePlaylist,
  } = useDisclosure();

  // Pull everything from navigation state
  const state = location.state || {};
  const {
    title,
    description,
    uploadDate,
    category,
    audience,
    tags = [],
    qualities = [],
    metadata,
    _id,
    views: initialViews = 0,
    likes: initialLikes = 0,
    dislikes: initialDislikes = 0,
    likedBy: initialLikedBy = [],
    dislikedBy: initialDislikedBy = [],
    savedBy: initialSavedBy = [],
    comments: initialComments = [],
    user: channelUser, // full user object from backend
  } = state;

  // ── Auth ────────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(null);

  // ── Live video stats (update these; write back to cache) ────────────
  const [views, setViews] = useState(initialViews);
  const [likesCount, setLikes] = useState(initialLikes);
  const [dislikesCount, setDislikes] = useState(initialDislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);

  // ── Channel ──────────────────────────────────────────────────────────
  const [channelInfo, setChannelInfo] = useState(channelUser ?? null);
  const [subscriberCount, setSubscriberCount] = useState(
    channelUser?.subscribers?.length ?? 0,
  );
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isNotified, setIsNotified] = useState(false);

  // ── Comments ─────────────────────────────────────────────────────────
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [commentSort, setCommentSort] = useState("newest");
  const [showDesc, setShowDesc] = useState(false);

  // ── Playlists ─────────────────────────────────────────────────────────
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState("");

  // ── Recommended ──────────────────────────────────────────────────────
  const [allVideos, setAllVideos] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [recPage, setRecPage] = useState(1);
  const [hasMoreRec, setHasMoreRec] = useState(true);
  const [loadingRec, setLoadingRec] = useState(true);
  const [loadingMoreRec, setLoadingMoreRec] = useState(false);
  const PAGE_SIZE = 6;

  // ── Load current user ────────────────────────────────────────────────
  useEffect(() => {
    checkAuthApi().then(({ authenticated, user }) => {
      if (authenticated) setCurrentUser(user);
    });
  }, []);

  // ── Initialise interaction state from arrays once user is known ───────
  useEffect(() => {
    if (!currentUser) return;
    const uid = String(currentUser._id);
    setLiked(initialLikedBy.some((id) => String(id) === uid));
    setDisliked(initialDislikedBy.some((id) => String(id) === uid));
    setSaved(initialSavedBy.some((id) => String(id) === uid));
    if (channelUser?.subscribers) {
      setIsSubscribed(channelUser.subscribers.some((id) => String(id) === uid));
    }
  }, [currentUser]);

  // ── Increment views once (side-effect of opening player) ─────────────
  useEffect(() => {
    setViews((v) => v + 1);
    // Update the global cache so VideoGrid reflects this view immediately
    if (_id) {
      const cached = videoStatCache.get(_id) || {};
      videoStatCache.set(_id, {
        ...cached,
        views: (cached.views ?? initialViews) + 1,
      });
    }
  }, [_id]);

  // ── Load playlists ────────────────────────────────────────────────────
  useEffect(() => {
    if (currentUser?._id) {
      getPlaylistsApi(currentUser._id)
        .then((d) => setPlaylists(d.playlists || []))
        .catch(() => {});
    }
  }, [currentUser]);

  // ── Fetch recommended videos ──────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoadingRec(true);
      try {
        const data = await getVideosApi({
          page: 1,
          limit: 50,
          sort: "popular",
        });
        const filtered = data.videos.filter((v) => v._id !== _id);
        setAllVideos(filtered);
        setRecommended(filtered.slice(0, PAGE_SIZE));
        setHasMoreRec(filtered.length > PAGE_SIZE);
        setRecPage(2);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingRec(false);
      }
    })();
  }, [_id]);

  // ── Infinite scroll for recommended ──────────────────────────────────
  useEffect(() => {
    if (loadingRec || loadingMoreRec || !hasMoreRec) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadingMoreRec(true);
          setTimeout(() => {
            const next = allVideos.slice(0, recPage * PAGE_SIZE);
            setRecommended(next);
            setHasMoreRec(next.length < allVideos.length);
            setRecPage((p) => p + 1);
            setLoadingMoreRec(false);
          }, 400);
        }
      },
      { threshold: 1 },
    );
    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current?.disconnect();
  }, [loadingRec, loadingMoreRec, hasMoreRec, allVideos, recPage]);

  // ── Helpers ───────────────────────────────────────────────────────────
  const requireAuth = () => {
    if (!currentUser) {
      toast({
        title: "Sign in required",
        status: "warning",
        duration: 2000,
        position: "top",
      });
      return false;
    }
    return true;
  };

  const fmt = (n = 0) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
  };

  const formatDate = (d) =>
    !d
      ? ""
      : new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  const fmtDuration = (s) => {
    if (!s) return "0:00";
    const h = Math.floor(s / 3600),
      m = Math.floor((s % 3600) / 60),
      sec = Math.floor(s % 60)
        .toString()
        .padStart(2, "0");
    return h > 0
      ? `${h}:${m.toString().padStart(2, "0")}:${sec}`
      : `${m}:${sec}`;
  };
  const timeAgo = (d) => {
    if (!d) return "Recently";
    const s = Math.floor((Date.now() - new Date(d)) / 1000);
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

  // ── Write updated stats to cache (VideoGrid reads this) ───────────────
  const writeCache = (patch) => {
    if (!_id) return;
    const current = videoStatCache.get(_id) || {};
    videoStatCache.set(_id, { ...current, ...patch });
  };

  // ── Like / Dislike ────────────────────────────────────────────────────
  const handleLike = async () => {
    if (!requireAuth()) return;
    const action = liked ? "unlike" : "like";
    const newLiked = !liked;
    const newDisliked = newLiked ? false : disliked;
    const newLikes = liked ? likesCount - 1 : likesCount + 1;
    const newDislikes = !liked && disliked ? dislikesCount - 1 : dislikesCount;

    // Optimistic UI
    setLiked(newLiked);
    setDisliked(newDisliked);
    setLikes(newLikes);
    setDislikes(newDislikes);
    writeCache({ likes: newLikes, dislikes: newDislikes });

    try {
      const res = await likeVideoApi(_id, currentUser._id, action);
      // Sync with server truth
      setLikes(res.likes);
      setDislikes(res.dislikes);
      writeCache({ likes: res.likes, dislikes: res.dislikes });
    } catch {
      // Revert
      setLiked(liked);
      setDisliked(disliked);
      setLikes(likesCount);
      setDislikes(dislikesCount);
    }
  };

  const handleDislike = async () => {
    if (!requireAuth()) return;
    const action = disliked ? "undislike" : "dislike";
    const newDisliked = !disliked;
    const newLiked = newDisliked ? false : liked;
    const newLikes = !disliked && liked ? likesCount - 1 : likesCount;
    const newDislikes = disliked ? dislikesCount - 1 : dislikesCount + 1;

    setDisliked(newDisliked);
    setLiked(newLiked);
    setLikes(newLikes);
    setDislikes(newDislikes);
    writeCache({ likes: newLikes, dislikes: newDislikes });

    try {
      const res = await likeVideoApi(_id, currentUser._id, action);
      setLikes(res.likes);
      setDislikes(res.dislikes);
      writeCache({ likes: res.likes, dislikes: res.dislikes });
    } catch {
      setDisliked(disliked);
      setLiked(liked);
      setLikes(likesCount);
      setDislikes(dislikesCount);
    }
  };

  // ── Save ──────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!requireAuth()) return;
    const prev = saved;
    setSaved(!saved);
    try {
      await saveVideoApi(_id, currentUser._id);
      toast({
        title: saved ? "Removed from saved" : "Saved!",
        status: "success",
        duration: 1500,
        position: "top",
      });
    } catch {
      setSaved(prev);
    }
  };

  // ── Subscribe — blocked if user is the channel owner ──────────────────
  const channelOwnerId = channelInfo?._id ?? channelUser?._id;
  const isOwnChannel =
    currentUser &&
    channelOwnerId &&
    String(currentUser._id) === String(channelOwnerId);

  const handleSubscribe = async () => {
    if (!requireAuth()) return;
    if (isOwnChannel) {
      toast({
        title: "You can't follow your own studio",
        status: "info",
        duration: 2000,
        position: "top",
      });
      return;
    }
    const prev = isSubscribed;
    setIsSubscribed(!isSubscribed);
    setSubscriberCount((c) => (isSubscribed ? c - 1 : c + 1));
    try {
      await subscribeApi(channelOwnerId, currentUser._id);
      toast({
        title: isSubscribed ? "Unfollowed studio" : "Following studio! 🔔",
        status: isSubscribed ? "info" : "success",
        duration: 1500,
        position: "top",
      });
    } catch {
      setIsSubscribed(prev);
      setSubscriberCount((c) => (isSubscribed ? c + 1 : c - 1));
    }
  };

  // ── Share ─────────────────────────────────────────────────────────────
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ description: "Link copied!", status: "success", duration: 1500 });
    }
  };

  // ── Comments ──────────────────────────────────────────────────────────
  const handleAddComment = async () => {
    if (!requireAuth() || !commentText.trim()) return;
    try {
      const newC = await addCommentApi(
        _id,
        currentUser._id,
        commentText.trim(),
      );
      setComments((prev) => [{ ...newC, user: currentUser }, ...prev]);
      setCommentText("");
    } catch {
      toast({ title: "Failed to post", status: "error", duration: 2000 });
    }
  };

  const handleDeleteComment = async (cid) => {
    if (!requireAuth()) return;
    setComments((prev) => prev.filter((c) => c._id !== cid));
    try {
      await deleteCommentApi(_id, cid, currentUser._id);
    } catch {
      toast({ title: "Failed to delete", status: "error", duration: 2000 });
    }
  };

  const handleReply = async (cid) => {
    if (!requireAuth() || !replyText.trim()) return;
    try {
      await replyCommentApi(_id, cid, currentUser._id, replyText.trim());
      setReplyingTo(null);
      setReplyText("");
      toast({ title: "Reply added", status: "success", duration: 1500 });
    } catch {
      toast({ title: "Failed", status: "error", duration: 2000 });
    }
  };

  const handleLikeComment = async (cid) => {
    if (!requireAuth()) return;
    try {
      const res = await likeCommentApi(_id, cid, currentUser._id);
      setComments((prev) =>
        prev.map((c) => (c._id === cid ? { ...c, likes: res.likes } : c)),
      );
    } catch {}
  };

  // ── Playlist ──────────────────────────────────────────────────────────
  const handleAddToPlaylist = async (name) => {
    if (!requireAuth()) return;
    try {
      const data = await createOrAddToPlaylistApi(currentUser._id, name, _id);
      setPlaylists(data.playlists);
      toast({ title: `Added to "${name}"`, status: "success", duration: 1500 });
      closePlaylist();
    } catch {
      toast({ title: "Failed", status: "error", duration: 2000 });
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newPlaylist.trim()) return;
    await handleAddToPlaylist(newPlaylist.trim());
    setNewPlaylist("");
  };

  // ── Navigate to recommended video ─────────────────────────────────────
  const playRecommended = (video) => {
    navigate("/VideoPlayer", {
      state: {
        videoUrl: video.videoUrl,
        qualities: video.qualities,
        metadata: video.metadata,
        title: video.title,
        description: video.description,
        category: video.category,
        audience: video.audience,
        tags: video.tags,
        _id: video._id,
        uploadDate: video.createdAt,
        views: videoStatCache.get(video._id)?.views ?? video.views,
        likes: videoStatCache.get(video._id)?.likes ?? video.likes,
        dislikes: videoStatCache.get(video._id)?.dislikes ?? video.dislikes,
        likedBy: video.likedBy || [],
        dislikedBy: video.dislikedBy || [],
        savedBy: video.savedBy || [],
        comments: video.comments || [],
        user: video.user,
      },
    });
    window.scrollTo(0, 0);
  };

  const sortedComments = [...comments].sort((a, b) =>
    commentSort === "top"
      ? (b.likes || 0) - (a.likes || 0)
      : new Date(b.createdAt) - new Date(a.createdAt),
  );

  const RecSkeleton = () => (
    <HStack align="start" spacing="2" p="2">
      <Skeleton w="168px" h="94px" borderRadius="lg" flexShrink={0} />
      <VStack align="start" spacing="2" flex="1">
        <SkeletonText noOfLines={2} spacing="2" w="100%" />
        <Skeleton h="10px" w="60%" />
      </VStack>
    </HStack>
  );

  // ── Channel display ───────────────────────────────────────────────────
  const studioName =
    channelInfo?.channelName ?? channelInfo?.username ?? "Creator";

  return (
    <Box bg="gray.50" minH="100vh" pb="80px">
      <Box maxW="1920px" mx="auto">
        <HStack align="start" spacing="4" p="4">
          {/* ── Main ───────────────────────────────────────────────────── */}
          <VStack flex="1" align="stretch" spacing="4" maxW="1280px">
            <VideoPlayerDisplay />

            {/* Video info card */}
            <VStack
              align="stretch"
              spacing="3"
              bg="white"
              p="5"
              borderRadius="xl"
              boxShadow="sm"
              transition="all 0.2s"
            >
              {/* Title */}
              <Text fontSize="xl" fontWeight="bold" lineHeight="1.3">
                {title || "Untitled Video"}
              </Text>

              {/* Meta + Actions */}
              <HStack justify="space-between" wrap="wrap" spacing="2">
                <HStack
                  spacing="3"
                  fontSize="sm"
                  color="gray.500"
                  flexWrap="wrap"
                >
                  {/* Views — reads live count */}
                  <Text fontWeight="medium" color="gray.700">
                    {fmt(views)} views
                  </Text>
                  <Text>•</Text>
                  <Text>{formatDate(uploadDate)}</Text>
                  {category && (
                    <>
                      <Text>•</Text>
                      <Text>{category}</Text>
                    </>
                  )}
                </HStack>

                <HStack spacing="2" flexWrap="wrap">
                  {/* Like / Dislike */}
                  <HStack
                    bg="gray.100"
                    borderRadius="full"
                    overflow="hidden"
                    divider={<Box w="1px" bg="gray.300" h="24px" />}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      borderRadius="full"
                      leftIcon={
                        liked ? (
                          <AiFillLike color="#3182ce" />
                        ) : (
                          <AiOutlineLike />
                        )
                      }
                      onClick={handleLike}
                      color={liked ? "blue.500" : "gray.700"}
                      transition="all 0.15s"
                    >
                      {fmt(likesCount)}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      borderRadius="full"
                      leftIcon={
                        disliked ? (
                          <AiFillDislike color="#e53e3e" />
                        ) : (
                          <AiOutlineDislike />
                        )
                      }
                      onClick={handleDislike}
                      color={disliked ? "red.500" : "gray.700"}
                      transition="all 0.15s"
                    >
                      Dislike
                    </Button>
                  </HStack>

                  <Button
                    variant="outline"
                    leftIcon={<FaRegShareSquare />}
                    size="sm"
                    borderRadius="full"
                    onClick={handleShare}
                  >
                    Share
                  </Button>

                  <IconButton
                    icon={saved ? <BsBookmarkFill /> : <BsBookmark />}
                    aria-label="Save"
                    variant="outline"
                    size="sm"
                    borderRadius="full"
                    onClick={handleSave}
                    color={saved ? "blue.500" : "gray.700"}
                    transition="all 0.2s"
                  />

                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<BsThreeDots />}
                      variant="ghost"
                      size="sm"
                      borderRadius="full"
                    />
                    <MenuList>
                      <MenuItem
                        icon={<RiPlayListAddLine />}
                        onClick={openPlaylist}
                      >
                        Add to playlist
                      </MenuItem>
                      <MenuItem>Report</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </HStack>

              <Divider />

              {/* ── Channel / Studio info ──────────────────────────────── */}
              <HStack
                justify="space-between"
                align="center"
                wrap="wrap"
                gap="3"
              >
                <HStack spacing="3">
                  <Avatar
                    size="md"
                    src={channelInfo?.profilePicture}
                    name={studioName}
                  />
                  <VStack align="start" spacing="0">
                    {/* Show studio name prominently */}
                    <Text fontWeight="bold" fontSize="md">
                      {studioName}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {fmt(subscriberCount)} followers
                    </Text>
                  </VStack>
                </HStack>

                {/* Subscribe — hidden for own channel, visible for others */}
                {!isOwnChannel && channelOwnerId && (
                  <Button
                    colorScheme={isSubscribed ? "gray" : "red"}
                    size="md"
                    borderRadius="full"
                    onClick={handleSubscribe}
                    leftIcon={
                      isNotified ? (
                        <MdNotificationsActive />
                      ) : (
                        <MdNotificationsNone />
                      )
                    }
                    onMouseEnter={() => isSubscribed && setIsNotified(true)}
                    onMouseLeave={() => setIsNotified(false)}
                    transition="all 0.2s"
                  >
                    {isSubscribed ? "Following" : "+ Follow"}
                  </Button>
                )}
              </HStack>

              {/* Description */}
              <Box
                bg="gray.50"
                p="3"
                borderRadius="lg"
                cursor="pointer"
                onClick={() => setShowDesc((s) => !s)}
                transition="background 0.2s"
                _hover={{ bg: "gray.100" }}
              >
                <Text
                  fontSize="sm"
                  color="gray.700"
                  noOfLines={showDesc ? undefined : 2}
                >
                  {description || "No description."}
                  {showDesc && metadata && (
                    <>
                      {"\n\n"}
                      📐 {metadata.width}×{metadata.height} · ⏱{" "}
                      {fmtDuration(metadata.duration)} · 🎬 {metadata.fps} fps
                    </>
                  )}
                </Text>
                <Text fontSize="xs" color="blue.500" fontWeight="medium" mt="1">
                  {showDesc ? "Show less" : "Show more"}
                </Text>
              </Box>
            </VStack>

            {/* ── Comments ────────────────────────────────────────────── */}
            <VStack
              align="stretch"
              spacing="4"
              bg="white"
              p="5"
              borderRadius="xl"
              boxShadow="sm"
            >
              <HStack justify="space-between">
                <Text fontWeight="bold" fontSize="lg">
                  {fmt(comments.length)} Comments
                </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    size="sm"
                    rightIcon={<BsThreeDots />}
                  >
                    Sort by
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => setCommentSort("newest")}>
                      Newest first
                    </MenuItem>
                    <MenuItem onClick={() => setCommentSort("top")}>
                      Top comments
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>

              {/* Add comment */}
              <HStack align="start" spacing="3">
                <Avatar
                  size="sm"
                  src={currentUser?.profilePicture}
                  name={currentUser?.username || "You"}
                />
                <VStack flex="1" align="stretch" spacing="2">
                  <Textarea
                    placeholder="Add a comment…"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    size="sm"
                    resize="none"
                    rows={2}
                    borderRadius="lg"
                    focusBorderColor="blue.400"
                  />
                  {commentText && (
                    <HStack justify="end">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setCommentText("")}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        borderRadius="full"
                        onClick={handleAddComment}
                      >
                        Comment
                      </Button>
                    </HStack>
                  )}
                </VStack>
              </HStack>

              <Divider />

              {/* Comment list */}
              <VStack align="stretch" spacing="4">
                {sortedComments.map((c) => (
                  <Box key={c._id || Math.random()}>
                    <HStack align="start" spacing="3">
                      <Avatar
                        size="sm"
                        src={c.user?.profilePicture}
                        name={c.user?.username || "User"}
                      />
                      <VStack align="start" spacing="1" flex="1">
                        <HStack spacing="2" justify="space-between" w="100%">
                          <HStack>
                            <Text fontWeight="semibold" fontSize="sm">
                              {c.user?.username || "User"}
                            </Text>
                            <Text fontSize="xs" color="gray.400">
                              {timeAgo(c.createdAt)}
                            </Text>
                          </HStack>
                          {currentUser &&
                            (String(c.user?._id) === String(currentUser._id) ||
                              c.user === currentUser._id) && (
                              <IconButton
                                icon={<MdDelete />}
                                size="xs"
                                variant="ghost"
                                colorScheme="red"
                                aria-label="Delete"
                                onClick={() => handleDeleteComment(c._id)}
                              />
                            )}
                        </HStack>
                        <Text fontSize="sm" color="gray.700">
                          {c.text}
                        </Text>
                        <HStack spacing="3" pt="1">
                          <HStack spacing="1">
                            <IconButton
                              icon={<AiOutlineLike />}
                              size="xs"
                              variant="ghost"
                              aria-label="Like comment"
                              onClick={() => handleLikeComment(c._id)}
                            />
                            <Text fontSize="xs" color="gray.500">
                              {c.likes || 0}
                            </Text>
                          </HStack>
                          <Button
                            size="xs"
                            variant="ghost"
                            leftIcon={<BsReply />}
                            onClick={() =>
                              setReplyingTo(replyingTo === c._id ? null : c._id)
                            }
                          >
                            Reply
                          </Button>
                        </HStack>

                        {/* Reply input */}
                        <Collapse in={replyingTo === c._id} animateOpacity>
                          <HStack align="start" spacing="2" mt="2" w="100%">
                            <Avatar
                              size="xs"
                              src={currentUser?.profilePicture}
                              name={currentUser?.username}
                            />
                            <VStack flex="1" align="stretch" spacing="1">
                              <Textarea
                                placeholder="Write a reply…"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                size="xs"
                                resize="none"
                                rows={2}
                                borderRadius="md"
                              />
                              <HStack justify="end">
                                <Button
                                  size="xs"
                                  variant="ghost"
                                  onClick={() => setReplyingTo(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size="xs"
                                  colorScheme="blue"
                                  onClick={() => handleReply(c._id)}
                                >
                                  Reply
                                </Button>
                              </HStack>
                            </VStack>
                          </HStack>
                        </Collapse>

                        {/* Replies */}
                        {c.replies?.length > 0 && (
                          <VStack
                            align="stretch"
                            spacing="2"
                            mt="2"
                            pl="4"
                            borderLeft="2px"
                            borderColor="gray.100"
                          >
                            {c.replies.map((r, ri) => (
                              <HStack key={ri} align="start" spacing="2">
                                <Avatar
                                  size="xs"
                                  src={r.user?.profilePicture}
                                  name={r.user?.username}
                                />
                                <VStack align="start" spacing="0">
                                  <HStack spacing="2">
                                    <Text fontWeight="semibold" fontSize="xs">
                                      {r.user?.username}
                                    </Text>
                                    <Text fontSize="xs" color="gray.400">
                                      {timeAgo(r.createdAt)}
                                    </Text>
                                  </HStack>
                                  <Text fontSize="xs" color="gray.700">
                                    {r.text}
                                  </Text>
                                </VStack>
                              </HStack>
                            ))}
                          </VStack>
                        )}
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </VStack>

          {/* ── Recommended sidebar ────────────────────────────────────── */}
          <VStack
            w="400px"
            align="stretch"
            spacing="0"
            display={{ base: "none", xl: "flex" }}
            maxH="calc(100vh - 80px)"
            overflowY="auto"
            css={{
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": {
                background: "#cbd5e0",
                borderRadius: "3px",
              },
            }}
          >
            <Text fontWeight="bold" fontSize="md" p="2" pb="3">
              Up Next
            </Text>

            {loadingRec ? (
              [...Array(5)].map((_, i) => <RecSkeleton key={i} />)
            ) : (
              <>
                {recommended.map((video, idx) => {
                  // Merge any cached stat updates
                  const cached = videoStatCache.get(video._id) || {};
                  const vViews = cached.views ?? video.views;
                  const vLikes = cached.likes ?? video.likes;
                  return (
                    <HStack
                      key={video._id || idx}
                      align="start"
                      spacing="2"
                      p="2"
                      borderRadius="lg"
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      transition="all 0.2s"
                      onClick={() => playRecommended(video)}
                    >
                      <Box
                        position="relative"
                        w="168px"
                        h="94px"
                        bg="gray.200"
                        borderRadius="lg"
                        overflow="hidden"
                        flexShrink={0}
                      >
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          loading="lazy"
                        />
                        {video.metadata?.duration && (
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
                            {fmtDuration(video.metadata.duration)}
                          </Badge>
                        )}
                      </Box>
                      <VStack align="start" spacing="1" flex="1" minW={0}>
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          noOfLines={2}
                          lineHeight="1.3"
                        >
                          {video.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {video.user?.channelName ??
                            video.user?.username ??
                            "Creator"}
                        </Text>
                        <HStack spacing="1" fontSize="xs" color="gray.400">
                          <Text>{fmt(vViews)} views</Text>
                          <Text>•</Text>
                          <Text>{timeAgo(video.createdAt)}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                  );
                })}
                <Box
                  ref={loadMoreRef}
                  py="3"
                  display="flex"
                  justifyContent="center"
                >
                  {loadingMoreRec && <Spinner size="sm" color="blue.500" />}
                  {!hasMoreRec && recommended.length > 0 && (
                    <Text fontSize="xs" color="gray.400">
                      No more videos
                    </Text>
                  )}
                </Box>
              </>
            )}
          </VStack>
        </HStack>
      </Box>

      {/* Playlist modal */}
      <Modal isOpen={isPlaylistOpen} onClose={closePlaylist} size="sm">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="xl">
          <ModalHeader>Add to playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="4">
            <VStack align="stretch" spacing="2">
              {playlists.map((pl) => (
                <Button
                  key={pl._id}
                  variant="outline"
                  justifyContent="start"
                  size="sm"
                  onClick={() => handleAddToPlaylist(pl.name)}
                >
                  {pl.name} ({pl.videos?.length || 0} videos)
                </Button>
              ))}
              <Divider />
              <Text fontSize="sm" fontWeight="medium">
                New playlist
              </Text>
              <HStack>
                <Input
                  size="sm"
                  placeholder="Playlist name"
                  value={newPlaylist}
                  onChange={(e) => setNewPlaylist(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
                />
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={handleCreatePlaylist}
                >
                  Create
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default VideoPlayerUI;
