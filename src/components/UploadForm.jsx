// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Input,
//   Textarea,
//   Select,
//   IconButton,
//   Text,
//   Button,
//   Image,
//   useToast,
//   VStack,
//   FormControl,
//   FormLabel,
//   Progress,
//   HStack,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   Wrap,
//   WrapItem,
// } from "@chakra-ui/react";
// import { FiUpload } from "react-icons/fi";
// import { MdOutlineAddPhotoAlternate } from "react-icons/md";
// import { posVideosApi } from "../services/apis/uploadVideo";
// import { checkAuthApi } from "../services/apis/userAuth";
// import { useNavigate } from "react-router-dom";

// const CATEGORIES = [
//   "Education",
//   "Entertainment",
//   "Gaming",
//   "Music",
//   "Sports",
//   "Technology",
//   "Science",
//   "Food & Cooking",
//   "Fitness",
//   "Art & Design",
// ];

// function UploadForm() {
//   const videoInputRef = useRef();
//   const thumbnailInputRef = useRef();
//   const tagInputRef = useRef();
//   const toast = useToast();
//   const navigate = useNavigate();

//   const [userId, setUserId] = useState(null);
//   const [formData, setFormData] = useState({
//     videoFile: null,
//     thumbnailFile: null,
//     title: "",
//     category: "Education",
//     tags: [],
//     audience: "Above 18",
//     description: "",
//     thumbnailPreview: null,
//   });
//   const [tagInput, setTagInput] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   useEffect(() => {
//     checkAuthApi().then(({ authenticated, user }) => {
//       if (authenticated && user?._id) setUserId(user._id);
//       else navigate("/SignIn");
//     });
//   }, []);

//   const showToast = (title, description, status) =>
//     toast({
//       title,
//       description,
//       status,
//       duration: 3000,
//       isClosable: true,
//       position: "top",
//     });

//   const handleVideoSelect = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (file.size > 500 * 1024 * 1024)
//       return showToast("File Too Large", "Max 500MB", "error");
//     setFormData((p) => ({ ...p, videoFile: file }));
//     showToast("Video Selected", file.name, "success");
//   };

//   const handleThumbnailSelect = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     if (!file.type.startsWith("image/"))
//       return showToast("Invalid Type", "Select an image", "error");
//     setFormData((p) => ({
//       ...p,
//       thumbnailFile: file,
//       thumbnailPreview: URL.createObjectURL(file),
//     }));
//   };

//   const handleChange = (e) =>
//     setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

//   const handleTagAdd = (e) => {
//     if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
//       e.preventDefault();
//       const newTag = tagInput.trim().replace(/,$/, "");
//       if (
//         newTag &&
//         !formData.tags.includes(newTag) &&
//         formData.tags.length < 10
//       ) {
//         setFormData((p) => ({ ...p, tags: [...p.tags, newTag] }));
//       }
//       setTagInput("");
//     }
//   };

//   const handleTagRemove = (tag) =>
//     setFormData((p) => ({ ...p, tags: p.tags.filter((t) => t !== tag) }));

//   const validate = () => {
//     if (!formData.videoFile)
//       return (showToast("Video Required", "Select a video", "warning"), false);
//     if (!formData.thumbnailFile)
//       return (
//         showToast("Thumbnail Required", "Select a thumbnail", "warning"),
//         false
//       );
//     if (!formData.title.trim())
//       return (showToast("Title Required", "Enter a title", "warning"), false);
//     if (!formData.description.trim())
//       return (
//         showToast("Description Required", "Enter a description", "warning"),
//         false
//       );
//     return true;
//   };

//   const uploadData = async () => {
//     if (!validate()) return;
//     if (!userId) return showToast("Not Signed In", "Please sign in", "error");

//     setIsUploading(true);
//     setUploadProgress(0);

//     const data = new FormData();
//     data.append("user", userId);
//     data.append("videoUrl", formData.videoFile);
//     data.append("thumbnailUrl", formData.thumbnailFile);
//     data.append("title", formData.title);
//     data.append("category", formData.category);
//     data.append("audience", formData.audience);
//     data.append("description", formData.description);
//     formData.tags.forEach((tag) => data.append("tags", tag));

//     try {
//       await posVideosApi(data, setUploadProgress);
//       setUploadProgress(100);
//       showToast("Upload Successful", "Your video is live!", "success");
//       setFormData({
//         videoFile: null,
//         thumbnailFile: null,
//         title: "",
//         category: "Education",
//         tags: [],
//         audience: "Above 18",
//         description: "",
//         thumbnailPreview: null,
//       });
//       setUploadProgress(0);
//       setTimeout(() => navigate("/"), 1500);
//     } catch (error) {
//       showToast("Upload Failed", error.message || "Try again", "error");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Box bg="gray.50" h="calc(100vh - 64px)" overflowY="auto">
//       <Box
//         maxW="1200px"
//         mx="auto"
//         px={{ base: 4, md: 6 }}
//         py={4}
//         h="100%"
//         display="flex"
//         flexDirection="column"
//       >
//         <Box flex="1" display={{ base: "block", lg: "flex" }} gap={6}>
//           {/* Left — Video + Thumbnail */}
//           <Box
//             w={{ base: "100%", lg: "45%" }}
//             display="flex"
//             flexDirection="column"
//             gap={4}
//           >
//             {/* Video drop */}
//             <FormControl isRequired flex="1">
//               <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
//                 Video File
//               </FormLabel>
//               <Box
//                 w="100%"
//                 bg="white"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 borderRadius="lg"
//                 h={{ base: "200px", lg: "calc(50% - 8px)" }}
//                 minH="180px"
//                 border="2px dashed"
//                 borderColor={formData.videoFile ? "blue.400" : "gray.300"}
//                 cursor="pointer"
//                 transition="all 0.2s"
//                 _hover={{ borderColor: "blue.400", bg: "blue.50" }}
//                 onClick={() => videoInputRef.current.click()}
//               >
//                 <VStack spacing={2}>
//                   <Box
//                     fontSize="40px"
//                     color={formData.videoFile ? "blue.500" : "gray.400"}
//                   >
//                     <FiUpload />
//                   </Box>
//                   <Text
//                     fontSize="sm"
//                     color={formData.videoFile ? "blue.600" : "gray.600"}
//                     fontWeight="medium"
//                     px="4"
//                     textAlign="center"
//                     noOfLines={2}
//                   >
//                     {formData.videoFile
//                       ? formData.videoFile.name
//                       : "Click to select video"}
//                   </Text>
//                   <Text fontSize="xs" color="gray.400">
//                     MP4, MOV, AVI • Max 500MB
//                   </Text>
//                 </VStack>
//                 <Input
//                   type="file"
//                   accept="video/*"
//                   display="none"
//                   ref={videoInputRef}
//                   onChange={handleVideoSelect}
//                 />
//               </Box>
//             </FormControl>

//             {/* Thumbnail drop */}
//             <FormControl isRequired flex="1">
//               <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
//                 Thumbnail
//               </FormLabel>
//               <Box
//                 w="100%"
//                 bg="white"
//                 display="flex"
//                 alignItems="center"
//                 justifyContent="center"
//                 borderRadius="lg"
//                 h={{ base: "180px", lg: "calc(50% - 8px)" }}
//                 minH="160px"
//                 border="2px dashed"
//                 borderColor={formData.thumbnailFile ? "blue.400" : "gray.300"}
//                 overflow="hidden"
//                 cursor="pointer"
//                 transition="all 0.2s"
//                 _hover={{ borderColor: "blue.400" }}
//                 onClick={() => thumbnailInputRef.current.click()}
//               >
//                 {formData.thumbnailPreview ? (
//                   <Image
//                     src={formData.thumbnailPreview}
//                     alt="Thumbnail"
//                     objectFit="cover"
//                     w="100%"
//                     h="100%"
//                   />
//                 ) : (
//                   <VStack spacing={2}>
//                     <Box fontSize="40px" color="gray.400">
//                       <MdOutlineAddPhotoAlternate />
//                     </Box>
//                     <Text fontSize="sm" color="gray.600">
//                       Click to select thumbnail
//                     </Text>
//                     <Text fontSize="xs" color="gray.400">
//                       Recommended: 1280×720
//                     </Text>
//                   </VStack>
//                 )}
//                 <Input
//                   type="file"
//                   accept="image/*"
//                   display="none"
//                   ref={thumbnailInputRef}
//                   onChange={handleThumbnailSelect}
//                 />
//               </Box>
//             </FormControl>
//           </Box>

//           {/* Right — Form Fields */}
//           <VStack flex="1" align="stretch" spacing={3}>
//             <FormControl isRequired>
//               <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
//                 Title
//               </FormLabel>
//               <Input
//                 name="title"
//                 placeholder="Enter video title"
//                 bg="white"
//                 value={formData.title}
//                 onChange={handleChange}
//                 focusBorderColor="blue.500"
//                 maxLength={100}
//               />
//               <Text fontSize="xs" color="gray.400" textAlign="right" mt="1">
//                 {formData.title.length}/100
//               </Text>
//             </FormControl>

//             <HStack spacing={3}>
//               <FormControl isRequired flex="1">
//                 <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
//                   Category
//                 </FormLabel>
//                 <Select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   bg="white"
//                   focusBorderColor="blue.500"
//                 >
//                   {CATEGORIES.map((c) => (
//                     <option key={c} value={c}>
//                       {c}
//                     </option>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl isRequired flex="1">
//                 <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
//                   Audience
//                 </FormLabel>
//                 <Select
//                   name="audience"
//                   value={formData.audience}
//                   onChange={handleChange}
//                   bg="white"
//                   focusBorderColor="blue.500"
//                 >
//                   <option value="Above 18">Above 18</option>
//                   <option value="Below 18">Below 18</option>
//                 </Select>
//               </FormControl>
//             </HStack>

//             {/* Tags input */}
//             <FormControl>
//               <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
//                 Tags{" "}
//                 <Text as="span" color="gray.400" fontWeight="normal">
//                   (press Enter to add)
//                 </Text>
//               </FormLabel>
//               {formData.tags.length > 0 && (
//                 <Wrap mb="2" spacing="1">
//                   {formData.tags.map((tag) => (
//                     <WrapItem key={tag}>
//                       <Tag size="sm" colorScheme="blue" borderRadius="full">
//                         <TagLabel>{tag}</TagLabel>
//                         <TagCloseButton onClick={() => handleTagRemove(tag)} />
//                       </Tag>
//                     </WrapItem>
//                   ))}
//                 </Wrap>
//               )}
//               <Input
//                 ref={tagInputRef}
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyDown={handleTagAdd}
//                 placeholder="e.g. tutorial, javascript..."
//                 bg="white"
//                 focusBorderColor="blue.500"
//                 isDisabled={formData.tags.length >= 10}
//               />
//               <Text fontSize="xs" color="gray.400" mt="1">
//                 {formData.tags.length}/10 tags
//               </Text>
//             </FormControl>

//             <FormControl isRequired flex="1">
//               <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
//                 Description
//               </FormLabel>
//               <Textarea
//                 name="description"
//                 placeholder="Tell viewers about your video..."
//                 bg="white"
//                 value={formData.description}
//                 onChange={handleChange}
//                 focusBorderColor="blue.500"
//                 resize="vertical"
//                 flex="1"
//                 minH="120px"
//                 maxH="260px"
//                 h={{ base: "140px", lg: "200px" }}
//                 maxLength={5000}
//               />
//               <Text fontSize="xs" color="gray.400" textAlign="right" mt="1">
//                 {formData.description.length}/5000
//               </Text>
//             </FormControl>
//           </VStack>
//         </Box>

//         {/* Progress + Button */}
//         <Box mt={4} pt={3} borderTop="1px" borderColor="gray.200">
//           {isUploading && (
//             <Box mb={3}>
//               <Progress
//                 value={uploadProgress}
//                 size="sm"
//                 colorScheme="blue"
//                 borderRadius="full"
//                 hasStripe
//                 isAnimated
//               />
//               <Text fontSize="sm" color="gray.600" mt={1} textAlign="center">
//                 {uploadProgress < 100
//                   ? `Uploading... ${uploadProgress}%`
//                   : "Processing on server..."}
//               </Text>
//             </Box>
//           )}
//           <Button
//             w="100%"
//             colorScheme="blue"
//             size="lg"
//             onClick={uploadData}
//             isLoading={isUploading}
//             loadingText={`Uploading ${uploadProgress}%`}
//             _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
//             transition="all 0.2s"
//           >
//             Upload Video
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default UploadForm;

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Input,
  Textarea,
  Select,
  Text,
  Button,
  Image,
  useToast,
  VStack,
  FormControl,
  FormLabel,
  Progress,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { posVideosApi } from "../services/apis/uploadVideo";
import { checkAuthApi } from "../services/apis/userAuth";
import { useNavigate } from "react-router-dom";

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

function UploadForm() {
  const videoInputRef = useRef();
  const thumbnailInputRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [hasChannel, setHasChannel] = useState(null); // null = loading
  const [channelName, setChannelName] = useState("");

  const [formData, setFormData] = useState({
    videoFile: null,
    thumbnailFile: null,
    title: "",
    category: "Education",
    tags: [],
    audience: "Above 18",
    description: "",
    thumbnailPreview: null,
  });
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  /* ── Auth + studio guard ─────────────────────────────────────────── */
  useEffect(() => {
    checkAuthApi().then(({ authenticated, user }) => {
      if (!authenticated) {
        navigate("/SignIn");
        return;
      }
      setUserId(user._id);
      setHasChannel(user.hasChannel ?? false);
      setChannelName(user.channelName || user.username || "");
    });
  }, []);

  const showToast = (title, description, status) =>
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: "top",
    });

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("video/"))
      return showToast("Invalid file", "Select a video file", "error");
    if (file.size > 500 * 1024 * 1024)
      return showToast("File too large", "Max 500 MB", "error");
    setFormData((p) => ({ ...p, videoFile: file }));
    showToast("Video selected", file.name, "success");
  };

  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return showToast("Invalid type", "Select an image", "error");
    setFormData((p) => ({
      ...p,
      thumbnailFile: file,
      thumbnailPreview: URL.createObjectURL(file),
    }));
  };

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleTagAdd = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const tag = tagInput.trim().replace(/,$/, "");
      if (tag && !formData.tags.includes(tag) && formData.tags.length < 10)
        setFormData((p) => ({ ...p, tags: [...p.tags, tag] }));
      setTagInput("");
    }
  };

  const validate = () => {
    if (!formData.videoFile)
      return (showToast("Video required", "Select a video", "warning"), false);
    if (!formData.thumbnailFile)
      return (
        showToast("Thumbnail required", "Select a thumbnail", "warning"),
        false
      );
    if (!formData.title.trim())
      return (showToast("Title required", "Enter a title", "warning"), false);
    if (!formData.description.trim())
      return (
        showToast("Description required", "Enter a description", "warning"),
        false
      );
    return true;
  };

  const uploadData = async () => {
    if (!validate() || !userId) return;

    setIsUploading(true);
    setUploadProgress(0);
    const data = new FormData();
    data.append("user", userId);
    data.append("videoUrl", formData.videoFile);
    data.append("thumbnailUrl", formData.thumbnailFile);
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("audience", formData.audience);
    data.append("description", formData.description);
    formData.tags.forEach((t) => data.append("tags", t));

    try {
      await posVideosApi(data, setUploadProgress);
      setUploadProgress(100);
      showToast("Upload successful 🎉", "Your video is live!", "success");
      setFormData({
        videoFile: null,
        thumbnailFile: null,
        title: "",
        category: "Education",
        tags: [],
        audience: "Above 18",
        description: "",
        thumbnailPreview: null,
      });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      // If backend returns 403 (no channel), show the guard message
      const msg = err?.response?.data?.error || err.message || "Upload failed";
      showToast("Upload failed", msg, "error");
      if (err?.response?.status === 403) setHasChannel(false);
    } finally {
      setIsUploading(false);
    }
  };

  /* ── Loading ──────────────────────────────────────────────────────── */
  if (hasChannel === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="60vh">
        <Text color="gray.400">Checking your studio…</Text>
      </Box>
    );
  }

  /* ── Studio guard — user has no channel yet ──────────────────────── */
  if (hasChannel === false) {
    return (
      <Box maxW="520px" mx="auto" mt="16" px="6">
        <Alert
          status="warning"
          variant="left-accent"
          borderRadius="xl"
          flexDirection="column"
          alignItems="start"
          gap="3"
          p="6"
          bg="orange.50"
          borderColor="orange.400"
        >
          <HStack>
            <AlertIcon />
            <AlertTitle fontSize="lg">Studio not activated</AlertTitle>
          </HStack>
          <AlertDescription lineHeight="1.8" color="gray.600">
            You need to <strong>activate your studio</strong> before you can
            upload videos. Your studio is your creator identity — choose a name,
            add a description, and you'll be ready to go live.
          </AlertDescription>
          <Button
            colorScheme="orange"
            mt="2"
            onClick={() => navigate("/Profile")}
            transition="all 0.2s"
            _hover={{ transform: "translateY(-1px)" }}
          >
            Go to Profile → Activate Studio
          </Button>
        </Alert>
      </Box>
    );
  }

  /* ── Upload form ─────────────────────────────────────────────────── */
  return (
    <Box bg="gray.50" h="calc(100vh - 64px)" overflowY="auto">
      <Box
        maxW="1200px"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={4}
        h="100%"
        display="flex"
        flexDirection="column"
      >
        {/* Studio info banner */}
        <HStack
          bg="purple.50"
          px="4"
          py="2"
          borderRadius="lg"
          mb="4"
          border="1px solid"
          borderColor="purple.100"
        >
          <Text fontSize="sm" color="purple.700">
            📡 Uploading to <strong>{channelName}</strong> studio
          </Text>
        </HStack>

        <Box flex="1" display={{ base: "block", lg: "flex" }} gap={6}>
          {/* Left — files */}
          <Box
            w={{ base: "100%", lg: "45%" }}
            display="flex"
            flexDirection="column"
            gap={4}
          >
            {/* Video drop */}
            <FormControl isRequired flex="1">
              <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                Video File
              </FormLabel>
              <Box
                w="100%"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="lg"
                h={{ base: "200px", lg: "calc(50% - 8px)" }}
                minH="180px"
                border="2px dashed"
                borderColor={formData.videoFile ? "purple.400" : "gray.300"}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ borderColor: "purple.400", bg: "purple.50" }}
                onClick={() => videoInputRef.current.click()}
              >
                <VStack spacing={2}>
                  <Box
                    fontSize="40px"
                    color={formData.videoFile ? "purple.500" : "gray.400"}
                  >
                    <FiUpload />
                  </Box>
                  <Text
                    fontSize="sm"
                    color={formData.videoFile ? "purple.600" : "gray.600"}
                    fontWeight="medium"
                    px="4"
                    textAlign="center"
                    noOfLines={2}
                  >
                    {formData.videoFile
                      ? formData.videoFile.name
                      : "Click to select video"}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    MP4, MOV, AVI · Max 500 MB
                  </Text>
                </VStack>
                <Input
                  type="file"
                  accept="video/*"
                  display="none"
                  ref={videoInputRef}
                  onChange={handleVideoSelect}
                />
              </Box>
            </FormControl>

            {/* Thumbnail drop */}
            <FormControl isRequired flex="1">
              <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                Thumbnail
              </FormLabel>
              <Box
                w="100%"
                bg="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="lg"
                h={{ base: "180px", lg: "calc(50% - 8px)" }}
                minH="160px"
                border="2px dashed"
                borderColor={formData.thumbnailFile ? "purple.400" : "gray.300"}
                overflow="hidden"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{ borderColor: "purple.400" }}
                onClick={() => thumbnailInputRef.current.click()}
              >
                {formData.thumbnailPreview ? (
                  <Image
                    src={formData.thumbnailPreview}
                    alt="Thumbnail"
                    objectFit="cover"
                    w="100%"
                    h="100%"
                  />
                ) : (
                  <VStack spacing={2}>
                    <Box fontSize="40px" color="gray.400">
                      <MdOutlineAddPhotoAlternate />
                    </Box>
                    <Text fontSize="sm" color="gray.600">
                      Click to select thumbnail
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      Recommended: 1280×720
                    </Text>
                  </VStack>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  display="none"
                  ref={thumbnailInputRef}
                  onChange={handleThumbnailSelect}
                />
              </Box>
            </FormControl>
          </Box>

          {/* Right — fields */}
          <VStack flex="1" align="stretch" spacing={3}>
            <FormControl isRequired>
              <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                Title
              </FormLabel>
              <Input
                name="title"
                placeholder="Enter video title"
                bg="white"
                value={formData.title}
                onChange={handleChange}
                focusBorderColor="purple.500"
                maxLength={100}
              />
              <Text fontSize="xs" color="gray.400" textAlign="right" mt="1">
                {formData.title.length}/100
              </Text>
            </FormControl>

            <HStack spacing={3}>
              <FormControl isRequired flex="1">
                <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                  Category
                </FormLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  bg="white"
                  focusBorderColor="purple.500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired flex="1">
                <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                  Audience
                </FormLabel>
                <Select
                  name="audience"
                  value={formData.audience}
                  onChange={handleChange}
                  bg="white"
                  focusBorderColor="purple.500"
                >
                  <option value="Above 18">Above 18</option>
                  <option value="Below 18">Below 18</option>
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                Tags{" "}
                <Text as="span" color="gray.400" fontWeight="normal">
                  (Enter to add)
                </Text>
              </FormLabel>
              {formData.tags.length > 0 && (
                <Wrap mb="2" spacing="1">
                  {formData.tags.map((tag) => (
                    <WrapItem key={tag}>
                      <Tag size="sm" colorScheme="purple" borderRadius="full">
                        <TagLabel>{tag}</TagLabel>
                        <TagCloseButton
                          onClick={() =>
                            setFormData((p) => ({
                              ...p,
                              tags: p.tags.filter((t) => t !== tag),
                            }))
                          }
                        />
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              )}
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
                placeholder="e.g. tutorial, javascript…"
                bg="white"
                focusBorderColor="purple.500"
                isDisabled={formData.tags.length >= 10}
              />
              <Text fontSize="xs" color="gray.400" mt="1">
                {formData.tags.length}/10 tags
              </Text>
            </FormControl>

            <FormControl isRequired flex="1">
              <FormLabel fontSize="sm" fontWeight="semibold" color="gray.700">
                Description
              </FormLabel>
              <Textarea
                name="description"
                placeholder="Tell viewers about your video…"
                bg="white"
                value={formData.description}
                onChange={handleChange}
                focusBorderColor="purple.500"
                resize="vertical"
                minH="120px"
                maxH="260px"
                h={{ base: "140px", lg: "200px" }}
                maxLength={5000}
              />
              <Text fontSize="xs" color="gray.400" textAlign="right" mt="1">
                {formData.description.length}/5000
              </Text>
            </FormControl>
          </VStack>
        </Box>

        {/* Progress + submit */}
        <Box mt={4} pt={3} borderTop="1px" borderColor="gray.200">
          {isUploading && (
            <Box mb={3}>
              <Progress
                value={uploadProgress}
                size="sm"
                colorScheme="purple"
                borderRadius="full"
                hasStripe
                isAnimated
              />
              <Text fontSize="sm" color="gray.600" mt={1} textAlign="center">
                {uploadProgress < 100
                  ? `Uploading… ${uploadProgress}%`
                  : "Processing on server…"}
              </Text>
            </Box>
          )}
          <Button
            w="100%"
            colorScheme="purple"
            size="lg"
            onClick={uploadData}
            isLoading={isUploading}
            loadingText={`Uploading ${uploadProgress}%`}
            _hover={{ transform: "translateY(-1px)", boxShadow: "lg" }}
            transition="all 0.2s"
          >
            Upload Video
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default UploadForm;