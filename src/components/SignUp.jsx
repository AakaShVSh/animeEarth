// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   FormControl,
//   FormLabel,
//   Input,
//   Heading,
//   VStack,
//   Text,
//   Center,
//   Link as ChakraLink,
//   useToast,
//   InputGroup,
//   InputRightElement,
//   IconButton,
//   Divider,
//   HStack,
// } from "@chakra-ui/react";
// import { googleAuthApi, userSignupApi } from "../services/apis/userAuth";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const toast = useToast();
//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);

//   const handleSignup = (e) => {
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
//     if (
//       !data.username ||
//       !data.email ||
//       !data.password ||
//       !data.confirmPassword
//     ) {
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

//     if (data.password !== data.confirmPassword) {
//       toast({
//         title: "Password Mismatch",
//         description: "Passwords do not match",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//       return;
//     }

//     if (data.password.length < 6) {
//       toast({
//         title: "Weak Password",
//         description: "Password must be at least 6 characters long",
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
//       await userSignupApi({
//         username: data.username,
//         email: data.email,
//         password: data.password,
//         termsandcondition: agreeToTerms,
//       });
//       toast({
//         title: "Success",
//         description: "Account created successfully",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//         position: "top",
//       });
//       navigate("/SignIn");
//     } catch (error) {
//       toast({
//         title: "Sign Up Failed",
//         description:
//           error.message || "Failed to create account. Please try again.",
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
//               Create Account
//             </Heading>
//             <Text fontSize="sm" color="gray.600" textAlign="center">
//               Sign up to get started
//             </Text>
//           </VStack>

//           <VStack spacing={3} w="full">
//             <FormControl id="username" isRequired>
//               <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
//                 Username
//               </FormLabel>
//               <Input
//                 onChange={handleSignup}
//                 onKeyPress={handleKeyPress}
//                 name="username"
//                 type="text"
//                 placeholder="Enter your username"
//                 value={data.username}
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

//             <FormControl id="email" isRequired>
//               <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
//                 Email Address
//               </FormLabel>
//               <Input
//                 onChange={handleSignup}
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
//                   onChange={handleSignup}
//                   onKeyPress={handleKeyPress}
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Create a password"
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

//             <FormControl id="confirmPassword" isRequired>
//               <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
//                 Confirm Password
//               </FormLabel>
//               <InputGroup size="md">
//                 <Input
//                   onChange={handleSignup}
//                   onKeyPress={handleKeyPress}
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Confirm your password"
//                   value={data.confirmPassword}
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
//                       showConfirmPassword ? "Hide password" : "Show password"
//                     }
//                     icon={
//                       showConfirmPassword ? (
//                         <AiOutlineEyeInvisible size={18} />
//                       ) : (
//                         <AiOutlineEye size={18} />
//                       )
//                     }
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     variant="ghost"
//                     size="sm"
//                     color="gray.600"
//                     _hover={{ bg: "gray.100" }}
//                   />
//                 </InputRightElement>
//               </InputGroup>
//             </FormControl>

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
//               loadingText="Creating Account..."
//               _hover={{
//                 transform: "translateY(-2px)",
//                 boxShadow: "lg",
//               }}
//               transition="all 0.2s"
//             >
//               Sign Up
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
//               Already have an account?{" "}
//               <ChakraLink
//                 as={Link}
//                 to="/SignIn"
//                 color="blue.500"
//                 fontWeight="semibold"
//                 _hover={{ textDecoration: "underline" }}
//               >
//                 Sign In
//               </ChakraLink>
//             </Text>
//           </VStack>
//         </VStack>
//       </Box>
//     </Center>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  Center,
  Link as ChakraLink,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { googleAuthApi, userSignupApi } from "../services/apis/userAuth";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const userAuthData = async () => {
    if (
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
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
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (data.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters",
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
    const result = await userSignupApi({
      username: data.username,
      email: data.email,
      password: data.password,
      termsandcondition: agreeToTerms,
    });
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Success",
        description: "Account created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/SignIn");
    } else {
      toast({
        title: "Sign Up Failed",
        description: result.message || "Failed to create account",
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
              Create Account
            </Heading>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Sign up to get started
            </Text>
          </VStack>

          <VStack spacing={3} w="full">
            <FormControl id="username" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                Username
              </FormLabel>
              <Input
                onChange={handleSignup}
                onKeyPress={handleKeyPress}
                name="username"
                type="text"
                placeholder="Enter your username"
                value={data.username}
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

            <FormControl id="email" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                Email Address
              </FormLabel>
              <Input
                onChange={handleSignup}
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
                  onChange={handleSignup}
                  onKeyPress={handleKeyPress}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
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

            <FormControl id="confirmPassword" isRequired>
              <FormLabel fontSize="sm" fontWeight="medium" color="gray.700">
                Confirm Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  onChange={handleSignup}
                  onKeyPress={handleKeyPress}
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={data.confirmPassword}
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
                    aria-label={showConfirmPassword ? "Hide" : "Show"}
                    icon={
                      showConfirmPassword ? (
                        <AiOutlineEyeInvisible size={18} />
                      ) : (
                        <AiOutlineEye size={18} />
                      )
                    }
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    variant="ghost"
                    size="sm"
                    color="gray.600"
                    _hover={{ bg: "gray.100" }}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

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
              loadingText="Creating Account..."
              _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
              transition="all 0.2s"
            >
              Sign Up
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
              Already have an account?{" "}
              <ChakraLink
                as={Link}
                to="/SignIn"
                color="blue.500"
                fontWeight="semibold"
                _hover={{ textDecoration: "underline" }}
              >
                Sign In
              </ChakraLink>
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default SignUp;