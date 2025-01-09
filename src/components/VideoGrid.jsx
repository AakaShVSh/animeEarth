import React, { useEffect, useState } from "react";
import { SimpleGrid, Box, Image, Text } from "@chakra-ui/react";
import VideoCard from "./VideoCard";
import { getVideosApi } from "../services/apis/uploadVideo";

function VideoGrid() {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    if (videos === null) {
      getVideosApi(setVideos);
    }
  }, [videos]);
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} scroll="" spacing="5" m="2%">
      {videos?.map((video, index) => (
        <VideoCard key={index}
          audience={video.audience}
          description={video.description}
          thumbnailUrl={video.thumbnailUrl}
          title={video.title}
          videoUrl={video.videoUrl}
        />
      ))}
    </SimpleGrid>
  );
}

export default VideoGrid;



 {
   /* <Flex p="2" bg="#1e293b" align="center">
        <Box
          w="30px"
          h="30px"
          borderRadius="50%"
          overflow="hidden"
          mr="4" // Adds margin to the right of the image to separate from text
        >
          // Profile Image
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>

        // Title
        <Text fontWeight="bold" fontSize="sm" textAlign="left" color="white">
          {title}
        </Text>
      </Flex> */
 }