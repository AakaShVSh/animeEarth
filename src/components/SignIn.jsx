import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  Center,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { userSigninApi } from "../services/apis/userAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSignin = (e) => {
    let { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const userAuthData = () => {
    if (!data.email || !data.password) {
      alert("All fields are required");
      return;
    }

    if (!data.email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address");
      return;
    }

    userSigninApi(data);
    navigate("/");
  };
  console.log(data);

  return (
    <Center
      height={{ base: "92.9vh", md: "91.9vh", lg: "91.5vh" }}
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
            Sign In
          </Heading>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={handleSignin}
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
              onChange={handleSignin}
              name="password"
              type="password"
              placeholder="Enter your password"
              focusBorderColor="teal.500"
              variant="filled"
            />
            <Link color="teal.500" fontSize="sm" alignSelf="flex-end" mt={1}>
              Forgot Password?
            </Link>
          </FormControl>

          <Stack spacing={5} w="full">
            <Checkbox colorScheme="teal">
              I agree to the Terms and Policies
            </Checkbox>
            <Checkbox colorScheme="teal">Remember Me</Checkbox>
          </Stack>
          <Box w="100%">
            <Text fontSize="sm">
              Have Account?{" "}
              <Text as={"span"} color="teal.500">
                <Link to={"/SignUp"}>Click Here to SignUp</Link>
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

export default SignIn;
