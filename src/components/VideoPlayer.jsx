// import React, { useState, useEffect, useRef, useCallback } from "react";
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
// import { RiDownload2Fill, RiPlayListAddLine } from "react-icons/ri";
// import {
//   MdNotificationsActive,
//   MdNotificationsNone,
//   MdDelete,
//   MdHistory,
// } from "react-icons/md";
// import { BiTime } from "react-icons/bi";
// import { useLocation, useNavigate } from "react-router-dom";
// import VideoPlayerDisplay from "./VideoPlayerDisplay";
// import {
//   getVideosApi,
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

// const VideoPlayerUI = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const toast = useToast();
//   const observerRef = useRef(null);
//   const loadMoreRef = useRef(null);
//   const {
//     isOpen: isPlaylistOpen,
//     onOpen: openPlaylist,
//     onClose: closePlaylist,
//   } = useDisclosure();

//   const {
//     title,
//     description,
//     views,
//     likes: initialLikes,
//     uploadDate,
//     category,
//     qualities = [],
//     metadata,
//     _id,
//   } = location.state || {};

//   // Auth
//   const [currentUser, setCurrentUser] = useState(null);

//   // Video interactions (backend-driven)
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const [likesCount, setLikesCount] = useState(initialLikes || 0);
//   const [saved, setSaved] = useState(false);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isNotified, setIsNotified] = useState(false);
//   const [subscriberCount, setSubscriberCount] = useState(0);
//   const [channelId, setChannelId] = useState(null);
//   const [channelInfo, setChannelInfo] = useState(null);
//   const [showDescription, setShowDescription] = useState(false);

//   // Comments
//   const [comments, setComments] = useState([]);
//   const [commentText, setCommentText] = useState("");
//   const [replyingTo, setReplyingTo] = useState(null);
//   const [replyText, setReplyText] = useState("");
//   const [commentSortBy, setCommentSortBy] = useState("newest");

//   // Playlists
//   const [playlists, setPlaylists] = useState([]);
//   const [newPlaylistName, setNewPlaylistName] = useState("");

//   // Recommended
//   const [allVideos, setAllVideos] = useState([]);
//   const [recommended, setRecommended] = useState([]);
//   const [recPage, setRecPage] = useState(1);
//   const [hasMoreRec, setHasMoreRec] = useState(true);
//   const [loadingRec, setLoadingRec] = useState(true);
//   const [loadingMoreRec, setLoadingMoreRec] = useState(false);
//   const PAGE_SIZE = 6;

//   // Load current user
//   useEffect(() => {
//     checkAuthApi().then(({ authenticated, user }) => {
//       if (authenticated) setCurrentUser(user);
//     });
//   }, []);

//   // Load video state from location (likedBy, dislikedBy, savedBy, etc.)
//   useEffect(() => {
//     const state = location.state || {};
//     if (currentUser && state.likedBy)
//       setLiked(state.likedBy.includes(currentUser._id));
//     if (currentUser && state.dislikedBy)
//       setDisliked(state.dislikedBy.includes(currentUser._id));
//     if (currentUser && state.savedBy)
//       setSaved(state.savedBy.includes(currentUser._id));
//     if (state.comments) setComments(state.comments);
//     if (state.user) {
//       setChannelId(state.user._id || state.user);
//       setChannelInfo(state.user);
//       setSubscriberCount(state.user.subscribers?.length || 0);
//       if (currentUser && state.user.subscribers) {
//         setIsSubscribed(state.user.subscribers.includes(currentUser._id));
//       }
//     }
//   }, [currentUser, location.state]);

//   // Load playlists
//   useEffect(() => {
//     if (currentUser?._id) {
//       getPlaylistsApi(currentUser._id)
//         .then((data) => setPlaylists(data.playlists || []))
//         .catch(() => {});
//     }
//   }, [currentUser]);

//   // Fetch recommended
//   useEffect(() => {
//     const fetch = async () => {
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
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoadingRec(false);
//       }
//     };
//     fetch();
//   }, [_id]);

//   // Infinite scroll for recommended
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
//           }, 600);
//         }
//       },
//       { threshold: 1.0 },
//     );
//     if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
//     return () => observerRef.current?.disconnect();
//   }, [loadingRec, loadingMoreRec, hasMoreRec, allVideos, recPage]);

//   const requireAuth = () => {
//     if (!currentUser) {
//       toast({ title: "Please sign in", status: "warning", duration: 2000 });
//       return false;
//     }
//     return true;
//   };

//   const formatNumber = (num) => {
//     if (!num) return "0";
//     if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
//     if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
//     return String(num);
//   };

//   const formatDate = (date) => {
//     if (!date) return "";
//     return new Date(date).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatDuration = (seconds) => {
//     if (!seconds) return "0:00";
//     const h = Math.floor(seconds / 3600);
//     const m = Math.floor((seconds % 3600) / 60);
//     const s = Math.floor(seconds % 60)
//       .toString()
//       .padStart(2, "0");
//     return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${s}` : `${m}:${s}`;
//   };

//   const getTimeAgo = (date) => {
//     if (!date) return "Recently";
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);
//     for (const [unit, s] of Object.entries({
//       year: 31536000,
//       month: 2592000,
//       week: 604800,
//       day: 86400,
//       hour: 3600,
//       minute: 60,
//     })) {
//       const i = Math.floor(seconds / s);
//       if (i >= 1) return `${i} ${unit}${i > 1 ? "s" : ""} ago`;
//     }
//     return "Just now";
//   };

//   // Like / Dislike
//   const handleLike = async () => {
//     if (!requireAuth()) return;
//     const action = liked ? "unlike" : "like";
//     setLiked(!liked);
//     if (!liked && disliked) setDisliked(false);
//     setLikesCount((c) => (liked ? c - 1 : c + 1));
//     try {
//       await likeVideoApi(_id, currentUser._id, action);
//     } catch {
//       setLiked(liked);
//       setLikesCount((c) => (liked ? c + 1 : c - 1));
//     }
//   };

//   const handleDislike = async () => {
//     if (!requireAuth()) return;
//     const action = disliked ? "undislike" : "dislike";
//     if (!disliked && liked) {
//       setLiked(false);
//       setLikesCount((c) => c - 1);
//     }
//     setDisliked(!disliked);
//     try {
//       await likeVideoApi(_id, currentUser._id, action);
//     } catch {
//       setDisliked(disliked);
//     }
//   };

//   // Save
//   const handleSave = async () => {
//     if (!requireAuth()) return;
//     setSaved(!saved);
//     try {
//       await saveVideoApi(_id, currentUser._id);
//       toast({
//         title: saved ? "Removed from saved" : "Saved!",
//         status: "success",
//         duration: 1500,
//       });
//     } catch {
//       setSaved(saved);
//     }
//   };

//   // Subscribe
//   const handleSubscribe = async () => {
//     if (!requireAuth()) return;
//     const prevSubscribed = isSubscribed;
//     setIsSubscribed(!isSubscribed);
//     setSubscriberCount((c) => (isSubscribed ? c - 1 : c + 1));
//     try {
//       await subscribeApi(channelId, currentUser._id);
//       toast({
//         title: isSubscribed ? "Unsubscribed" : "Subscribed!",
//         status: isSubscribed ? "info" : "success",
//         duration: 1500,
//       });
//     } catch {
//       setIsSubscribed(prevSubscribed);
//       setSubscriberCount((c) => (isSubscribed ? c + 1 : c - 1));
//     }
//   };

//   // Share
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

//   // Comment
//   const handleAddComment = async () => {
//     if (!requireAuth() || !commentText.trim()) return;
//     try {
//       const newComment = await addCommentApi(
//         _id,
//         currentUser._id,
//         commentText.trim(),
//       );
//       setComments((prev) => [{ ...newComment, user: currentUser }, ...prev]);
//       setCommentText("");
//     } catch {
//       toast({
//         title: "Failed to post comment",
//         status: "error",
//         duration: 2000,
//       });
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     if (!requireAuth()) return;
//     setComments((prev) => prev.filter((c) => c._id !== commentId));
//     try {
//       await deleteCommentApi(_id, commentId, currentUser._id);
//     } catch {
//       toast({ title: "Failed to delete", status: "error", duration: 2000 });
//     }
//   };

//   const handleReply = async (commentId) => {
//     if (!requireAuth() || !replyText.trim()) return;
//     try {
//       await replyCommentApi(_id, commentId, currentUser._id, replyText.trim());
//       setReplyingTo(null);
//       setReplyText("");
//       toast({ title: "Reply added", status: "success", duration: 1500 });
//     } catch {
//       toast({ title: "Failed to reply", status: "error", duration: 2000 });
//     }
//   };

//   const handleLikeComment = async (commentId) => {
//     if (!requireAuth()) return;
//     try {
//       const res = await likeCommentApi(_id, commentId, currentUser._id);
//       setComments((prev) =>
//         prev.map((c) => (c._id === commentId ? { ...c, likes: res.likes } : c)),
//       );
//     } catch {}
//   };

//   // Sorted comments
//   const sortedComments = [...comments].sort((a, b) => {
//     if (commentSortBy === "top") return (b.likes || 0) - (a.likes || 0);
//     return new Date(b.createdAt) - new Date(a.createdAt);
//   });

//   // Playlist
//   const handleAddToPlaylist = async (playlistName) => {
//     if (!requireAuth()) return;
//     try {
//       const data = await createOrAddToPlaylistApi(
//         currentUser._id,
//         playlistName,
//         _id,
//       );
//       setPlaylists(data.playlists);
//       toast({
//         title: `Added to "${playlistName}"`,
//         status: "success",
//         duration: 1500,
//       });
//       closePlaylist();
//     } catch {
//       toast({ title: "Failed", status: "error", duration: 2000 });
//     }
//   };

//   const handleCreatePlaylist = async () => {
//     if (!newPlaylistName.trim()) return;
//     await handleAddToPlaylist(newPlaylistName.trim());
//     setNewPlaylistName("");
//   };

//   const playRecommended = (video) => {
//     navigate("/VideoPlayer", {
//       state: {
//         videoUrl: video.videoUrl,
//         qualities: video.qualities,
//         metadata: video.metadata,
//         title: video.title,
//         description: video.description,
//         views: video.views,
//         likes: video.likes,
//         uploadDate: video.createdAt,
//         category: video.category,
//         _id: video._id,
//         user: video.user,
//         likedBy: video.likedBy,
//         dislikedBy: video.dislikedBy,
//         savedBy: video.savedBy,
//         comments: video.comments,
//       },
//     });
//     window.scrollTo(0, 0);
//   };

//   const RecSkeleton = () => (
//     <HStack align="start" spacing="2" p="2">
//       <Skeleton w="168px" h="94px" borderRadius="lg" flexShrink={0} />
//       <VStack align="start" spacing="2" flex="1">
//         <SkeletonText noOfLines={2} spacing="2" w="100%" />
//         <Skeleton h="10px" w="60%" />
//       </VStack>
//     </HStack>
//   );

//   return (
//     <Box bg="gray.50" minH="100vh" pb="80px">
//       <Box maxW="1920px" mx="auto">
//         <HStack align="start" spacing="4" p="4">
//           {/* ── Main Section ── */}
//           <VStack flex="1" align="stretch" spacing="4" maxW="1280px">
//             <VideoPlayerDisplay />

//             {/* Video Info */}
//             <VStack
//               align="stretch"
//               spacing="3"
//               bg="white"
//               p="4"
//               borderRadius="xl"
//               boxShadow="sm"
//             >
//               <Text fontSize="xl" fontWeight="bold" lineHeight="1.3">
//                 {title || "Untitled Video"}
//               </Text>

//               <HStack justify="space-between" wrap="wrap" spacing="2">
//                 <HStack
//                   spacing="3"
//                   fontSize="sm"
//                   color="gray.600"
//                   flexWrap="wrap"
//                 >
//                   <Text>{formatNumber(views)} views</Text>
//                   <Text>•</Text>
//                   <Text>{formatDate(uploadDate)}</Text>
//                   {category && (
//                     <>
//                       <Text>•</Text>
//                       <Text>{category}</Text>
//                     </>
//                   )}
//                 </HStack>

//                 <HStack spacing="2" flexWrap="wrap">
//                   {/* Like/Dislike */}
//                   <HStack
//                     bg="gray.100"
//                     borderRadius="full"
//                     overflow="hidden"
//                     divider={<Box w="1px" bg="gray.300" h="24px" />}
//                   >
//                     <Button
//                       variant="ghost"
//                       leftIcon={liked ? <AiFillLike /> : <AiOutlineLike />}
//                       size="sm"
//                       onClick={handleLike}
//                       color={liked ? "blue.500" : "gray.700"}
//                       borderRadius="full"
//                     >
//                       {formatNumber(likesCount)}
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       leftIcon={
//                         disliked ? <AiFillDislike /> : <AiOutlineDislike />
//                       }
//                       size="sm"
//                       onClick={handleDislike}
//                       color={disliked ? "red.500" : "gray.700"}
//                       borderRadius="full"
//                     >
//                       Dislike
//                     </Button>
//                   </HStack>

//                   <Button
//                     variant="outline"
//                     leftIcon={<FaRegShareSquare />}
//                     size="sm"
//                     borderRadius="full"
//                     onClick={handleShare}
//                   >
//                     Share
//                   </Button>
//                   <Button
//                     variant="outline"
//                     leftIcon={<RiDownload2Fill />}
//                     size="sm"
//                     borderRadius="full"
//                   >
//                     Download
//                   </Button>

//                   <IconButton
//                     icon={saved ? <BsBookmarkFill /> : <BsBookmark />}
//                     aria-label="Save"
//                     variant="outline"
//                     size="sm"
//                     borderRadius="full"
//                     onClick={handleSave}
//                     color={saved ? "blue.500" : "gray.700"}
//                   />

//                   <Menu>
//                     <MenuButton
//                       as={IconButton}
//                       icon={<BsThreeDots />}
//                       variant="ghost"
//                       size="sm"
//                       borderRadius="full"
//                     />
//                     <MenuList>
//                       <MenuItem
//                         icon={<RiPlayListAddLine />}
//                         onClick={openPlaylist}
//                       >
//                         Add to playlist
//                       </MenuItem>
//                       <MenuItem>Report</MenuItem>
//                     </MenuList>
//                   </Menu>
//                 </HStack>
//               </HStack>

//               <Divider />

//               {/* Channel Info — from backend */}
//               <HStack justify="space-between" align="start">
//                 <HStack spacing="3" flex="1">
//                   <Avatar
//                     size="md"
//                     src={channelInfo?.profilePicture}
//                     name={channelInfo?.username || "Creator"}
//                   />
//                   <VStack align="start" spacing="0">
//                     <Text fontWeight="bold" fontSize="md">
//                       {channelInfo?.username || "Creator"}
//                     </Text>
//                     <Text fontSize="sm" color="gray.600">
//                       {formatNumber(subscriberCount)} subscribers
//                     </Text>
//                   </VStack>
//                 </HStack>
//                 {channelId && currentUser?._id !== channelId && (
//                   <Button
//                     colorScheme={isSubscribed ? "gray" : "red"}
//                     size="md"
//                     borderRadius="full"
//                     onClick={handleSubscribe}
//                     leftIcon={
//                       isNotified ? (
//                         <MdNotificationsActive />
//                       ) : (
//                         <MdNotificationsNone />
//                       )
//                     }
//                     onMouseEnter={() => isSubscribed && setIsNotified(true)}
//                     onMouseLeave={() => setIsNotified(false)}
//                   >
//                     {isSubscribed ? "Subscribed" : "Subscribe"}
//                   </Button>
//                 )}
//               </HStack>

//               {/* Description */}
//               <Box
//                 bg="gray.50"
//                 p="3"
//                 borderRadius="lg"
//                 cursor="pointer"
//                 onClick={() => setShowDescription(!showDescription)}
//               >
//                 <Text
//                   fontSize="sm"
//                   color="gray.700"
//                   noOfLines={showDescription ? undefined : 2}
//                 >
//                   {description || "No description provided."}
//                   {showDescription && metadata && (
//                     <>
//                       {"\n\n"}📐 {metadata.width}x{metadata.height} • ⏱{" "}
//                       {formatDuration(metadata.duration)} • 🎬 {metadata.fps}{" "}
//                       fps
//                       {"\n"}🏷 Category: {category}
//                     </>
//                   )}
//                 </Text>
//                 <Text fontSize="sm" color="blue.500" fontWeight="medium" mt="1">
//                   {showDescription ? "Show less" : "Show more"}
//                 </Text>
//               </Box>
//             </VStack>

//             {/* Comments */}
//             <VStack
//               align="stretch"
//               spacing="4"
//               bg="white"
//               p="4"
//               borderRadius="xl"
//               boxShadow="sm"
//             >
//               <HStack justify="space-between">
//                 <Text fontWeight="bold" fontSize="lg">
//                   {formatNumber(comments.length)} Comments
//                 </Text>
//                 <Menu>
//                   <MenuButton
//                     as={Button}
//                     variant="ghost"
//                     size="sm"
//                     rightIcon={<BsThreeDots />}
//                   >
//                     Sort by
//                   </MenuButton>
//                   <MenuList>
//                     <MenuItem onClick={() => setCommentSortBy("newest")}>
//                       Newest first
//                     </MenuItem>
//                     <MenuItem onClick={() => setCommentSortBy("top")}>
//                       Top comments
//                     </MenuItem>
//                   </MenuList>
//                 </Menu>
//               </HStack>

//               {/* Add comment */}
//               <HStack align="start" spacing="3">
//                 <Avatar
//                   size="sm"
//                   src={currentUser?.profilePicture}
//                   name={currentUser?.username || "You"}
//                 />
//                 <VStack flex="1" align="stretch" spacing="2">
//                   <Textarea
//                     placeholder="Add a comment..."
//                     value={commentText}
//                     onChange={(e) => setCommentText(e.target.value)}
//                     size="sm"
//                     resize="none"
//                     rows={2}
//                     borderRadius="lg"
//                   />
//                   {commentText && (
//                     <HStack justify="end">
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         onClick={() => setCommentText("")}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         size="sm"
//                         colorScheme="blue"
//                         borderRadius="full"
//                         onClick={handleAddComment}
//                       >
//                         Comment
//                       </Button>
//                     </HStack>
//                   )}
//                 </VStack>
//               </HStack>

//               <Divider />

//               {/* Comment list */}
//               <VStack align="stretch" spacing="4">
//                 {sortedComments.map((c) => (
//                   <Box key={c._id || c.id}>
//                     <HStack align="start" spacing="3">
//                       <Avatar
//                         size="sm"
//                         src={c.user?.profilePicture}
//                         name={c.user?.username || "User"}
//                       />
//                       <VStack align="start" spacing="1" flex="1">
//                         <HStack spacing="2" justify="space-between" w="100%">
//                           <HStack>
//                             <Text fontWeight="semibold" fontSize="sm">
//                               {c.user?.username || "User"}
//                             </Text>
//                             <Text fontSize="xs" color="gray.500">
//                               {getTimeAgo(c.createdAt)}
//                             </Text>
//                           </HStack>
//                           {currentUser &&
//                             (c.user?._id === currentUser._id ||
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
//                         <Text fontSize="sm" color="gray.700">
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
//                             <Text fontSize="xs" color="gray.600">
//                               {c.likes || 0}
//                             </Text>
//                           </HStack>
//                           <Button
//                             size="xs"
//                             variant="ghost"
//                             leftIcon={<BsReply />}
//                             onClick={() =>
//                               setReplyingTo(replyingTo === c._id ? null : c._id)
//                             }
//                           >
//                             Reply
//                           </Button>
//                         </HStack>

//                         {/* Reply input */}
//                         {replyingTo === c._id && (
//                           <HStack align="start" spacing="2" mt="2" w="100%">
//                             <Avatar
//                               size="xs"
//                               src={currentUser?.profilePicture}
//                               name={currentUser?.username}
//                             />
//                             <VStack flex="1" align="stretch" spacing="1">
//                               <Textarea
//                                 placeholder="Write a reply..."
//                                 value={replyText}
//                                 onChange={(e) => setReplyText(e.target.value)}
//                                 size="xs"
//                                 resize="none"
//                                 rows={2}
//                                 borderRadius="md"
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
//                                   colorScheme="blue"
//                                   onClick={() => handleReply(c._id)}
//                                 >
//                                   Reply
//                                 </Button>
//                               </HStack>
//                             </VStack>
//                           </HStack>
//                         )}

//                         {/* Replies */}
//                         {c.replies?.length > 0 && (
//                           <VStack
//                             align="stretch"
//                             spacing="2"
//                             mt="2"
//                             pl="4"
//                             borderLeft="2px"
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
//                                   <HStack spacing="2">
//                                     <Text fontWeight="semibold" fontSize="xs">
//                                       {r.user?.username}
//                                     </Text>
//                                     <Text fontSize="xs" color="gray.400">
//                                       {getTimeAgo(r.createdAt)}
//                                     </Text>
//                                   </HStack>
//                                   <Text fontSize="xs" color="gray.700">
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
//                 ))}
//               </VStack>
//             </VStack>
//           </VStack>

//           {/* ── Recommended Sidebar ── */}
//           <VStack
//             w="400px"
//             align="stretch"
//             spacing="0"
//             display={{ base: "none", xl: "flex" }}
//             maxH="calc(100vh - 80px)"
//             overflowY="auto"
//             css={{
//               "&::-webkit-scrollbar": { width: "4px" },
//               "&::-webkit-scrollbar-thumb": {
//                 background: "#cbd5e0",
//                 borderRadius: "3px",
//               },
//             }}
//           >
//             <Text fontWeight="bold" fontSize="md" p="2" pb="3">
//               Up Next
//             </Text>

//             {loadingRec ? (
//               [...Array(5)].map((_, i) => <RecSkeleton key={i} />)
//             ) : (
//               <>
//                 {recommended.map((video, index) => (
//                   <HStack
//                     key={video._id || index}
//                     align="start"
//                     spacing="2"
//                     p="2"
//                     borderRadius="lg"
//                     cursor="pointer"
//                     _hover={{ bg: "gray.100" }}
//                     transition="all 0.2s"
//                     onClick={() => playRecommended(video)}
//                   >
//                     <Box
//                       position="relative"
//                       w="168px"
//                       h="94px"
//                       bg="gray.200"
//                       borderRadius="lg"
//                       overflow="hidden"
//                       flexShrink={0}
//                     >
//                       <Image
//                         src={video.thumbnailUrl}
//                         alt={video.title}
//                         w="100%"
//                         h="100%"
//                         objectFit="cover"
//                         loading="lazy"
//                       />
//                       <Badge
//                         position="absolute"
//                         bottom="1"
//                         right="1"
//                         bg="blackAlpha.800"
//                         color="white"
//                         fontSize="10px"
//                         borderRadius="sm"
//                         px="1"
//                       >
//                         {formatDuration(video.metadata?.duration)}
//                       </Badge>
//                     </Box>
//                     <VStack align="start" spacing="1" flex="1" minW={0}>
//                       <Text
//                         fontSize="sm"
//                         fontWeight="semibold"
//                         noOfLines={2}
//                         lineHeight="1.3"
//                       >
//                         {video.title}
//                       </Text>
//                       <Text fontSize="xs" color="gray.500">
//                         {video.user?.username || "Unknown"}
//                       </Text>
//                       <HStack spacing="1" fontSize="xs" color="gray.400">
//                         <Text>{formatNumber(video.views)} views</Text>
//                         <Text>•</Text>
//                         <Text>{getTimeAgo(video.createdAt)}</Text>
//                       </HStack>
//                     </VStack>
//                   </HStack>
//                 ))}

//                 <Box
//                   ref={loadMoreRef}
//                   py="3"
//                   display="flex"
//                   justifyContent="center"
//                 >
//                   {loadingMoreRec && <Spinner size="sm" color="blue.500" />}
//                   {!hasMoreRec && recommended.length > 0 && (
//                     <Text fontSize="xs" color="gray.400">
//                       No more videos
//                     </Text>
//                   )}
//                 </Box>
//               </>
//             )}
//           </VStack>
//         </HStack>
//       </Box>

//       {/* Playlist Modal */}
//       <Modal isOpen={isPlaylistOpen} onClose={closePlaylist} size="sm">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add to playlist</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb="4">
//             <VStack align="stretch" spacing="2">
//               {playlists.map((pl) => (
//                 <Button
//                   key={pl._id}
//                   variant="outline"
//                   justifyContent="start"
//                   size="sm"
//                   onClick={() => handleAddToPlaylist(pl.name)}
//                 >
//                   {pl.name} ({pl.videos?.length || 0} videos)
//                 </Button>
//               ))}
//               <Divider />
//               <Text fontSize="sm" fontWeight="medium">
//                 Create new playlist
//               </Text>
//               <HStack>
//                 <Input
//                   size="sm"
//                   placeholder="Playlist name"
//                   value={newPlaylistName}
//                   onChange={(e) => setNewPlaylistName(e.target.value)}
//                 />
//                 <Button
//                   size="sm"
//                   colorScheme="blue"
//                   onClick={handleCreatePlaylist}
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