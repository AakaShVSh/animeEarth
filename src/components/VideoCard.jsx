import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({
  audience,
  description,
  thumbnailUrl,
  title,
  videoUrl,
}) => {
  const navigate = useNavigate();
console.log(videoUrl);

  const playVideo = () => {
     navigate("/VideoPlayer", { state: { videoUrl } });
  };

  return (
    <Box
      onClick={playVideo}
      maxW="sm"
      h={"100%"}
      _hover={{
        transform: "scale(1.1)",
        transition: "0.5s ease-in-out",
      }}
      borderRadius="lg"
      cursor="pointer"
      overflow="hidden"
      bg="blue.900"
      color="white"
      position="relative"
    >
      {/* Thumbnail as default */}
      <Image
        src={thumbnailUrl}
        alt="Gaming Thumbnail"
        objectFit="cover"
        width="100%"
        // height=""
        display="block"
      />

      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="blackAlpha.800"
        opacity="0"
        transition="opacity 0.3s"
        _hover={{ opacity: "1" }}
      >
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box p="4" bg="gray.700">
        <Text fontWeight="bold" textAlign="center">
          {title}
        </Text>
      </Box>
    </Box>
  );
};

export default VideoCard;
