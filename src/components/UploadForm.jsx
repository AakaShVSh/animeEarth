import {
  Box,
  Input,
  Textarea,
  Grid,
  Image,
  IconButton,
  Text,
  Select,
  SelectField,
  Button,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";

function UploadForm() {
  return (
    <>
      <Box
        bg="gray.900"
        // color="gray"
        // width={{ base: "40%", md: "22%", lg: "20%" }}
        // height={{ base: "", md: "88vh", lg: "" }}
        p={3}
        // display="flex"
        // flexDirection="column"
        // alignItems="center"

        // bg=""
        m="2%"
        display={{ base: "", md: "", lg: "flex" }}
        justifyContent="space-around"
      >
        <Box w="100%">
          {/* Title */}
          <Box mb="2">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Select Video
            </Text>
          </Box>
          {/* Upload Section */}
          <Box
            w={{ base: "100%", md: "97%", lg: "97%" }}
            bg="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4"
            h="200px"
          >
            <IconButton
              aria-label="Upload thumbnail"
              icon={<FiUpload />}
              size="lg"
              // w="48px"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              fontSize="58px" // Adjust this value for larger icon size
            />
          </Box>
          {/* Title */}
          <Box mb="2" mt="1%">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Video Thumbnail
            </Text>
          </Box>
          {/* Thumbnail Placeholder */}
          <Box
            w={{ base: "100%", md: "97%", lg: "97%" }}
            bg="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4"
            h="200px"
          >
            Thumbnail
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
            <Input placeholder="Title" bg="gray.300" required />
          </Box>

          {/* Tags */}
          <Box mb="2">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Tags
            </Text>
          </Box>
          <Box mb={2}>
            <Input placeholder="Tags" bg="gray.300" />
          </Box>
          {/* Audience */}
          <Box mb="2">
            <Text fontWeight="bold" color="whiteAlpha.900">
              Audience
            </Text>
          </Box>
          <Box mb={2}>
            <Select
              defaultValue="Above 18"
              bg="gray.300"
              borderRadius="4"
              fontWeight="bold"
              // _focus={{boxShadow: "0 0 0 1px orange" }}
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
            <Textarea placeholder="Description" bg="gray.300" h="200px" />
          </Box>
        </Box>
      </Box>{" "}
      <Box m="2%" w="100%">
        <Button w="96%" bg="#21b8fd">Upload Video</Button>
      </Box>
    </>
  );
}

export default UploadForm;
