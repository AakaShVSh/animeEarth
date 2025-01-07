import {
  Box,
  Input,
  Textarea,
  Select,
  IconButton,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useRef, useState } from "react";
import { posVideosApi } from "../services/apis/uploadVideo";
import { getCookies } from "../services/cookies";

function UploadForm() {
  const videoInputRef = useRef();
  const thumbnailInputRef = useRef();

  const [formData, setFormData] = useState({
    user:"",
    videoUrl: null,
    thumbnailUrl: null,
    title: "",
    category:"Education",
    tags: [],
    audience: "Above 18",
    description: "",
    // thumbnailPreview: null,
  });

  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        videoUrl: file,
      }));
      console.log("Selected video:", file);
    }
  };

  const handleThumbnailSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        thumbnailUrl: file,
        thumbnailPreview: previewURL,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadData = async () => {
    console.log(formData);
    try {
      const getUser = getCookies("_user"); 
      // Construct the payload with updated user data
      const updatedFormData = { ...formData, user: getUser };

      // Call the API with the updated form data
      await posVideosApi(updatedFormData);
      posVideosApi(formData);
    } catch (error) {
      console.error(error);
      
    }
    
  };
  return (
    <>
      <Box
        bg="gray.900"
        p={3}
        m="1%"
        display={{ base: "", md: "", lg: "flex" }}
        justifyContent="space-around"
      >
        <Box w="80%">
          {/* Select Video */}
          <Box mb="2">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Select Video
            </Text>
          </Box>
          <Box
            w={{ base: "100%", md: "97%", lg: "97%" }}
            bg="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4"
            h="300px"
            position="relative"
          >
            <IconButton
              aria-label="Upload video"
              icon={<FiUpload />}
              size="lg"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              fontSize="58px"
              onClick={() => videoInputRef.current.click()}
            />
            <Input
              type="file"
              accept="video/*"
              display="none"
              ref={videoInputRef}
              onChange={handleVideoSelect}
            />
          </Box>

          {/* Upload Thumbnail */}
          <Box mb="2" mt="1%">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Video Thumbnail
            </Text>
          </Box>
          <Box
            w={{ base: "100%", md: "97%", lg: "97%" }}
            bg="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4"
            h="300px"
            position="relative"
            overflow="hidden"
            cursor="pointer"
            onClick={() => thumbnailInputRef.current.click()}
          >
            {formData.thumbnailPreview ? (
              <Image
                src={formData.thumbnailPreview}
                alt="Thumbnail Preview"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            ) : (
              <IconButton
                aria-label="Upload thumbnail"
                icon={<MdOutlineAddPhotoAlternate />}
                size="lg"
                bg="transparent"
                _hover={{ bg: "transparent" }}
                fontSize="58px"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              display="none"
              ref={thumbnailInputRef}
              onChange={handleThumbnailSelect}
            />
          </Box>
        </Box>
        <Box w="100%">
          {/* Title */}
          <Box mb="2">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Title
            </Text>
          </Box>
          <Box mb={2}>
            <Input
              name="title"
              placeholder="Title"
              bg="gray.300"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Box>
          {/* Category */}
          <Box mb="2">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Category
            </Text>
          </Box>
          <Box mb={2}>
            <Select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              bg="gray.300"
              borderRadius="4"
              fontWeight="bold"
            >
              <option
                value="Education"
                style={{ backgroundColor: "#0e1525", color: "white" }}
              >
                Education
              </option>
              <option
                value="Entertainment"
                style={{ backgroundColor: "#0e1525", color: "white" }}
              >
                Entertainment
              </option>
              <option
                value="Gaming"
                style={{ backgroundColor: "#0e1525", color: "white" }}
              >
                Gaming
              </option>
              <option
                value="Music"
                style={{ backgroundColor: "#0e1525", color: "white" }}
              >
                Music
              </option>
              <option
                value="Sports"
                style={{ backgroundColor: "#0e1525", color: "white" }}
              >
                Sports
              </option>
              <option
                value="Technology"
                style={{ backgroundColor: "#0e1525", color: "white" }}
              >
                Technology
              </option>
            </Select>
          </Box>

          {/* Tags */}
          <Box mb="2">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Tags
            </Text>
          </Box>
          <Box mb={2}>
            <Input
              name="tags"
              placeholder="Tags"
              bg="gray.300"
              value={formData.tags}
              onChange={handleChange}
            />
          </Box>

          {/* Audience */}
          <Box mb="2">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Audience
            </Text>
          </Box>
          <Box mb={2}>
            <Select
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              bg="gray.300"
              borderRadius="4"
              fontWeight="bold"
            >
              <option
                value="Above 18"
                style={{ backgroundColor: "#0e1525", color: "white" }}
              >
                Above 18
              </option>
              <option
                value="Below 18"
                style={{ backgroundColor: "#0e1525", color: "white" }}
              >
                Below 18
              </option>
            </Select>
          </Box>

          {/* Description */}
          <Box mb="2">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Description
            </Text>
          </Box>
          <Box mb="17%">
            <Textarea
              name="description"
              placeholder="Description"
              bg="gray.300"
              h="200px"
              value={formData.description}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </Box>
      <Box m="2%" w="100%">
        <Button w="96%" bg="#21b8fd" onClick={() => uploadData()}>
          Upload Video
        </Button>
      </Box>
    </>
  );
}

export default UploadForm;
