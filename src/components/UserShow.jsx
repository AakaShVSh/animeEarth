import React, { useEffect, useState } from 'react'
import { getCookies } from '../services/cookies';
import { getUserVideosApi } from '../services/apis/uploadVideo';
import { SimpleGrid } from '@chakra-ui/react';
import VideoCard from './VideoCard';

const UserShow = () => {
    const [UserShowVideoCollection, setUserShowVideoCollection] = useState([]);
    console.log(UserShowVideoCollection);
    
    useEffect(() => {
        const User = getCookies("_user");
        getUserVideosApi(setUserShowVideoCollection,User)
    },[])
  return (
    <>
      <SimpleGrid columns={[1, 2, 3, 4, 5]} scroll="" spacing="5" m="2%">
        {UserShowVideoCollection?.map((video, index) => (
          <VideoCard
            key={index}
            audience={video.audience}
            description={video.description}
            thumbnailUrl={video.thumbnailUrl}
            title={video.title}
            videoUrl={video.videoUrl}
          />
        ))}
      </SimpleGrid>
    </>
  );
}

export default UserShow
