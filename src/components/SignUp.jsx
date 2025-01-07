import React, { useState } from "react";
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
  Text,
  Center,
} from "@chakra-ui/react";
import { userSignupApi } from "../services/apis/userAuth";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    termsandcondition: false,
  });

  const handleSignup = (e) => {
    let { name, value, checked } = e.target;
    if (name === "termsandcondition") {
      value = checked;
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const userAuthData = () => {
    if (!data.username || !data.email || !data.termsandcondition) {
      alert("All fields are required");
      return;
    }

    if (!data.email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      return;
    }

    userSignupApi(data);
    navigate("/SignIn");
  };

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
            <FormLabel>Username</FormLabel>
            <Input
              onChange={handleSignup}
              name="username"
              type="text"
              placeholder="Enter your full name"
              focusBorderColor="teal.500"
              variant="filled"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={handleSignup}
              name="email"
              type="email"
              placeholder="Enter your email"
              focusBorderColor="teal.500"
              variant="filled"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              onChange={handleSignup}
              name="password"
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
            <Checkbox
              onChange={handleSignup}
              name="termsandcondition"
              colorScheme="teal"
            >
              I agree to the Terms and Policies
            </Checkbox>
          </Stack>

          <Box w="100%">
            <Text fontSize="sm">
              Have Account?{" "}
              <Text as={"span"} color="teal.500">
                <Link to="/SignIn">Click Here to SignIn</Link>
              </Text>
            </Text>
            <Button
              onClick={userAuthData}
              w="full"
              colorScheme="teal"
              size="lg"
              type="submit"
              mt={0}
            >
              Sign In
            </Button>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignUp;
