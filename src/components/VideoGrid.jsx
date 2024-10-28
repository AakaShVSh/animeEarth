import React from "react";
import { SimpleGrid, Box, Image, Text } from "@chakra-ui/react";
import VideoCard from "./VideoCard";

function VideoGrid() {
  const videos = Array(20).fill({
    title: "Awesome gaming video",
    thumbnail: "https://via.placeholder.com/150",
  });

  return (
    <SimpleGrid columns={[1, 2, 3, 4]}  scroll="" spacing="6" m="2%">
      {videos.map((video, index) => (
        <VideoCard />
      ))}
    </SimpleGrid>
  );
}

export default VideoGrid;
