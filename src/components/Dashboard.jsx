import React from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  Progress,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const bg = useColorModeValue("#363b46", "#363b46");
  const boxBg = useColorModeValue("gray.600", "purple.800");
  const textColor = useColorModeValue("white", "gray.100");

  // Sample data for the graph
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Income ($)",
        data: [120, 200, 150, 80, 180, 250, 300, 200, 240, 300, 500, 700],
        borderColor: "#00b5d8",
        backgroundColor: "rgba(0,181,216,0.2)",
        pointBorderColor: "#00b5d8",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <Box p={4} minH="100vh" bg={bg} color={textColor}>
      {/* Income Overview */}
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
        mb={8}
      >
        <Box bg={boxBg} p={6} borderRadius="lg" textAlign="center" shadow="md">
          <Heading size="lg" color={textColor}>
            0.04
          </Heading>
          <Text mt={2} color={textColor}>
            This Month's Income
          </Text>
        </Box>
        <Box bg={boxBg} p={6} borderRadius="lg" textAlign="center" shadow="md">
          <Heading size="lg" color={textColor}>
            0.04
          </Heading>
          <Text mt={2} color={textColor}>
            Yesterday's Income
          </Text>
        </Box>
        <Box bg={boxBg} p={6} borderRadius="lg" textAlign="center" shadow="md">
          <Heading size="lg" color={textColor}>
            550
          </Heading>
          <Text mt={2} color={textColor}>
            Overall Income
          </Text>
        </Box>
      </Grid>

      {/* Graph Section */}
      <Flex
        justifyContent="center"
        alignItems="center"
        mb={8}
        flexDirection="column"
      >
        <Box
          bg={boxBg}
          p={4}
          borderRadius="lg"
          shadow="md"
          width={{ base: "100%", md: "80%", lg: "60%" }}
          overflow="hidden"
        >
          <Line data={data} />
        </Box>
      </Flex>

      {/* Withdrawal Section */}
      <VStack
        spacing={6}
        bg={boxBg}
        p={6}
        borderRadius="lg"
        shadow="md"
        maxW="lg"
        mx="auto"
      >
        <Text fontSize="lg" textAlign="center">
          Withdrawals available after $1000 income
        </Text>
        <Progress
          value={55}
          colorScheme="teal"
          size="lg"
          width="full"
          borderRadius="lg"
        />
        <Button colorScheme="teal" size="lg" isDisabled>
          Withdraw
        </Button>
      </VStack>
    </Box>
  );
};

export default Dashboard;
