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
    <SimpleGrid columns={[1, 2, 3, 4]} scroll="" spacing="6" m="2%">
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
