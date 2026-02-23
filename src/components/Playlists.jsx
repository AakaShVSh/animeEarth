import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Heading,
  Badge,
  SimpleGrid,
  Spinner,
  Image,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  useDisclosure,
  useToast,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { BsCollectionPlay, BsLock, BsUnlock } from "react-icons/bs";
import { MdAdd, MdDelete, MdPlayArrow } from "react-icons/md";
import { checkAuthApi } from "../services/apis/userAuth";
import {
  getPlaylistsApi,
  createOrAddToPlaylistApi,
} from "../services/apis/uploadVideo";
import { useNavigate } from "react-router-dom";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    checkAuthApi().then(({ authenticated, user }) => {
      if (authenticated && user?._id) setUserId(user._id);
      else setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getPlaylistsApi(userId)
      .then((data) => setPlaylists(data.playlists || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userId]);

  const handleCreate = async () => {
    if (!newName.trim() || !userId) return;
    setCreating(true);
    try {
      const data = await createOrAddToPlaylistApi(userId, newName.trim());
      setPlaylists(data.playlists || []);
      setNewName("");
      onClose();
      toast({
        title: `Vault "${newName.trim()}" created`,
        status: "success",
        duration: 2000,
        position: "top",
      });
    } catch {
      toast({
        title: "Failed to create",
        status: "error",
        duration: 2000,
        position: "top",
      });
    } finally {
      setCreating(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCreate();
  };

  // Build a 2×2 mosaic from the first 4 thumbnails in the playlist
  const Mosaic = ({ videos }) => {
    const thumbs = (videos || []).slice(0, 4).filter((v) => v?.thumbnailUrl);
    if (thumbs.length === 0) {
      return (
        <Flex w="100%" h="100%" bg="gray.100" align="center" justify="center">
          <Icon as={BsCollectionPlay} color="gray.300" boxSize="10" />
        </Flex>
      );
    }
    if (thumbs.length === 1) {
      return (
        <Image
          src={thumbs[0].thumbnailUrl}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      );
    }
    return (
      <SimpleGrid columns={2} spacing="1px" w="100%" h="100%">
        {thumbs.map((v, i) => (
          <Box key={i} overflow="hidden" bg="gray.200">
            <Image src={v.thumbnailUrl} w="100%" h="100%" objectFit="cover" />
          </Box>
        ))}
      </SimpleGrid>
    );
  };

  const timeAgo = (date) => {
    if (!date) return "";
    const s = Math.floor((Date.now() - new Date(date)) / 1000);
    for (const [u, v] of Object.entries({
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    })) {
      const i = Math.floor(s / v);
      if (i >= 1) return `${i} ${u}${i > 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  return (
    <Box minH="100vh" bg="gray.50" pb="80px">
      {/* Header */}
      <Box bg="white" borderBottom="1px" borderColor="gray.100" px="6" py="5">
        <HStack spacing="3">
          <Box bg="blue.50" p="3" borderRadius="xl">
            <Icon as={BsCollectionPlay} color="blue.500" boxSize="6" />
          </Box>
          <VStack align="start" spacing="0">
            <Heading size="md" color="gray.800">
              Vaults
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Your playlists
            </Text>
          </VStack>
          <HStack ml="auto" spacing="3">
            {playlists.length > 0 && (
              <Badge
                colorScheme="blue"
                borderRadius="full"
                px="3"
                py="1"
                fontSize="sm"
              >
                {playlists.length} vaults
              </Badge>
            )}
            <Button
              size="sm"
              colorScheme="blue"
              leftIcon={<MdAdd />}
              borderRadius="full"
              onClick={onOpen}
            >
              New Vault
            </Button>
          </HStack>
        </HStack>
      </Box>

      <Box p="6">
        {loading ? (
          <SimpleGrid columns={[1, 2, 3]} spacing="5">
            {[...Array(6)].map((_, i) => (
              <Box
                key={i}
                bg="white"
                borderRadius="xl"
                overflow="hidden"
                boxShadow="sm"
              >
                <Box bg="gray.200" h="160px" />
                <Box p="4">
                  <Box
                    bg="gray.200"
                    h="14px"
                    w="60%"
                    borderRadius="md"
                    mb="2"
                  />
                  <Box bg="gray.100" h="11px" w="40%" borderRadius="md" />
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : playlists.length > 0 ? (
          <SimpleGrid columns={[1, 2, 3]} spacing="5">
            {playlists.map((pl, i) => (
              <Box
                key={pl._id || i}
                bg="white"
                borderRadius="xl"
                overflow="hidden"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.100"
                transition="all 0.22s cubic-bezier(0.4,0,0.2,1)"
                _hover={{
                  boxShadow: "xl",
                  transform: "translateY(-4px)",
                  borderColor: "blue.200",
                }}
                cursor="pointer"
              >
                {/* Mosaic thumbnail */}
                <Box
                  position="relative"
                  w="100%"
                  h="160px"
                  overflow="hidden"
                  bg="gray.100"
                >
                  <Mosaic videos={pl.videos} />
                  {/* Overlay with play hint */}
                  <Box
                    position="absolute"
                    inset="0"
                    bg="blackAlpha.400"
                    opacity="0"
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.2s"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Flex bg="whiteAlpha.900" borderRadius="full" p="3">
                      <Icon as={MdPlayArrow} color="blue.600" boxSize="6" />
                    </Flex>
                  </Box>
                  {/* Video count badge */}
                  <Badge
                    position="absolute"
                    bottom="2"
                    right="2"
                    bg="blackAlpha.800"
                    color="white"
                    fontSize="10px"
                    borderRadius="md"
                    px="2"
                    py="1"
                  >
                    {pl.videos?.length || 0} videos
                  </Badge>
                </Box>

                {/* Info */}
                <Box p="4">
                  <HStack justify="space-between" align="start">
                    <VStack align="start" spacing="1" flex="1" minW={0}>
                      <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
                        {pl.name}
                      </Text>
                      <Text fontSize="xs" color="gray.400">
                        {timeAgo(pl.createdAt)}
                      </Text>
                    </VStack>
                    <HStack spacing="1" flexShrink={0}>
                      <Icon as={BsLock} color="gray.300" boxSize="3" />
                    </HStack>
                  </HStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <VStack spacing="4" py="24" color="gray.400">
            <Icon as={BsCollectionPlay} boxSize="16" />
            <Text fontSize="lg" fontWeight="bold">
              No vaults yet
            </Text>
            <Text fontSize="sm">
              Create a vault to organise your favourite videos
            </Text>
            <Button
              colorScheme="blue"
              leftIcon={<MdAdd />}
              borderRadius="full"
              onClick={onOpen}
            >
              Create your first vault
            </Button>
          </VStack>
        )}
      </Box>

      {/* Create vault modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl">
          <ModalHeader>
            <HStack spacing="3">
              <Box bg="blue.50" p="2" borderRadius="lg">
                <Icon as={BsCollectionPlay} color="blue.500" boxSize="4" />
              </Box>
              <Text>New Vault</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="5">
            <VStack spacing="3">
              <Box w="100%">
                <Text fontSize="sm" fontWeight="medium" mb="2">
                  Vault name
                </Text>
                <Input
                  placeholder="e.g. Design Inspo, JS Tutorials…"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  focusBorderColor="blue.400"
                  borderRadius="lg"
                  autoFocus
                />
              </Box>
              <Button
                w="100%"
                colorScheme="blue"
                borderRadius="xl"
                onClick={handleCreate}
                isLoading={creating}
                isDisabled={!newName.trim()}
                transition="all 0.2s"
              >
                Create Vault
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Playlists;
