// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   FormControl,
//   FormLabel,
//   Input,
//   Text,
//   Heading,
//   Center,
//   VStack,
//   Link as ChakraLink,
//   useToast,
//   InputGroup,
//   InputRightElement,
//   IconButton,
//   Divider,
//   HStack,
// } from "@chakra-ui/react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { googleAuthApi, userSigninApi } from "../services/apis/userAuth";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);

//   const handleSignin = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const userAuthData = async () => {
//     if (!data.email || !data.password) {
//       toast({
//         title: "Required Fields",
//         description: "Please fill in all fields",
//         status: "warning",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//       return;
//     }

//     if (!validateEmail(data.email)) {
//       toast({
//         title: "Invalid Email",
//         description: "Please enter a valid email address",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//       return;
//     }

//     if (!agreeToTerms) {
//       toast({
//         title: "Terms and Policies",
//         description: "Please agree to the Terms and Policies to continue",
//         status: "warning",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await userSigninApi(data);
//       toast({
//         title: "Success",
//         description: "Signed in successfully",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//       navigate("/");
//     } catch (error) {
//       toast({
//         title: "Sign In Failed",
//         description: error.message || "Invalid credentials. Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       userAuthData();
//     }
//   };

//   const handleGoogleAuth = () => {
//     googleAuthApi();
//   };

//   return (
//     <Center
//       h={{ base: "92.9vh", md: "91.9vh", lg: "91.5vh" }}
//       w="100%"
//       bg="gray.50"
//     >
//       <Box p={{ base: 6, md: 8 }} maxW="400px" w="full">
//         <VStack spacing={4}>
//           <VStack spacing={1}>
//             <Heading as="h2" size="lg" textAlign="center" color="gray.800">
//               Welcome Back
//             </Heading>
//             <Text fontSize="sm" color="gray.600" textAlign="center">
//               Sign in to continue to your account
//             </Text>
//           </VStack>

//           <VStack spacing={3} w="full">
//             <FormControl id="email" isRequired>
//               <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
//                 Email Address
//               </FormLabel>
//               <Input
//                 onChange={handleSignin}
//                 onKeyPress={handleKeyPress}
//                 name="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={data.email}
//                 focusBorderColor="blue.500"
//                 bg="white"
//                 border="1px"
//                 borderColor="gray.300"
//                 _hover={{ borderColor: "gray.400" }}
//                 _focus={{
//                   borderColor: "blue.500",
//                   boxShadow: "0 0 0 1px #3182ce",
//                 }}
//                 size="md"
//               />
//             </FormControl>

//             <FormControl id="password" isRequired>
//               <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
//                 Password
//               </FormLabel>
//               <InputGroup size="md">
//                 <Input
//                   onChange={handleSignin}
//                   onKeyPress={handleKeyPress}
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={data.password}
//                   focusBorderColor="blue.500"
//                   bg="white"
//                   border="1px"
//                   borderColor="gray.300"
//                   _hover={{ borderColor: "gray.400" }}
//                   _focus={{
//                     borderColor: "blue.500",
//                     boxShadow: "0 0 0 1px #3182ce",
//                   }}
//                 />
//                 <InputRightElement>
//                   <IconButton
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                     icon={
//                       showPassword ? (
//                         <AiOutlineEyeInvisible size={18} />
//                       ) : (
//                         <AiOutlineEye size={18} />
//                       )
//                     }
//                     onClick={() => setShowPassword(!showPassword)}
//                     variant="ghost"
//                     size="sm"
//                     color="gray.600"
//                     _hover={{ bg: "gray.100" }}
//                   />
//                 </InputRightElement>
//               </InputGroup>
//             </FormControl>

//             <HStack w="full" justify="space-between">
//               <Checkbox
//                 colorScheme="blue"
//                 isChecked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 size="sm"
//               >
//                 <Text fontSize="sm" color="gray.600">
//                   Remember me
//                 </Text>
//               </Checkbox>
//               <ChakraLink
//                 as={Link}
//                 to="/forgot-password"
//                 color="blue.500"
//                 fontSize="sm"
//                 fontWeight="medium"
//                 _hover={{ textDecoration: "underline" }}
//               >
//                 Forgot Password?
//               </ChakraLink>
//             </HStack>

//             <Checkbox
//               colorScheme="blue"
//               w="full"
//               isChecked={agreeToTerms}
//               onChange={(e) => setAgreeToTerms(e.target.checked)}
//               size="sm"
//             >
//               <Text fontSize="sm" color="gray.600">
//                 I agree to the{" "}
//                 <ChakraLink
//                   color="blue.500"
//                   fontWeight="medium"
//                   _hover={{ textDecoration: "underline" }}
//                 >
//                   Terms and Policies
//                 </ChakraLink>
//               </Text>
//             </Checkbox>

//             <Button
//               onClick={userAuthData}
//               w="full"
//               colorScheme="blue"
//               size="md"
//               isLoading={isLoading}
//               loadingText="Signing In..."
//               _hover={{
//                 transform: "translateY(-2px)",
//                 boxShadow: "lg",
//               }}
//               transition="all 0.2s"
//             >
//               Sign In
//             </Button>

//             <HStack w="full" spacing={3}>
//               <Divider />
//               <Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
//                 OR
//               </Text>
//               <Divider />
//             </HStack>

//             <Button
//               onClick={handleGoogleAuth}
//               w="full"
//               variant="outline"
//               size="md"
//               leftIcon={<FcGoogle size={20} />}
//               _hover={{
//                 bg: "gray.50",
//                 transform: "translateY(-2px)",
//                 boxShadow: "md",
//               }}
//               transition="all 0.2s"
//             >
//               Continue with Google
//             </Button>

//             <Text fontSize="sm" color="gray.600" textAlign="center">
//               Don't have an account?{" "}
//               <ChakraLink
//                 as={Link}
//                 to="/SignUp"
//                 color="blue.500"
//                 fontWeight="semibold"
//                 _hover={{ textDecoration: "underline" }}
//               >
//                 Sign Up
//               </ChakraLink>
//             </Text>
//           </VStack>
//         </VStack>
//       </Box>
//     </Center>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
  Heading,
  Center,
  VStack,
  Link as ChakraLink,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { googleAuthApi, userSigninApi } from "../services/apis/userAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignin = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const userAuthData = async () => {
    if (!data.email || !data.password) {
      toast({
        title: "Required Fields",
        description: "Please fill in all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!validateEmail(data.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (!agreeToTerms) {
      toast({
        title: "Terms and Policies",
        description: "Please agree to the Terms and Policies",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setIsLoading(true);
    const result = await userSigninApi(data);
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Success",
        description: "Signed in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    } else {
      toast({
        title: "Sign In Failed",
        description: result.message || "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") userAuthData();
  };

  return (
    <Center
      h={{ base: "92.9vh", md: "91.9vh", lg: "91.5vh" }}
      w="100%"
      bg="gray.50"
    >
      <Box p={{ base: 6, md: 8 }} maxW="400px" w="full">
        <VStack spacing={4}>
          <VStack spacing={1}>
            <Heading as="h2" size="lg" textAlign="center" color="gray.800">
              Welcome Back
            </Heading>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Sign in to continue to your account
            </Text>
          </VStack>

          <VStack spacing={3} w="full">
            <FormControl id="email" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                Email Address
              </FormLabel>
              <Input
                onChange={handleSignin}
                onKeyPress={handleKeyPress}
                name="email"
                type="email"
                placeholder="Enter your email"
                value={data.email}
                focusBorderColor="blue.500"
                bg="white"
                border="1px"
                borderColor="gray.300"
                _hover={{ borderColor: "gray.400" }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 1px #3182ce",
                }}
                size="md"
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  onChange={handleSignin}
                  onKeyPress={handleKeyPress}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={data.password}
                  focusBorderColor="blue.500"
                  bg="white"
                  border="1px"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.400" }}
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 1px #3182ce",
                  }}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? "Hide" : "Show"}
                    icon={
                      showPassword ? (
                        <AiOutlineEyeInvisible size={18} />
                      ) : (
                        <AiOutlineEye size={18} />
                      )
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    size="sm"
                    color="gray.600"
                    _hover={{ bg: "gray.100" }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <HStack w="full" justify="space-between">
              <Checkbox
                colorScheme="blue"
                isChecked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                size="sm"
              >
                <Text fontSize="sm" color="gray.600">
                  Remember me
                </Text>
              </Checkbox>
              <ChakraLink
                as={Link}
                to="/forgot-password"
                color="blue.500"
                fontSize="sm"
                fontWeight="medium"
                _hover={{ textDecoration: "underline" }}
              >
                Forgot Password?
              </ChakraLink>
            </HStack>

            <Checkbox
              colorScheme="blue"
              w="full"
              isChecked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              size="sm"
            >
              <Text fontSize="sm" color="gray.600">
                I agree to the{" "}
                <ChakraLink
                  color="blue.500"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  Terms and Policies
                </ChakraLink>
              </Text>
            </Checkbox>

            <Button
              onClick={userAuthData}
              w="full"
              colorScheme="blue"
              size="md"
              isLoading={isLoading}
              loadingText="Signing In..."
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              transition="all 0.2s"
            >
              Sign In
            </Button>

            <HStack w="full" spacing={3}>
              <Divider />
              <Text fontSize="xs" color="gray.500" whiteSpace="nowrap">
                OR
              </Text>
              <Divider />
            </HStack>

            <Button
              onClick={googleAuthApi}
              w="full"
              variant="outline"
              size="md"
              leftIcon={<FcGoogle size={20} />}
              _hover={{
                bg: "gray.50",
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              Continue with Google
            </Button>

            <Text fontSize="sm" color="gray.600" textAlign="center">
              Don't have an account?{" "}
              <ChakraLink
                as={Link}
                to="/SignUp"
                color="blue.500"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
              >
                Sign Up
              </ChakraLink>
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignIn;