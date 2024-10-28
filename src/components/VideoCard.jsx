import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function VideoCard() {
  return (
    <Link to={"/VideoPlayer"}>
      <Box
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
      >
        <Image
          src="https://via.placeholder.com/300x200"
          alt="Gaming Thumbnail"
          objectFit="cover"
        />
        <Box p="4" bg="gray.700">
          <Text fontWeight="bold" textAlign="center">
            awesome gaming video
          </Text>
        </Box>
      </Box>
    </Link>
  );
}

export default VideoCard;
