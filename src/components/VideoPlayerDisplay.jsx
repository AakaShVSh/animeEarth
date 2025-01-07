import {
  Box,
  HStack,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
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
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const VideoPlayerDisplay = () => {
  const location = useLocation();
  const { videoUrl } = location.state || {};
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        setProgress(
          (videoRef.current.currentTime / videoRef.current.duration) * 100
        );
      }
    };

    const video = videoRef.current;
    video?.addEventListener("timeupdate", updateProgress);

    return () => {
      video?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false); // Exit full-screen mode
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
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
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const handleFullScreenToggle = () => {
    if (isFullScreen) {
      document.exitFullscreen?.();
    } else {
      videoRef.current?.parentNode.requestFullscreen?.();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleVolumeChange = (value) => {
    if (videoRef.current) {
      videoRef.current.volume = value / 100;
    }
    setVolume(value);
  };

  const handleProgressChange = (value) => {
    if (videoRef.current) {
      videoRef.current.currentTime = (value / 100) * videoRef.current.duration;
      setProgress(value);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        setDuration(videoRef.current.duration);
      };
    }
  }, []);

  if (!videoUrl) {
    return <div>No video available to play.</div>;
  }

  return (
    <Box
      bg="gray.400"
      h={{
        base: isFullScreen ? "100vh" : "230px", // Height for mobile devices
        md: isFullScreen ? "100vh" : "620px", // Height for medium and larger screens
      }}
      mb={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="relative"
      overflow="hidden"
      w="100%"
      borderRadius="md"
      _hover={{
        "& .controls-container": {
          display: "flex",
        },
      }}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        autoPlay
        controls={false}
      />

      {/* Controls Container */}
      <Box
        className="controls-container"
        position="absolute"
        bottom="0"
        width="100%"
        display="none"
        flexDirection={{
          base: "column", // Stack controls vertically on mobile
          md: "row", // Horizontal layout on larger screens
        }}
        alignItems="center"
        bg="rgba(0, 0, 0, 0.7)"
        p={4}
      >
        {/* Custom Controls */}
        <HStack
          spacing={{
            base: 2, // Reduced spacing for mobile
            md: 4, // Default spacing for larger screens
          }}
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          mb={{
            base: 2, // Add bottom margin on mobile
            md: 0, // No margin for larger screens
          }}
        >
          {/* Volume Control */}
          <HStack spacing={2} alignItems="center">
            <IconButton
              icon={volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}
              aria-label="Volume"
              colorScheme="whiteAlpha"
              size={{
                // base: "", // Smaller buttons for mobile
                md: "md", // Default size for larger screens
              }}
            />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={100}
              step={1}
              width={{
                base: "50px", // Shorter slider on mobile
                md: "100px", // Default slider width for larger screens
              }}
            >
              <SliderTrack bg="gray.500">
                <SliderFilledTrack bg="white" />
              </SliderTrack>
              <SliderThumb
                boxSize={{
                  base: "10px", // Smaller thumb size for mobile
                  md: "16px", // Default thumb size for larger screens
                }}
              />
            </Slider>
          </HStack>

          {/* Playback Controls */}
          <HStack spacing={4} justifyContent="center">
            <IconButton
              icon={<FaBackward />}
              aria-label="Rewind"
              colorScheme="whiteAlpha"
              size={{
                // base: "sm",
                md: "md",
              }}
              onClick={handleSkipBackward}
            />
            <IconButton
              icon={isPlaying ? <FaPause /> : <FaPlay />}
              aria-label={isPlaying ? "Pause" : "Play"}
              colorScheme="whiteAlpha"
              size={{
                // base: "sm",
                md: "md",
              }}
              onClick={handlePlayPause}
            />
            <IconButton
              icon={<FaForward />}
              aria-label="Forward"
              colorScheme="whiteAlpha"
              size={{
                // base: "sm",
                md: "md",
              }}
              onClick={handleSkipForward}
            />
          </HStack>

          {/* Fullscreen Toggle */}
          <IconButton
            icon={isFullScreen ? <FaCompress /> : <FaExpand />}
            aria-label={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            colorScheme="whiteAlpha"
            size={{
              // base: "sm",
              md: "md",
            }}
            onClick={handleFullScreenToggle}
          />
        </HStack>

        {/* Progress Bar */}
        <HStack
          spacing={2}
          alignItems="center"
          mt={{
            base: 2, // Add top margin for progress bar on mobile
            md: 0, // No margin for larger screens
          }}
          w="100%"
        >
          <Text color="white" fontSize="xs">
            {formatTime(currentTime)}
          </Text>
          <Slider
            aria-label="Progress"
            value={progress}
            onChange={handleProgressChange}
            min={0}
            max={100}
            step={0.1}
            flex="1"
          >
            <SliderTrack bg="gray.500">
              <SliderFilledTrack bg="red.500" />
            </SliderTrack>
            <SliderThumb
              boxSize={{
                base: "10px",
                md: "16px",
              }}
            />
          </Slider>
          <Text color="white" fontSize="xs">
            {formatTime(duration)}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default VideoPlayerDisplay;
