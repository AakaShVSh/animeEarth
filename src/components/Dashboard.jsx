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
  Center,
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
  const bg = useColorModeValue("gray.100", "gray.900");
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
    <Box
      p={2}
      height={{ base: "92.9vh", md: "91.9vh", lg: "90.6vh" }}
      bg="gray.900"
      // minH="100vh"
      color="white"
    >
      {/* Income Overview */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8}>
        <Box bg={boxBg} p={6} borderRadius="lg" textAlign="center">
          <Heading size="lg" color={textColor}>
            0.04
          </Heading>
          <Text color={textColor}>This Month's Income</Text>
        </Box>
        <Box bg={boxBg} p={6} borderRadius="lg" textAlign="center">
          <Heading size="lg" color={textColor}>
            0.04
          </Heading>
          <Text color={textColor}>Yesterday's Income</Text>
        </Box>
        <Box bg={boxBg} p={6} borderRadius="lg" textAlign="center">
          <Heading size="lg" color={textColor}>
            550
          </Heading>
          <Text color={textColor}>Overall Income</Text>
        </Box>
      </Grid>

      {/* Graph Section */}
      <Box m="auto" bg="gray.700" p={3}  h="50%" w="50%" borderRadius="lg" mb={5}>
        <Line data={data} />
      </Box>

      {/* Withdrawal Section */}
      <VStack spacing={4}>
        <Text fontSize="lg">Withdrawals available after 1000 income</Text>
        <Progress value={55} colorScheme="teal" size="lg" width="full" />
        <Button colorScheme="teal" size="lg" isDisabled>
          Withdraw
        </Button>
      </VStack>
    </Box>
  );
};

export default Dashboard;
