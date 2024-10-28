import React from "react";
import {
  Box,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Select,
  VStack,
  Button,
  useColorMode,
  useColorModeValue,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FaUser, FaLock, FaBell, FaPalette } from "react-icons/fa";

const Settings = () => {
  const { toggleColorMode } = useColorMode();
  const formBg = useColorModeValue("white", "gray.700");
  const buttonBg = useColorModeValue("teal.400", "teal.600");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Box p={8} minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <Heading
        mb={8}
        textAlign="center"
        color={useColorModeValue("teal.600", "teal.400")}
      >
        Settings
      </Heading>

      <Box
        maxW="900px"
        mx="auto"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        bg={formBg}
      >
        <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
          <TabList mb={4}>
            <Tab _selected={{ bg: "teal.400", color: "white" }}>
              <HStack spacing={2}>
                <Icon as={FaUser} />
                <span>Account</span>
              </HStack>
            </Tab>
            <Tab _selected={{ bg: "teal.400", color: "white" }}>
              <HStack spacing={2}>
                <Icon as={FaLock} />
                <span>Privacy</span>
              </HStack>
            </Tab>
            <Tab _selected={{ bg: "teal.400", color: "white" }}>
              <HStack spacing={2}>
                <Icon as={FaBell} />
                <span>Notifications</span>
              </HStack>
            </Tab>
            <Tab _selected={{ bg: "teal.400", color: "white" }}>
              <HStack spacing={2}>
                <Icon as={FaPalette} />
                <span>Appearance</span>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* Account Settings */}
            <TabPanel>
              <VStack
                spacing={6}
                align="stretch"
                p={6}
                borderRadius="md"
                boxShadow="md"
                bg={formBg}
                border={`1px solid ${borderColor}`}
              >
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input type="text" placeholder="Enter your username" />
                </FormControl>

                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Enter your email" />
                </FormControl>

                <FormControl id="password">
                  <FormLabel>New Password</FormLabel>
                  <Input type="password" placeholder="Enter new password" />
                </FormControl>

                <Button
                  colorScheme="teal"
                  size="lg"
                  bg={buttonBg}
                  _hover={{ bg: "teal.500" }}
                >
                  Save Changes
                </Button>
              </VStack>
            </TabPanel>

            {/* Privacy Settings */}
            <TabPanel>
              <VStack
                spacing={6}
                align="stretch"
                p={6}
                borderRadius="md"
                boxShadow="md"
                bg={formBg}
                border={`1px solid ${borderColor}`}
              >
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="profile-visibility" mb="0">
                    Make Profile Public
                  </FormLabel>
                  <Switch id="profile-visibility" colorScheme="teal" />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="search-visibility" mb="0">
                    Show in Search Results
                  </FormLabel>
                  <Switch id="search-visibility" colorScheme="teal" />
                </FormControl>

                <Button
                  colorScheme="teal"
                  size="lg"
                  bg={buttonBg}
                  _hover={{ bg: "teal.500" }}
                >
                  Save Privacy Settings
                </Button>
              </VStack>
            </TabPanel>

            {/* Notification Settings */}
            <TabPanel>
              <VStack
                spacing={6}
                align="stretch"
                p={6}
                borderRadius="md"
                boxShadow="md"
                bg={formBg}
                border={`1px solid ${borderColor}`}
              >
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="email-notifications" mb="0">
                    Email Notifications
                  </FormLabel>
                  <Switch id="email-notifications" colorScheme="teal" />
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="push-notifications" mb="0">
                    Push Notifications
                  </FormLabel>
                  <Switch id="push-notifications" colorScheme="teal" />
                </FormControl>

                <Button
                  colorScheme="teal"
                  size="lg"
                  bg={buttonBg}
                  _hover={{ bg: "teal.500" }}
                >
                  Save Notification Settings
                </Button>
              </VStack>
            </TabPanel>

            {/* Appearance Settings */}
            <TabPanel>
              <VStack
                spacing={6}
                align="stretch"
                p={6}
                borderRadius="md"
                boxShadow="md"
                bg={formBg}
                border={`1px solid ${borderColor}`}
              >
                <FormControl>
                  <FormLabel>Color Mode</FormLabel>
                  <Select
                    placeholder="Select color mode"
                    onChange={toggleColorMode}
                  >
                    <option value="light">Light Mode</option>
                    <option value="dark">Dark Mode</option>
                  </Select>
                </FormControl>

                <Button
                  colorScheme="teal"
                  size="lg"
                  bg={buttonBg}
                  _hover={{ bg: "teal.500" }}
                >
                  Save Appearance Settings
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Settings;
