import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  VStack,
  useColorModeValue,
  Text,
  Link,
  Center,
} from "@chakra-ui/react";

const SignUp = () => {
  return (
    <Center
      height={{ base: "92.9vh", md: "91.9vh", lg: "90.6vh" }}
      bg="gray.900"
    >
      <Box
        p={8}
        maxW="400px"
        w="full"
        boxShadow="lg"
        borderRadius="lg"
        bg="gray.700"
        color="white"
      >
        <VStack spacing={5}>
          <Heading as="h2" size="lg" textAlign="center">
            Sign Up
          </Heading>

          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your full name"
              focusBorderColor="teal.500"
              variant="filled"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              focusBorderColor="teal.500"
              variant="filled"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Create a password"
              focusBorderColor="teal.500"
              variant="filled"
            />
          </FormControl>

          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              focusBorderColor="teal.500"
              variant="filled"
            />
          </FormControl>

          <Stack spacing={5} w="full">
            <Checkbox colorScheme="teal">
              I agree to the Terms and Policies
            </Checkbox>
          </Stack>

          <Box w="100%">
            <Text fontSize="sm">
              Have Account?{" "}
              <Text as={"span"} color="teal.500">
                Click Here to SignUp
              </Text>
            </Text>
            <Button w="full" colorScheme="teal" size="lg" type="submit" mt={0}>
              Sign In
            </Button>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignUp;
