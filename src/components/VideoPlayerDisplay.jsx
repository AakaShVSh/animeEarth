// import {
//   Box,
//   HStack,
//   IconButton,
//   Slider,
//   SliderTrack,
//   SliderFilledTrack,
//   SliderThumb,
//   Text,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   VStack,
//   Badge,
//   Tooltip,
//   useToast,
// } from "@chakra-ui/react";
// import React, { useRef, useState, useEffect } from "react";
// import {
//   FaBackward,
//   FaCompress,
//   FaExpand,
//   FaForward,
//   FaPause,
//   FaPlay,
//   FaVolumeMute,
//   FaVolumeUp,
//   FaVolumeDown,
//   FaCog,
//   FaDownload,
//   FaClosedCaptioning,
//   FaShareAlt,
//   FaEllipsisV,
// } from "react-icons/fa";
// import { MdPictureInPicture, MdSpeed, MdHighQuality } from "react-icons/md";
// import { useLocation, useSearchParams } from "react-router-dom";

// const VideoPlayerDisplay = () => {
//   const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const { videoUrl, qualities = [], metadata } = location.state || {};

//   const videoRef = useRef(null);
//   const containerRef = useRef(null);
//   const controlsTimeoutRef = useRef(null);
//   const toast = useToast();

//   const [isPlaying, setIsPlaying] = useState(true);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [volume, setVolume] = useState(100);
//   const [previousVolume, setPreviousVolume] = useState(100);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState(metadata?.duration || 0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [showControls, setShowControls] = useState(true);
//   const [isHovering, setIsHovering] = useState(false);
//   const [isBuffering, setIsBuffering] = useState(false);
//   const [playbackSpeed, setPlaybackSpeed] = useState(1);
//   const [isPiPActive, setIsPiPActive] = useState(false);
//   const [showCaptions, setShowCaptions] = useState(false);

//   const qualityOptions = [
//     { label: "Auto", url: videoUrl },
//     ...qualities.map((q) => ({ label: q.quality, url: q.url })),
//   ];
//   const [selectedQuality, setSelectedQuality] = useState(qualityOptions[0]);
//   const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (!videoRef.current) return;
//       if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
//       switch (e.key.toLowerCase()) {
//         case " ":
//         case "k":
//           e.preventDefault();
//           handlePlayPause();
//           break;
//         case "f":
//           e.preventDefault();
//           handleFullScreenToggle();
//           break;
//         case "m":
//           e.preventDefault();
//           handleVolumeMuteToggle();
//           break;
//         case "arrowleft":
//         case "j":
//           e.preventDefault();
//           videoRef.current.currentTime -= 10;
//           break;
//         case "arrowright":
//         case "l":
//           e.preventDefault();
//           videoRef.current.currentTime += 10;
//           break;
//         case "arrowup":
//           e.preventDefault();
//           handleVolumeChange(Math.min(100, volume + 10));
//           break;
//         case "arrowdown":
//           e.preventDefault();
//           handleVolumeChange(Math.max(0, volume - 10));
//           break;
//         default:
//           if (e.key >= "1" && e.key <= "9") {
//             e.preventDefault();
//             videoRef.current.currentTime =
//               (duration * parseInt(e.key) * 10) / 100;
//           }
//       }
//     };
//     window.addEventListener("keydown", handleKeyPress);
//     return () => window.removeEventListener("keydown", handleKeyPress);
//   }, [volume, duration]);

//   useEffect(() => {
//     if (isPlaying && !isHovering) {
//       controlsTimeoutRef.current = setTimeout(
//         () => setShowControls(false),
//         3000,
//       );
//     } else {
//       setShowControls(true);
//     }
//     return () => {
//       if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
//     };
//   }, [isPlaying, isHovering]);

//   useEffect(() => {
//     const updateProgress = () => {
//       if (videoRef.current) {
//         setCurrentTime(videoRef.current.currentTime);
//         setProgress(
//           (videoRef.current.currentTime / videoRef.current.duration) * 100,
//         );
//       }
//     };
//     const handleWaiting = () => setIsBuffering(true);
//     const handleCanPlay = () => setIsBuffering(false);
//     const handleEnded = () => setIsPlaying(false);
//     const video = videoRef.current;
//     video?.addEventListener("timeupdate", updateProgress);
//     video?.addEventListener("waiting", handleWaiting);
//     video?.addEventListener("canplay", handleCanPlay);
//     video?.addEventListener("ended", handleEnded);
//     return () => {
//       video?.removeEventListener("timeupdate", updateProgress);
//       video?.removeEventListener("waiting", handleWaiting);
//       video?.removeEventListener("canplay", handleCanPlay);
//       video?.removeEventListener("ended", handleEnded);
//     };
//   }, []);

//   useEffect(() => {
//     const handleFs = () => {
//       if (!document.fullscreenElement) setIsFullScreen(false);
//     };
//     const handlePiP = () =>
//       setIsPiPActive(document.pictureInPictureElement !== null);
//     document.addEventListener("fullscreenchange", handleFs);
//     document.addEventListener("enterpictureinpicture", handlePiP);
//     document.addEventListener("leavepictureinpicture", handlePiP);
//     return () => {
//       document.removeEventListener("fullscreenchange", handleFs);
//       document.removeEventListener("enterpictureinpicture", handlePiP);
//       document.removeEventListener("leavepictureinpicture", handlePiP);
//     };
//   }, []);

//   useEffect(() => {
//     if (videoRef.current)
//       videoRef.current.onloadedmetadata = () =>
//         setDuration(videoRef.current.duration);
//   }, []);

//   const handlePlayPause = () => {
//     if (!videoRef.current) return;
//     if (isPlaying) videoRef.current.pause();
//     else videoRef.current.play();
//     setIsPlaying(!isPlaying);
//   };

//   const handleFullScreenToggle = () => {
//     if (isFullScreen) document.exitFullscreen?.();
//     else containerRef.current?.requestFullscreen?.();
//     setIsFullScreen(!isFullScreen);
//   };

//   const handleVolumeChange = (value) => {
//     if (videoRef.current) videoRef.current.volume = value / 100;
//     setVolume(value);
//     if (value > 0) setPreviousVolume(value);
//   };

//   const handleVolumeMuteToggle = () => {
//     if (volume > 0) {
//       setPreviousVolume(volume);
//       handleVolumeChange(0);
//     } else handleVolumeChange(previousVolume);
//   };

//   const handleProgressChange = (value) => {
//     if (videoRef.current) {
//       videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
//       setProgress(value);
//     }
//   };

//   const handleSpeedChange = (speed) => {
//     if (videoRef.current) videoRef.current.playbackRate = speed;
//     setPlaybackSpeed(speed);
//     showToast(`Speed: ${speed}x`);
//   };

//   const handleQualityChange = (opt) => {
//     const t = videoRef.current?.currentTime || 0;
//     const was = isPlaying;
//     setSelectedQuality(opt);
//     setTimeout(() => {
//       if (videoRef.current) {
//         videoRef.current.currentTime = t;
//         if (was) videoRef.current.play();
//       }
//     }, 300);
//     showToast(`Quality: ${opt.label}`);
//   };

//   const handlePictureInPicture = async () => {
//     try {
//       if (document.pictureInPictureElement)
//         await document.exitPictureInPicture();
//       else if (videoRef.current)
//         await videoRef.current.requestPictureInPicture();
//     } catch {}
//   };

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = selectedQuality.url || videoUrl;
//     link.download = `video_${Date.now()}.mp4`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     showToast("📥 Download started");
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "Check out this video!",
//           url: window.location.href,
//         });
//       } catch {}
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       showToast("🔗 Link copied");
//     }
//   };

//   const showToast = (message) => {
//     toast({
//       description: message,
//       duration: 1000,
//       isClosable: false,
//       position: "top",
//       status: "info",
//       variant: "solid",
//     });
//   };

//   const formatTime = (time) => {
//     if (isNaN(time)) return "0:00";
//     const h = Math.floor(time / 3600),
//       m = Math.floor((time % 3600) / 60),
//       s = Math.floor(time % 60)
//         .toString()
//         .padStart(2, "0");
//     return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${s}` : `${m}:${s}`;
//   };

//   const getVolumeIcon = () => {
//     if (volume === 0) return <FaVolumeMute />;
//     if (volume < 50) return <FaVolumeDown />;
//     return <FaVolumeUp />;
//   };

//   if (!videoUrl) {
//     return (
//       <Box
//         bg="gray.900"
//         h={{ base: "330px", md: "560px" }}
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         borderRadius="xl"
//       >
//         <Text color="white" fontSize="lg">
//           No video available.
//         </Text>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       ref={containerRef}
//       bg="black"
//       h={{
//         base: isFullScreen ? "100vh" : "330px",
//         md: isFullScreen ? "100vh" : "560px",
//       }}
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       position="relative"
//       overflow="hidden"
//       w="100%"
//       borderRadius={isFullScreen ? "none" : "xl"}
//       boxShadow={isFullScreen ? "none" : "2xl"}
//       onMouseMove={() => {
//         setIsHovering(true);
//         setShowControls(true);
//       }}
//       onMouseLeave={() => setIsHovering(false)}
//       cursor={showControls ? "default" : "none"}
//     >
//       <video
//         ref={videoRef}
//         src={selectedQuality.url}
//         style={{ width: "100%", height: "100%", objectFit: "contain" }}
//         autoPlay
//         controls={false}
//         onClick={handlePlayPause}
//       />

//       {isBuffering && (
//         <Box
//           position="absolute"
//           top="50%"
//           left="50%"
//           transform="translate(-50%,-50%)"
//           pointerEvents="none"
//         >
//           <Box
//             border="4px solid rgba(255,255,255,0.2)"
//             borderTop="4px solid white"
//             borderRadius="50%"
//             width="60px"
//             height="60px"
//             animation="spin 0.8s linear infinite"
//           />
//         </Box>
//       )}

//       {!isPlaying && !isBuffering && (
//         <Box
//           position="absolute"
//           top="50%"
//           left="50%"
//           transform="translate(-50%,-50%)"
//           onClick={handlePlayPause}
//           cursor="pointer"
//           bg="rgba(0,0,0,0.6)"
//           borderRadius="full"
//           p={8}
//           border="3px solid rgba(255,255,255,0.3)"
//           _hover={{
//             bg: "rgba(0,0,0,0.8)",
//             transform: "translate(-50%,-50%) scale(1.1)",
//           }}
//           transition="all 0.3s"
//         >
//           <Box as={FaPlay} color="white" fontSize="5xl" ml={2} />
//         </Box>
//       )}

//       {/* Top bar */}
//       <Box
//         position="absolute"
//         top="0"
//         width="100%"
//         opacity={showControls ? 1 : 0}
//         transition="opacity 0.3s"
//         pointerEvents={showControls ? "auto" : "none"}
//         background="linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)"
//         p={4}
//       >
//         <HStack justifyContent="space-between">
//           <HStack spacing={2}>
//             {playbackSpeed !== 1 && (
//               <Badge
//                 colorScheme="red"
//                 fontSize="xs"
//                 px={2}
//                 py={1}
//                 borderRadius="md"
//               >
//                 {playbackSpeed}x
//               </Badge>
//             )}
//             {isPiPActive && (
//               <Badge
//                 colorScheme="blue"
//                 fontSize="xs"
//                 px={2}
//                 py={1}
//                 borderRadius="md"
//               >
//                 PiP
//               </Badge>
//             )}
//           </HStack>
//           <HStack spacing={2}>
//             <Badge
//               colorScheme="purple"
//               fontSize="xs"
//               px={2}
//               py={1}
//               borderRadius="md"
//             >
//               {selectedQuality.label}
//             </Badge>
//             <Menu>
//               <MenuButton
//                 as={IconButton}
//                 icon={<FaEllipsisV />}
//                 variant="ghost"
//                 colorScheme="whiteAlpha"
//                 color="white"
//                 size="sm"
//                 _hover={{ bg: "rgba(255,255,255,0.2)" }}
//               />
//               <MenuList bg="gray.900" borderColor="gray.700">
//                 <MenuItem
//                   icon={<FaDownload />}
//                   onClick={handleDownload}
//                   _hover={{ bg: "gray.800" }}
//                   color="white"
//                 >
//                   Download
//                 </MenuItem>
//                 <MenuItem
//                   icon={<FaShareAlt />}
//                   onClick={handleShare}
//                   _hover={{ bg: "gray.800" }}
//                   color="white"
//                 >
//                   Share
//                 </MenuItem>
//                 <MenuItem
//                   icon={<MdPictureInPicture />}
//                   onClick={handlePictureInPicture}
//                   _hover={{ bg: "gray.800" }}
//                   color="white"
//                 >
//                   Picture in Picture
//                 </MenuItem>
//               </MenuList>
//             </Menu>
//           </HStack>
//         </HStack>
//       </Box>

//       {/* Bottom controls */}
//       <Box
//         position="absolute"
//         bottom="0"
//         width="100%"
//         opacity={showControls ? 1 : 0}
//         transition="opacity 0.3s"
//         pointerEvents={showControls ? "auto" : "none"}
//         background="linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)"
//         pb={4}
//         pt={12}
//       >
//         <Box px={6} mb={3}>
//           <Slider
//             aria-label="Progress"
//             value={progress}
//             onChange={handleProgressChange}
//             min={0}
//             max={100}
//             step={0.1}
//             focusThumbOnChange={false}
//           >
//             <SliderTrack bg="rgba(255,255,255,0.2)" height="5px">
//               <SliderFilledTrack bg="red.500" />
//             </SliderTrack>
//             <SliderThumb boxSize="16px" bg="red.500" />
//           </Slider>
//         </Box>

//         <HStack
//           spacing={{ base: 2, md: 4 }}
//           justifyContent="space-between"
//           alignItems="center"
//           px={6}
//         >
//           <HStack spacing={{ base: 2, md: 3 }}>
//             <Tooltip label={isPlaying ? "Pause (K)" : "Play (K)"} fontSize="xs">
//               <IconButton
//                 icon={isPlaying ? <FaPause /> : <FaPlay />}
//                 aria-label="Play/Pause"
//                 onClick={handlePlayPause}
//                 variant="ghost"
//                 colorScheme="whiteAlpha"
//                 color="white"
//                 size={{ base: "sm", md: "md" }}
//                 _hover={{ bg: "rgba(255,255,255,0.2)" }}
//               />
//             </Tooltip>
//             <Tooltip label="Rewind 10s" fontSize="xs">
//               <IconButton
//                 icon={<FaBackward />}
//                 aria-label="Rewind"
//                 onClick={() =>
//                   videoRef.current && (videoRef.current.currentTime -= 10)
//                 }
//                 variant="ghost"
//                 colorScheme="whiteAlpha"
//                 color="white"
//                 size={{ base: "sm", md: "md" }}
//                 _hover={{ bg: "rgba(255,255,255,0.2)" }}
//               />
//             </Tooltip>
//             <Tooltip label="Forward 10s" fontSize="xs">
//               <IconButton
//                 icon={<FaForward />}
//                 aria-label="Forward"
//                 onClick={() =>
//                   videoRef.current && (videoRef.current.currentTime += 10)
//                 }
//                 variant="ghost"
//                 colorScheme="whiteAlpha"
//                 color="white"
//                 size={{ base: "sm", md: "md" }}
//                 _hover={{ bg: "rgba(255,255,255,0.2)" }}
//               />
//             </Tooltip>
//             <HStack
//               spacing={2}
//               display={{ base: "none", md: "flex" }}
//               bg="rgba(255,255,255,0.1)"
//               px={3}
//               py={1}
//               borderRadius="full"
//             >
//               <IconButton
//                 icon={getVolumeIcon()}
//                 aria-label="Mute"
//                 onClick={handleVolumeMuteToggle}
//                 variant="ghost"
//                 colorScheme="whiteAlpha"
//                 color="white"
//                 size="sm"
//                 minW="auto"
//                 _hover={{ bg: "transparent" }}
//               />
//               <Slider
//                 aria-label="Volume"
//                 value={volume}
//                 onChange={handleVolumeChange}
//                 min={0}
//                 max={100}
//                 step={1}
//                 width="90px"
//                 focusThumbOnChange={false}
//               >
//                 <SliderTrack bg="rgba(255,255,255,0.3)" height="3px">
//                   <SliderFilledTrack bg="white" />
//                 </SliderTrack>
//                 <SliderThumb boxSize="12px" bg="white" />
//               </Slider>
//             </HStack>
//             <Text
//               color="white"
//               fontSize={{ base: "xs", md: "sm" }}
//               fontWeight="medium"
//               display={{ base: "none", sm: "block" }}
//             >
//               {formatTime(currentTime)} / {formatTime(duration)}
//             </Text>
//           </HStack>

//           <HStack spacing={{ base: 1, md: 2 }}>
//             <Tooltip label="Captions" fontSize="xs">
//               <IconButton
//                 icon={<FaClosedCaptioning />}
//                 aria-label="Captions"
//                 onClick={() => {
//                   setShowCaptions(!showCaptions);
//                   showToast(showCaptions ? "Captions OFF" : "Captions ON");
//                 }}
//                 variant="ghost"
//                 colorScheme="whiteAlpha"
//                 color={showCaptions ? "red.400" : "white"}
//                 size={{ base: "sm", md: "md" }}
//                 display={{ base: "none", md: "flex" }}
//                 _hover={{ bg: "rgba(255,255,255,0.2)" }}
//               />
//             </Tooltip>
//             <Menu>
//               <Tooltip label="Speed" fontSize="xs">
//                 <MenuButton
//                   as={IconButton}
//                   icon={<MdSpeed />}
//                   variant="ghost"
//                   colorScheme="whiteAlpha"
//                   color="white"
//                   size={{ base: "sm", md: "md" }}
//                   _hover={{ bg: "rgba(255,255,255,0.2)" }}
//                 />
//               </Tooltip>
//               <MenuList bg="gray.900" borderColor="gray.700" minW="120px">
//                 {speedOptions.map((s) => (
//                   <MenuItem
//                     key={s}
//                     onClick={() => handleSpeedChange(s)}
//                     bg={playbackSpeed === s ? "gray.800" : "transparent"}
//                     _hover={{ bg: "gray.800" }}
//                     color="white"
//                     justifyContent="space-between"
//                   >
//                     <Text>{s}x</Text>
//                     {s === 1 && (
//                       <Badge colorScheme="gray" ml={2} fontSize="xs">
//                         Normal
//                       </Badge>
//                     )}
//                   </MenuItem>
//                 ))}
//               </MenuList>
//             </Menu>
//             <Menu>
//               <Tooltip label="Quality" fontSize="xs">
//                 <MenuButton
//                   as={IconButton}
//                   icon={<MdHighQuality />}
//                   variant="ghost"
//                   colorScheme="whiteAlpha"
//                   color="white"
//                   size={{ base: "sm", md: "md" }}
//                   _hover={{ bg: "rgba(255,255,255,0.2)" }}
//                 />
//               </Tooltip>
//               <MenuList bg="gray.900" borderColor="gray.700" minW="140px">
//                 {qualityOptions.map((opt) => (
//                   <MenuItem
//                     key={opt.label}
//                     onClick={() => handleQualityChange(opt)}
//                     bg={
//                       selectedQuality.label === opt.label
//                         ? "gray.800"
//                         : "transparent"
//                     }
//                     _hover={{ bg: "gray.800" }}
//                     color="white"
//                     justifyContent="space-between"
//                   >
//                     <Text>{opt.label}</Text>
//                     {opt.label === "Auto" && (
//                       <Badge colorScheme="purple" ml={2} fontSize="xs">
//                         HD
//                       </Badge>
//                     )}
//                   </MenuItem>
//                 ))}
//               </MenuList>
//             </Menu>
//             <IconButton
//               icon={getVolumeIcon()}
//               aria-label="Volume"
//               onClick={handleVolumeMuteToggle}
//               variant="ghost"
//               colorScheme="whiteAlpha"
//               color="white"
//               size={{ base: "sm", md: "md" }}
//               display={{ base: "flex", md: "none" }}
//               _hover={{ bg: "rgba(255,255,255,0.2)" }}
//             />
//             <Menu>
//               <Tooltip label="Settings" fontSize="xs">
//                 <MenuButton
//                   as={IconButton}
//                   icon={<FaCog />}
//                   variant="ghost"
//                   colorScheme="whiteAlpha"
//                   color="white"
//                   size={{ base: "sm", md: "md" }}
//                   display={{ base: "none", md: "flex" }}
//                   _hover={{ bg: "rgba(255,255,255,0.2)" }}
//                 />
//               </Tooltip>
//               <MenuList bg="gray.900" borderColor="gray.700">
//                 <MenuItem
//                   _hover={{ bg: "gray.800" }}
//                   color="white"
//                   justifyContent="space-between"
//                 >
//                   <Text>Autoplay</Text>
//                   <Badge colorScheme="green">ON</Badge>
//                 </MenuItem>
//               </MenuList>
//             </Menu>
//             <Tooltip label="Fullscreen (F)" fontSize="xs">
//               <IconButton
//                 icon={isFullScreen ? <FaCompress /> : <FaExpand />}
//                 aria-label="Fullscreen"
//                 onClick={handleFullScreenToggle}
//                 variant="ghost"
//                 colorScheme="whiteAlpha"
//                 color="white"
//                 size={{ base: "sm", md: "md" }}
//                 _hover={{ bg: "rgba(255,255,255,0.2)" }}
//               />
//             </Tooltip>
//           </HStack>
//         </HStack>
//       </Box>

//       <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
//     </Box>
//   );
// };

// export default VideoPlayerDisplay;










import {
  Box,
  HStack,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Badge,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import {
  FaBackward,
  FaCompress,
  FaExpand,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeMute,
  FaVolumeUp,
  FaVolumeDown,
  FaCog,
  FaDownload,
  FaClosedCaptioning,
  FaShareAlt,
  FaEllipsisV,
  FaTh,
} from "react-icons/fa";
import { MdPictureInPicture, MdSpeed, MdHighQuality } from "react-icons/md";
import { useLocation } from "react-router-dom";

const VideoPlayerDisplay = () => {
  const location = useLocation();
  const { videoUrl, qualities = [], metadata } = location.state || {};

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const toast = useToast();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(100);
  const [previousVolume, setPreviousVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(metadata?.duration || 0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPiPActive, setIsPiPActive] = useState(false);
  const [showCaptions, setShowCaptions] = useState(false);

  // Build quality options from the qualities array + Auto
  const qualityOptions = [
    { label: "Auto", url: videoUrl },
    ...qualities.map((q) => ({ label: q.quality, url: q.url })),
  ];
  const [selectedQuality, setSelectedQuality] = useState(qualityOptions[0]);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!videoRef.current) return;
      switch (e.key.toLowerCase()) {
        case " ":
        case "k":
          e.preventDefault();
          handlePlayPause();
          break;
        case "f":
          e.preventDefault();
          handleFullScreenToggle();
          break;
        case "m":
          e.preventDefault();
          handleVolumeMuteToggle();
          break;
        case "arrowleft":
          e.preventDefault();
          videoRef.current.currentTime -= 10;
          break;
        case "arrowright":
          e.preventDefault();
          videoRef.current.currentTime += 10;
          break;
        case "arrowup":
          e.preventDefault();
          handleVolumeChange(Math.min(100, volume + 10));
          break;
        case "arrowdown":
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 10));
          break;
        case "j":
          e.preventDefault();
          videoRef.current.currentTime -= 10;
          break;
        case "l":
          e.preventDefault();
          videoRef.current.currentTime += 10;
          break;
        default:
          if (e.key >= "1" && e.key <= "9") {
            e.preventDefault();
            videoRef.current.currentTime =
              (duration * parseInt(e.key) * 10) / 100;
          }
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [volume, duration]);

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying && !isHovering) {
      controlsTimeoutRef.current = setTimeout(
        () => setShowControls(false),
        3000,
      );
    } else {
      setShowControls(true);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying, isHovering]);

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        setProgress(
          (videoRef.current.currentTime / videoRef.current.duration) * 100,
        );
      }
    };
    const handleWaiting = () => setIsBuffering(true);
    const handleCanPlay = () => setIsBuffering(false);
    const handleEnded = () => setIsPlaying(false);
    const video = videoRef.current;
    video?.addEventListener("timeupdate", updateProgress);
    video?.addEventListener("waiting", handleWaiting);
    video?.addEventListener("canplay", handleCanPlay);
    video?.addEventListener("ended", handleEnded);
    return () => {
      video?.removeEventListener("timeupdate", updateProgress);
      video?.removeEventListener("waiting", handleWaiting);
      video?.removeEventListener("canplay", handleCanPlay);
      video?.removeEventListener("ended", handleEnded);
    };
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) setIsFullScreen(false);
    };
    const handlePiPChange = () =>
      setIsPiPActive(document.pictureInPictureElement !== null);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("enterpictureinpicture", handlePiPChange);
    document.addEventListener("leavepictureinpicture", handlePiPChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("enterpictureinpicture", handlePiPChange);
      document.removeEventListener("leavepictureinpicture", handlePiPChange);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current.duration);
      };
    }
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
      showToast("⏪ -10s");
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
      showToast("⏩ +10s");
    }
  };

  const handleFullScreenToggle = () => {
    if (isFullScreen) {
      document.exitFullscreen?.();
    } else {
      containerRef.current?.requestFullscreen?.();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleVolumeChange = (value) => {
    if (videoRef.current) videoRef.current.volume = value / 100;
    setVolume(value);
    if (value > 0) setPreviousVolume(value);
  };

  const handleVolumeMuteToggle = () => {
    if (volume > 0) {
      setPreviousVolume(volume);
      handleVolumeChange(0);
    } else {
      handleVolumeChange(previousVolume);
    }
  };

  const handleProgressChange = (value) => {
    if (videoRef.current) {
      videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
      setProgress(value);
    }
  };

  const handleSpeedChange = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      showToast(`Speed: ${speed}x`);
    }
  };

  const handleQualityChange = (qualityOption) => {
    const currentTime = videoRef.current?.currentTime || 0;
    const wasPlaying = isPlaying;
    setSelectedQuality(qualityOption);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
        if (wasPlaying) videoRef.current.play();
      }
    }, 300);
    showToast(`Quality: ${qualityOption.label}`);
  };

  const handlePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error("PiP error:", error);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = selectedQuality.url || videoUrl;
    link.download = `video_${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("📥 Download started");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this video!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("🔗 Link copied to clipboard");
    }
  };

  const showToast = (message) => {
    toast({
      description: message,
      duration: 1000,
      isClosable: false,
      position: "top",
      status: "info",
      variant: "solid",
    });
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}`
      : `${minutes}:${seconds}`;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <FaVolumeMute />;
    if (volume < 50) return <FaVolumeDown />;
    return <FaVolumeUp />;
  };

  if (!videoUrl) {
    return (
      <Box
        bg="gray.900"
        h={{ base: "330px", md: "620px" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="xl"
      >
        <Text color="white" fontSize="lg">
          No video available to play.
        </Text>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      bg="black"
      h={{
        base: isFullScreen ? "100vh" : "330px",
        md: isFullScreen ? "100vh" : "620px",
      }}
      mb={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
      w="100%"
      borderRadius={isFullScreen ? "none" : "xl"}
      boxShadow={isFullScreen ? "none" : "2xl"}
      onMouseMove={() => {
        setIsHovering(true);
        setShowControls(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
      cursor={showControls ? "default" : "none"}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={selectedQuality.url}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        autoPlay
        controls={false}
        onClick={handlePlayPause}
      />

      {/* Buffering Spinner */}
      {isBuffering && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          pointerEvents="none"
        >
          <Box
            border="4px solid rgba(255,255,255,0.2)"
            borderTop="4px solid white"
            borderRadius="50%"
            width="60px"
            height="60px"
            animation="spin 0.8s linear infinite"
          />
        </Box>
      )}

      {/* Center Play Button */}
      {!isPlaying && showControls && !isBuffering && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          onClick={handlePlayPause}
          cursor="pointer"
          bg="rgba(0,0,0,0.6)"
          borderRadius="full"
          p={8}
          border="3px solid rgba(255,255,255,0.3)"
          _hover={{
            bg: "rgba(0,0,0,0.8)",
            transform: "translate(-50%, -50%) scale(1.1)",
            borderColor: "white",
          }}
          transition="all 0.3s ease"
        >
          <Box as={FaPlay} color="white" fontSize="5xl" ml={2} />
        </Box>
      )}

      {/* Top Bar */}
      <Box
        position="absolute"
        top="0"
        width="100%"
        opacity={showControls ? 1 : 0}
        transition="opacity 0.3s ease"
        pointerEvents={showControls ? "auto" : "none"}
        background="linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)"
        p={4}
      >
        <HStack justifyContent="space-between">
          <HStack spacing={2}>
            {playbackSpeed !== 1 && (
              <Badge
                colorScheme="red"
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="md"
              >
                {playbackSpeed}x
              </Badge>
            )}
            {isPiPActive && (
              <Badge
                colorScheme="blue"
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="md"
              >
                PiP
              </Badge>
            )}
          </HStack>
          <HStack spacing={2}>
            <Badge
              colorScheme="purple"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="md"
            >
              {selectedQuality.label}
            </Badge>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FaEllipsisV />}
                variant="ghost"
                colorScheme="whiteAlpha"
                color="white"
                size="sm"
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
              />
              <MenuList bg="gray.900" borderColor="gray.700">
                <MenuItem
                  icon={<FaDownload />}
                  onClick={handleDownload}
                  _hover={{ bg: "gray.800" }}
                  color="white"
                >
                  Download Video
                </MenuItem>
                <MenuItem
                  icon={<FaShareAlt />}
                  onClick={handleShare}
                  _hover={{ bg: "gray.800" }}
                  color="white"
                >
                  Share
                </MenuItem>
                <MenuItem
                  icon={<MdPictureInPicture />}
                  onClick={handlePictureInPicture}
                  _hover={{ bg: "gray.800" }}
                  color="white"
                >
                  Picture in Picture
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Box>

      {/* Bottom Controls */}
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        opacity={showControls ? 1 : 0}
        transition="opacity 0.3s ease"
        pointerEvents={showControls ? "auto" : "none"}
        background="linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)"
        pb={4}
        pt={12}
      >
        {/* Progress Bar */}
        <Box px={6} mb={3}>
          <Slider
            aria-label="Progress"
            value={progress}
            onChange={handleProgressChange}
            min={0}
            max={100}
            step={0.1}
            focusThumbOnChange={false}
          >
            <SliderTrack bg="rgba(255,255,255,0.2)" height="5px">
              <SliderFilledTrack bg="red.500" />
            </SliderTrack>
            <SliderThumb boxSize="16px" bg="red.500" />
          </Slider>
        </Box>

        {/* Control Buttons */}
        <HStack
          spacing={{ base: 2, md: 4 }}
          justifyContent="space-between"
          alignItems="center"
          px={6}
        >
          {/* Left Controls */}
          <HStack spacing={{ base: 2, md: 3 }}>
            <Tooltip label={isPlaying ? "Pause (K)" : "Play (K)"} fontSize="xs">
              <IconButton
                icon={isPlaying ? <FaPause /> : <FaPlay />}
                aria-label="Play/Pause"
                onClick={handlePlayPause}
                variant="ghost"
                colorScheme="whiteAlpha"
                color="white"
                size={{ base: "sm", md: "md" }}
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
              />
            </Tooltip>
            <Tooltip label="Rewind 10s" fontSize="xs">
              <IconButton
                icon={<FaBackward />}
                aria-label="Rewind"
                onClick={handleSkipBackward}
                variant="ghost"
                colorScheme="whiteAlpha"
                color="white"
                size={{ base: "sm", md: "md" }}
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
              />
            </Tooltip>
            <Tooltip label="Forward 10s" fontSize="xs">
              <IconButton
                icon={<FaForward />}
                aria-label="Forward"
                onClick={handleSkipForward}
                variant="ghost"
                colorScheme="whiteAlpha"
                color="white"
                size={{ base: "sm", md: "md" }}
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
              />
            </Tooltip>

            {/* Volume */}
            <HStack
              spacing={2}
              display={{ base: "none", md: "flex" }}
              bg="rgba(255,255,255,0.1)"
              px={3}
              py={1}
              borderRadius="full"
            >
              <IconButton
                icon={getVolumeIcon()}
                aria-label="Mute"
                onClick={handleVolumeMuteToggle}
                variant="ghost"
                colorScheme="whiteAlpha"
                color="white"
                size="sm"
                minW="auto"
                _hover={{ bg: "transparent" }}
              />
              <Slider
                aria-label="Volume"
                value={volume}
                onChange={handleVolumeChange}
                min={0}
                max={100}
                step={1}
                width="90px"
                focusThumbOnChange={false}
              >
                <SliderTrack bg="rgba(255,255,255,0.3)" height="3px">
                  <SliderFilledTrack bg="white" />
                </SliderTrack>
                <SliderThumb boxSize="12px" bg="white" />
              </Slider>
            </HStack>

            <Text
              color="white"
              fontSize={{ base: "xs", md: "sm" }}
              fontWeight="medium"
              display={{ base: "none", sm: "block" }}
            >
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </HStack>

          {/* Right Controls */}
          <HStack spacing={{ base: 1, md: 2 }}>
            <Tooltip label="Captions" fontSize="xs">
              <IconButton
                icon={<FaClosedCaptioning />}
                aria-label="Captions"
                onClick={() => {
                  setShowCaptions(!showCaptions);
                  showToast(showCaptions ? "Captions OFF" : "Captions ON");
                }}
                variant="ghost"
                colorScheme="whiteAlpha"
                color={showCaptions ? "red.400" : "white"}
                size={{ base: "sm", md: "md" }}
                display={{ base: "none", md: "flex" }}
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
              />
            </Tooltip>

            {/* Speed */}
            <Menu>
              <Tooltip label="Playback Speed" fontSize="xs">
                <MenuButton
                  as={IconButton}
                  icon={<MdSpeed />}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  color="white"
                  size={{ base: "sm", md: "md" }}
                  _hover={{ bg: "rgba(255,255,255,0.2)" }}
                />
              </Tooltip>
              <MenuList bg="gray.900" borderColor="gray.700" minW="120px">
                {speedOptions.map((speed) => (
                  <MenuItem
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    bg={playbackSpeed === speed ? "gray.800" : "transparent"}
                    _hover={{ bg: "gray.800" }}
                    color="white"
                    justifyContent="space-between"
                  >
                    <Text>{speed}x</Text>
                    {speed === 1 && (
                      <Badge colorScheme="gray" ml={2} fontSize="xs">
                        Normal
                      </Badge>
                    )}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            {/* Quality - now using real qualities from API */}
            <Menu>
              <Tooltip label="Quality Settings" fontSize="xs">
                <MenuButton
                  as={IconButton}
                  icon={<MdHighQuality />}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  color="white"
                  size={{ base: "sm", md: "md" }}
                  _hover={{ bg: "rgba(255,255,255,0.2)" }}
                />
              </Tooltip>
              <MenuList bg="gray.900" borderColor="gray.700" minW="140px">
                {qualityOptions.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleQualityChange(option)}
                    bg={
                      selectedQuality.label === option.label
                        ? "gray.800"
                        : "transparent"
                    }
                    _hover={{ bg: "gray.800" }}
                    color="white"
                    justifyContent="space-between"
                  >
                    <Text>{option.label}</Text>
                    {option.label === "Auto" && (
                      <Badge colorScheme="purple" ml={2} fontSize="xs">
                        HD
                      </Badge>
                    )}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            {/* Mobile Volume */}
            <IconButton
              icon={getVolumeIcon()}
              aria-label="Volume"
              onClick={handleVolumeMuteToggle}
              variant="ghost"
              colorScheme="whiteAlpha"
              color="white"
              size={{ base: "sm", md: "md" }}
              display={{ base: "flex", md: "none" }}
              _hover={{ bg: "rgba(255,255,255,0.2)" }}
            />

            {/* Settings */}
            <Menu>
              <Tooltip label="Settings" fontSize="xs">
                <MenuButton
                  as={IconButton}
                  icon={<FaCog />}
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  color="white"
                  size={{ base: "sm", md: "md" }}
                  display={{ base: "none", md: "flex" }}
                  _hover={{ bg: "rgba(255,255,255,0.2)" }}
                />
              </Tooltip>
              <MenuList bg="gray.900" borderColor="gray.700">
                <MenuItem
                  _hover={{ bg: "gray.800" }}
                  color="white"
                  justifyContent="space-between"
                >
                  <Text>Autoplay</Text>
                  <Badge colorScheme="green">ON</Badge>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "gray.800" }}
                  color="white"
                  justifyContent="space-between"
                >
                  <Text>Annotations</Text>
                  <Badge colorScheme="gray">OFF</Badge>
                </MenuItem>
                <MenuItem _hover={{ bg: "gray.800" }} color="white">
                  Keyboard Shortcuts
                </MenuItem>
              </MenuList>
            </Menu>

            {/* Fullscreen */}
            <Tooltip label="Fullscreen (F)" fontSize="xs">
              <IconButton
                icon={isFullScreen ? <FaCompress /> : <FaExpand />}
                aria-label="Fullscreen"
                onClick={handleFullScreenToggle}
                variant="ghost"
                colorScheme="whiteAlpha"
                color="white"
                size={{ base: "sm", md: "md" }}
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
              />
            </Tooltip>
          </HStack>
        </HStack>
      </Box>

      {/* Keyboard Shortcuts Hint */}
      {showControls && (
        <Box
          position="absolute"
          bottom="80px"
          right="20px"
          bg="rgba(0,0,0,0.8)"
          px={3}
          py={2}
          borderRadius="md"
          display={{ base: "none", lg: "block" }}
          opacity={0.5}
          _hover={{ opacity: 1 }}
          transition="opacity 0.2s"
        >
          <VStack spacing={0} align="start">
            <Text color="white" fontSize="xs" fontWeight="bold" mb={1}>
              Shortcuts
            </Text>
            <Text color="gray.400" fontSize="xs">
              Space/K: Play/Pause
            </Text>
            <Text color="gray.400" fontSize="xs">
              F: Fullscreen
            </Text>
            <Text color="gray.400" fontSize="xs">
              M: Mute
            </Text>
            <Text color="gray.400" fontSize="xs">
              ←/→: -10s/+10s
            </Text>
          </VStack>
        </Box>
      )}

      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </Box>
  );
};

export default VideoPlayerDisplay;
