import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Text,
  VStack,
  HStack,
  Badge,
  useToast,
  Kbd,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMic, FiMicOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const VoiceCommandControl = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [lastCommand, setLastCommand] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Available voice commands
  const commands = {
    navigation: {
      "go home": () => navigate("/"),
      "go to home": () => navigate("/"),
      "show trending": () => navigate("/trending"),
      "show trending videos": () => navigate("/trending"),
      "upload video": () => navigate("/Upload"),
      "go to upload": () => navigate("/Upload"),
    },
    playback: {
      "play video": () => handlePlayVideo(),
      "play next": () => handleNextVideo(),
      "play previous": () => handlePreviousVideo(),
      "pause video": () => handlePauseVideo(),
      "stop video": () => handleStopVideo(),
    },
    search: {
      "search for": (query) => handleSearch(query),
      find: (query) => handleSearch(query),
      "show me": (query) => handleSearch(query),
    },
    categories: {
      "show movies": () => navigate("/category/movies"),
      "show music": () => navigate("/category/music"),
      "show music videos": () => navigate("/category/music"),
      "show gaming": () => navigate("/category/gaming"),
      "show gaming videos": () => navigate("/category/gaming"),
      "show education": () => navigate("/category/education"),
      "show educational videos": () => navigate("/category/education"),
    },
    actions: {
      "like this": () => handleLike(),
      "like video": () => handleLike(),
      "save this": () => handleSave(),
      "save video": () => handleSave(),
      "share this": () => handleShare(),
      "share video": () => handleShare(),
    },
    help: {
      help: () => onOpen(),
      "show commands": () => onOpen(),
      "what can you do": () => onOpen(),
      "what can i say": () => onOpen(),
    },
  };

  useEffect(() => {
    // Check if browser supports speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      setIsSupported(true);
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();

      // Configure recognition
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.maxAlternatives = 3;

      // Event handlers
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        toast({
          title: "🎤 Listening...",
          description: "Say a command or ask for help",
          status: "info",
          duration: 2000,
          position: "top",
        });
      };

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        const confidenceScore = event.results[current][0].confidence;

        setTranscript(transcriptText);
        setConfidence(confidenceScore);

        // Only process final results
        if (event.results[current].isFinal) {
          processCommand(transcriptText.toLowerCase().trim());
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);

        if (event.error !== "no-speech") {
          toast({
            title: "Voice Recognition Error",
            description: `Error: ${event.error}`,
            status: "error",
            duration: 3000,
            position: "top",
          });
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setTranscript("");
      };
    } else {
      setIsSupported(false);
      console.warn("Speech recognition not supported in this browser");
    }

    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Process voice command
  const processCommand = (command) => {
    setLastCommand(command);
    let commandExecuted = false;

    // Check all command categories
    for (const category of Object.values(commands)) {
      for (const [trigger, action] of Object.entries(category)) {
        if (command.includes(trigger)) {
          // For search commands, extract the query
          if (
            trigger === "search for" ||
            trigger === "find" ||
            trigger === "show me"
          ) {
            const query = command.replace(trigger, "").trim();
            if (query) {
              action(query);
              commandExecuted = true;
              showCommandFeedback(`Searching for "${query}"`, "success");
              break;
            }
          } else {
            action();
            commandExecuted = true;
            showCommandFeedback(`Executed: ${trigger}`, "success");
            break;
          }
        }
      }
      if (commandExecuted) break;
    }

    if (!commandExecuted) {
      showCommandFeedback(`Command not recognized: "${command}"`, "warning");
    }
  };

  const showCommandFeedback = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 2000,
      position: "top",
    });
  };

  // Command handlers
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement your search logic here
    // navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handlePlayVideo = () => {
    console.log("Playing video");
    // Implement play logic
  };

  const handleNextVideo = () => {
    console.log("Next video");
    // Implement next video logic
  };

  const handlePreviousVideo = () => {
    console.log("Previous video");
    // Implement previous video logic
  };

  const handlePauseVideo = () => {
    console.log("Pausing video");
    // Implement pause logic
  };

  const handleStopVideo = () => {
    console.log("Stopping video");
    // Implement stop logic
  };

  const handleLike = () => {
    console.log("Liking video");
    // Implement like logic
  };

  const handleSave = () => {
    console.log("Saving video");
    // Implement save logic
  };

  const handleShare = () => {
    console.log("Sharing video");
    // Implement share logic
  };

  const toggleListening = () => {
    if (!isSupported) {
      toast({
        title: "Not Supported",
        description:
          "Voice recognition is not supported in your browser. Try Chrome or Edge.",
        status: "error",
        duration: 5000,
        position: "top",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  return (
    <>
      {/* Voice Control Button */}
      <Box
        position="fixed"
        bottom={{ base: "100px", md: "40px" }}
        right="40px"
        zIndex="1000"
      >
        <VStack spacing="2" align="end">
          {/* Transcript Display */}
          {isListening && transcript && (
            <Box
              bg="rgba(0, 0, 0, 0.8)"
              backdropFilter="blur(10px)"
              color="white"
              px="4"
              py="3"
              borderRadius="12px"
              maxW="300px"
              border="1px solid rgba(255, 255, 255, 0.2)"
              boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
            >
              <Text fontSize="xs" color="gray.400" mb="1">
                You said:
              </Text>
              <Text fontSize="sm" fontWeight="medium">
                {transcript}
              </Text>
              {confidence > 0 && (
                <Badge
                  mt="2"
                  colorScheme={
                    confidence > 0.8
                      ? "green"
                      : confidence > 0.5
                        ? "yellow"
                        : "red"
                  }
                  fontSize="10px"
                >
                  {Math.round(confidence * 100)}% confident
                </Badge>
              )}
            </Box>
          )}

          {/* Last Command Display */}
          {!isListening && lastCommand && (
            <Box
              bg="rgba(102, 126, 234, 0.2)"
              backdropFilter="blur(10px)"
              color="white"
              px="3"
              py="2"
              borderRadius="10px"
              fontSize="xs"
              border="1px solid rgba(102, 126, 234, 0.3)"
            >
              Last: {lastCommand}
            </Box>
          )}

          {/* Main Voice Button */}
          <Box position="relative">
            {/* Pulsing Ring Animation */}
            {isListening && (
              <>
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="80px"
                  h="80px"
                  borderRadius="full"
                  bg="rgba(102, 126, 234, 0.3)"
                  animation="pulse 1.5s ease-in-out infinite"
                  sx={{
                    "@keyframes pulse": {
                      "0%": {
                        transform: "translate(-50%, -50%) scale(1)",
                        opacity: 1,
                      },
                      "100%": {
                        transform: "translate(-50%, -50%) scale(1.5)",
                        opacity: 0,
                      },
                    },
                  }}
                />
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="80px"
                  h="80px"
                  borderRadius="full"
                  bg="rgba(102, 126, 234, 0.3)"
                  animation="pulse 1.5s ease-in-out infinite 0.5s"
                  sx={{
                    "@keyframes pulse": {
                      "0%": {
                        transform: "translate(-50%, -50%) scale(1)",
                        opacity: 1,
                      },
                      "100%": {
                        transform: "translate(-50%, -50%) scale(1.5)",
                        opacity: 0,
                      },
                    },
                  }}
                />
              </>
            )}

            {/* Button */}
            <IconButton
              icon={isListening ? <FiMic /> : <FiMicOff />}
              onClick={toggleListening}
              size="lg"
              borderRadius="full"
              bg={
                isListening
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "rgba(255, 255, 255, 0.1)"
              }
              backdropFilter="blur(10px)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              color="white"
              boxShadow={
                isListening
                  ? "0 8px 32px rgba(102, 126, 234, 0.6)"
                  : "0 4px 20px rgba(0, 0, 0, 0.2)"
              }
              _hover={{
                transform: "scale(1.1)",
                boxShadow: "0 12px 48px rgba(102, 126, 234, 0.8)",
              }}
              _active={{ transform: "scale(0.95)" }}
              transition="all 0.3s"
              w="70px"
              h="70px"
              fontSize="28px"
              aria-label="Voice Control"
            />

            {/* Hint Badge */}
            {!isListening && (
              <Badge
                position="absolute"
                top="-10px"
                right="-10px"
                colorScheme="purple"
                borderRadius="full"
                fontSize="10px"
                px="2"
                py="1"
              >
                <Kbd fontSize="10px">V</Kbd>
              </Badge>
            )}
          </Box>
        </VStack>
      </Box>

      {/* Help Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent
          bg="rgba(0, 0, 0, 0.9)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255, 255, 255, 0.1)"
          color="white"
        >
          <ModalCloseButton />
          <ModalBody p="6">
            <VStack align="stretch" spacing="4">
              <HStack spacing="3">
                <Box
                  as={FiMic}
                  fontSize="32px"
                  bgGradient="linear(to-r, #667eea, #764ba2)"
                  bgClip="text"
                />
                <Text fontSize="2xl" fontWeight="bold">
                  Voice Commands
                </Text>
              </HStack>

              <Text fontSize="sm" color="gray.400">
                Click the microphone button and say any of these commands:
              </Text>

              {/* Navigation Commands */}
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="purple.400" mb="2">
                  📍 Navigation
                </Text>
                <VStack align="stretch" spacing="1" pl="4">
                  <Text fontSize="sm">"Go home" or "Go to home"</Text>
                  <Text fontSize="sm">
                    "Show trending" or "Show trending videos"
                  </Text>
                  <Text fontSize="sm">"Upload video"</Text>
                </VStack>
              </Box>

              {/* Playback Commands */}
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="blue.400" mb="2">
                  ▶️ Playback
                </Text>
                <VStack align="stretch" spacing="1" pl="4">
                  <Text fontSize="sm">"Play video"</Text>
                  <Text fontSize="sm">"Pause video"</Text>
                  <Text fontSize="sm">"Play next" or "Play previous"</Text>
                </VStack>
              </Box>

              {/* Search Commands */}
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="green.400" mb="2">
                  🔍 Search
                </Text>
                <VStack align="stretch" spacing="1" pl="4">
                  <Text fontSize="sm">"Search for [topic]"</Text>
                  <Text fontSize="sm">"Find [topic]"</Text>
                  <Text fontSize="sm">"Show me [topic]"</Text>
                </VStack>
              </Box>

              {/* Category Commands */}
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="pink.400" mb="2">
                  🎬 Categories
                </Text>
                <VStack align="stretch" spacing="1" pl="4">
                  <Text fontSize="sm">
                    "Show movies" / "Show music" / "Show gaming"
                  </Text>
                  <Text fontSize="sm">"Show education"</Text>
                </VStack>
              </Box>

              {/* Action Commands */}
              <Box>
                <Text fontSize="sm" fontWeight="bold" color="orange.400" mb="2">
                  ⚡ Actions
                </Text>
                <VStack align="stretch" spacing="1" pl="4">
                  <Text fontSize="sm">"Like this" or "Like video"</Text>
                  <Text fontSize="sm">"Save this" or "Save video"</Text>
                  <Text fontSize="sm">"Share this" or "Share video"</Text>
                </VStack>
              </Box>

              <Box
                bg="rgba(102, 126, 234, 0.1)"
                border="1px solid rgba(102, 126, 234, 0.3)"
                borderRadius="8px"
                p="3"
                mt="2"
              >
                <Text fontSize="xs" color="gray.400">
                  💡 Tip: You can also press <Kbd>V</Kbd> on your keyboard to
                  activate voice control
                </Text>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VoiceCommandControl;
