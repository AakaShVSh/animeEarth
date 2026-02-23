import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  Heading,
  Avatar,
  Badge,
  Button,
  IconButton,
  Progress,
  Divider,
  SimpleGrid,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import {
  MdTrendingUp,
  MdTrendingDown,
  MdOutlineVideoLibrary,
  MdOutlinePeople,
  MdOutlineVisibility,
  MdOutlineAttachMoney,
  MdOutlineThumbUp,
  MdOutlineComment,
  MdOutlineShare,
  MdOutlineDownload,
  MdOutlineNotifications,
  MdOutlineSettings,
  MdOutlineMoreVert,
  MdOutlinePlayCircle,
  MdOutlineTimer,
  MdOutlineBarChart,
  MdOutlineCalendarToday,
} from "react-icons/md";
import { BsArrowUpRight, BsThreeDots } from "react-icons/bs";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  ChartTooltip,
  Legend,
);

// ── Data ────────────────────────────────────────────────────
const earningsData = {
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
      label: "Revenue ($)",
      data: [120, 200, 150, 180, 240, 280, 320, 260, 310, 420, 580, 740],
      borderColor: "#3182CE",
      backgroundColor: "rgba(49,130,206,0.08)",
      pointBackgroundColor: "#3182CE",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 4,
      tension: 0.4,
      fill: true,
    },
    {
      label: "Last Year ($)",
      data: [80, 120, 100, 130, 160, 190, 200, 180, 210, 260, 340, 480],
      borderColor: "#CBD5E0",
      backgroundColor: "transparent",
      pointBackgroundColor: "#CBD5E0",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 3,
      tension: 0.4,
      fill: false,
      borderDash: [4, 4],
    },
  ],
};

const viewsData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Views",
      data: [12400, 18200, 15800, 22100, 19600, 28400, 24800],
      backgroundColor: "rgba(49,130,206,0.7)",
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

const audienceData = {
  labels: ["18–24", "25–34", "35–44", "45–54", "55+"],
  datasets: [
    {
      data: [28, 35, 20, 11, 6],
      backgroundColor: ["#3182CE", "#63B3ED", "#90CDF4", "#BEE3F8", "#EBF8FF"],
      borderWidth: 0,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index", intersect: false },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: "#A0AEC0", font: { size: 11 } },
    },
    y: {
      grid: { color: "rgba(0,0,0,0.04)" },
      border: { display: false },
      ticks: { color: "#A0AEC0", font: { size: 11 } },
    },
  },
};

const barOptions = {
  ...chartOptions,
  plugins: { ...chartOptions.plugins, legend: { display: false } },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  cutout: "72%",
};

const recentVideos = [
  {
    title: "Building React from Scratch",
    views: "128K",
    likes: "4.2K",
    comments: "312",
    revenue: "$84.20",
    date: "Jan 15",
    status: "Published",
  },
  {
    title: "CSS Grid Mastery Guide",
    views: "89K",
    likes: "3.1K",
    comments: "198",
    revenue: "$61.40",
    date: "Jan 8",
    status: "Published",
  },
  {
    title: "Node.js Advanced Patterns",
    views: "65K",
    likes: "2.8K",
    comments: "241",
    revenue: "$48.90",
    date: "Dec 28",
    status: "Published",
  },
  {
    title: "TypeScript Deep Dive",
    views: "43K",
    likes: "1.9K",
    comments: "156",
    revenue: "$32.60",
    date: "Dec 20",
    status: "Published",
  },
  {
    title: "Docker for Developers",
    views: "32K",
    likes: "1.4K",
    comments: "89",
    revenue: "$24.10",
    date: "Dec 12",
    status: "Published",
  },
];

const topContent = [
  { rank: 1, title: "Building React from Scratch", pct: 92, views: "1.2M" },
  { rank: 2, title: "CSS Grid Mastery", pct: 74, views: "890K" },
  { rank: 3, title: "Node.js Patterns", pct: 61, views: "654K" },
  { rank: 4, title: "TypeScript Deep Dive", pct: 48, views: "432K" },
];

const ageLabels = ["18–24", "25–34", "35–44", "45–54", "55+"];

// ── Stat Card ────────────────────────────────────────────────
const StatCard = ({ icon, label, value, change, positive, suffix = "" }) => (
  <Box
    bg="white"
    border="1px solid"
    borderColor="gray.200"
    borderRadius="xl"
    p={5}
    boxShadow="sm"
    transition="all 0.2s"
    _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
  >
    <HStack justify="space-between" mb={4}>
      <Flex
        w="40px"
        h="40px"
        bg="blue.50"
        borderRadius="lg"
        align="center"
        justify="center"
      >
        <Icon as={icon} color="blue.500" boxSize={5} />
      </Flex>
      <Badge
        colorScheme={positive ? "green" : "red"}
        variant="subtle"
        borderRadius="full"
        px={2}
        py={0.5}
        fontSize="xs"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <Icon as={positive ? MdTrendingUp : MdTrendingDown} boxSize={3} />
        {change}
      </Badge>
    </HStack>
    <Text
      fontSize="2xl"
      fontWeight="800"
      color="gray.800"
      letterSpacing="tight"
    >
      {value}
      {suffix}
    </Text>
    <Text
      fontSize="xs"
      color="gray.500"
      mt={1}
      fontFamily="mono"
      letterSpacing="wide"
      textTransform="uppercase"
    >
      {label}
    </Text>
  </Box>
);

// ── Main Component ───────────────────────────────────────────
const Dashboard = () => {
  const [period, setPeriod] = useState("This Year");

  const withdrawn = 550;
  const goal = 1000;
  const pct = Math.round((withdrawn / goal) * 100);

  return (
    <Box bg="gray.50" minH="100vh" pb={10}>
      {/* ── TOP BAR ── */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        px={{ base: 4, md: 8 }}
        py={4}
        position="sticky"
        top={0}
        zIndex={20}
        boxShadow="sm"
      >
        <Flex align="center" justify="space-between">
          <VStack align="flex-start" spacing={0}>
            <Text
              fontSize="xs"
              fontFamily="mono"
              color="gray.400"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              Creator Studio
            </Text>
            <Heading
              size="md"
              color="gray.800"
              fontWeight="800"
              letterSpacing="tight"
            >
              Dashboard
            </Heading>
          </VStack>

          <HStack spacing={3}>
            <Select
              size="sm"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="lg"
              fontFamily="mono"
              fontSize="xs"
              color="gray.600"
              w="140px"
              _focus={{ borderColor: "blue.400" }}
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
              <option>All Time</option>
            </Select>
            <Tooltip label="Notifications">
              <IconButton
                icon={<MdOutlineNotifications />}
                aria-label="Notifications"
                variant="ghost"
                size="sm"
                borderRadius="lg"
                color="gray.500"
                _hover={{ bg: "blue.50", color: "blue.500" }}
              />
            </Tooltip>
            <Tooltip label="Settings">
              <IconButton
                icon={<MdOutlineSettings />}
                aria-label="Settings"
                variant="ghost"
                size="sm"
                borderRadius="lg"
                color="gray.500"
                _hover={{ bg: "blue.50", color: "blue.500" }}
              />
            </Tooltip>
            <Avatar
              size="sm"
              name="Aakash Vishwakarma"
              bg="blue.500"
              color="white"
              fontWeight="bold"
              cursor="pointer"
            />
          </HStack>
        </Flex>
      </Box>

      <Box px={{ base: 4, md: 8 }} pt={7}>
        {/* ── STAT CARDS ── */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={7}>
          <StatCard
            icon={MdOutlineAttachMoney}
            label="Total Revenue"
            value="$3,248"
            change="+18.4%"
            positive
          />
          <StatCard
            icon={MdOutlineVisibility}
            label="Total Views"
            value="12.4M"
            change="+24.1%"
            positive
          />
          <StatCard
            icon={MdOutlinePeople}
            label="Subscribers"
            value="245K"
            change="+5.2%"
            positive
          />
          <StatCard
            icon={MdOutlineVideoLibrary}
            label="Videos Published"
            value="128"
            change="-2 this wk"
            positive={false}
          />
        </SimpleGrid>

        {/* ── CHARTS ROW ── */}
        <Grid templateColumns={{ base: "1fr", lg: "1.6fr 1fr" }} gap={5} mb={5}>
          {/* Revenue chart */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
            boxShadow="sm"
          >
            <Flex justify="space-between" align="center" mb={5}>
              <VStack align="flex-start" spacing={0}>
                <Text
                  fontSize="xs"
                  fontFamily="mono"
                  color="gray.400"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  Revenue
                </Text>
                <Heading size="md" color="gray.800" fontWeight="800">
                  $3,248.60
                </Heading>
                <HStack spacing={1} mt={0.5}>
                  <Icon as={MdTrendingUp} color="green.400" boxSize={3.5} />
                  <Text fontSize="xs" color="green.500" fontFamily="mono">
                    +18.4% vs last year
                  </Text>
                </HStack>
              </VStack>
              <HStack spacing={4}>
                <HStack spacing={1.5}>
                  <Box w="10px" h="2px" bg="blue.500" borderRadius="full" />
                  <Text fontSize="xs" color="gray.400" fontFamily="mono">
                    This Year
                  </Text>
                </HStack>
                <HStack spacing={1.5}>
                  <Box w="10px" h="2px" bg="gray.300" borderRadius="full" />
                  <Text fontSize="xs" color="gray.400" fontFamily="mono">
                    Last Year
                  </Text>
                </HStack>
              </HStack>
            </Flex>
            <Box h="220px">
              <Line data={earningsData} options={chartOptions} />
            </Box>
          </Box>

          {/* Weekly views bar */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
            boxShadow="sm"
          >
            <Flex justify="space-between" align="center" mb={5}>
              <VStack align="flex-start" spacing={0}>
                <Text
                  fontSize="xs"
                  fontFamily="mono"
                  color="gray.400"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  Weekly Views
                </Text>
                <Heading size="md" color="gray.800" fontWeight="800">
                  131.3K
                </Heading>
                <HStack spacing={1} mt={0.5}>
                  <Icon as={MdTrendingUp} color="green.400" boxSize={3.5} />
                  <Text fontSize="xs" color="green.500" fontFamily="mono">
                    +9.2% this week
                  </Text>
                </HStack>
              </VStack>
              <Icon as={MdOutlineBarChart} color="blue.400" boxSize={5} />
            </Flex>
            <Box h="220px">
              <Bar data={viewsData} options={barOptions} />
            </Box>
          </Box>
        </Grid>

        {/* ── MIDDLE ROW ── */}
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr 1fr" }}
          gap={5}
          mb={5}
        >
          {/* Audience Doughnut */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
            boxShadow="sm"
          >
            <Text
              fontSize="xs"
              fontFamily="mono"
              color="gray.400"
              letterSpacing="widest"
              textTransform="uppercase"
              mb={1}
            >
              Audience Age
            </Text>
            <Heading size="sm" color="gray.800" fontWeight="800" mb={5}>
              Demographics
            </Heading>
            <Flex
              align="center"
              justify="center"
              gap={6}
              direction={{ base: "column", sm: "row" }}
            >
              <Box h="140px" w="140px" flexShrink={0}>
                <Doughnut data={audienceData} options={doughnutOptions} />
              </Box>
              <VStack align="flex-start" spacing={2} flex={1}>
                {ageLabels.map((label, i) => (
                  <HStack key={label} w="full" justify="space-between">
                    <HStack spacing={2}>
                      <Box
                        w="8px"
                        h="8px"
                        borderRadius="full"
                        bg={audienceData.datasets[0].backgroundColor[i]}
                      />
                      <Text fontSize="xs" color="gray.600" fontFamily="mono">
                        {label}
                      </Text>
                    </HStack>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      color="gray.700"
                      fontFamily="mono"
                    >
                      {audienceData.datasets[0].data[i]}%
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Flex>
          </Box>

          {/* Engagement metrics */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
            boxShadow="sm"
          >
            <Text
              fontSize="xs"
              fontFamily="mono"
              color="gray.400"
              letterSpacing="widest"
              textTransform="uppercase"
              mb={1}
            >
              Engagement
            </Text>
            <Heading size="sm" color="gray.800" fontWeight="800" mb={5}>
              Key Metrics
            </Heading>
            <VStack spacing={4} align="stretch">
              {[
                {
                  icon: MdOutlineThumbUp,
                  label: "Total Likes",
                  value: "248K",
                  color: "blue.500",
                },
                {
                  icon: MdOutlineComment,
                  label: "Comments",
                  value: "18.4K",
                  color: "blue.400",
                },
                {
                  icon: MdOutlineShare,
                  label: "Shares",
                  value: "32.1K",
                  color: "blue.300",
                },
                {
                  icon: MdOutlineTimer,
                  label: "Avg Watch Time",
                  value: "8m 42s",
                  color: "blue.200",
                },
              ].map(({ icon, label, value, color }) => (
                <HStack
                  key={label}
                  justify="space-between"
                  py={2}
                  borderBottom="1px solid"
                  borderColor="gray.50"
                >
                  <HStack spacing={3}>
                    <Flex
                      w="32px"
                      h="32px"
                      bg="blue.50"
                      borderRadius="lg"
                      align="center"
                      justify="center"
                    >
                      <Icon as={icon} color={color} boxSize={4} />
                    </Flex>
                    <Text fontSize="sm" color="gray.600">
                      {label}
                    </Text>
                  </HStack>
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    color="gray.800"
                    fontFamily="mono"
                  >
                    {value}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Withdrawal card */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
            boxShadow="sm"
          >
            <Text
              fontSize="xs"
              fontFamily="mono"
              color="gray.400"
              letterSpacing="widest"
              textTransform="uppercase"
              mb={1}
            >
              Monetisation
            </Text>
            <Heading size="sm" color="gray.800" fontWeight="800" mb={5}>
              Withdrawal Status
            </Heading>

            <Flex justify="center" mb={5}>
              <CircularProgress
                value={pct}
                color="blue.500"
                trackColor="blue.50"
                size="120px"
                thickness="8px"
              >
                <CircularProgressLabel>
                  <VStack spacing={0}>
                    <Text fontSize="lg" fontWeight="800" color="gray.800">
                      {pct}%
                    </Text>
                    <Text fontSize="9px" color="gray.400" fontFamily="mono">
                      of goal
                    </Text>
                  </VStack>
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>

            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="xs" color="gray.500" fontFamily="mono">
                  Earned
                </Text>
                <Text
                  fontSize="sm"
                  fontWeight="700"
                  color="gray.800"
                  fontFamily="mono"
                >
                  ${withdrawn}
                </Text>
              </HStack>
              <Progress
                value={pct}
                colorScheme="blue"
                size="sm"
                borderRadius="full"
                bg="blue.50"
              />
              <HStack justify="space-between">
                <Text fontSize="xs" color="gray.400" fontFamily="mono">
                  $0
                </Text>
                <Text fontSize="xs" color="gray.400" fontFamily="mono">
                  Goal: $1,000
                </Text>
              </HStack>
            </VStack>

            <Divider my={4} borderColor="gray.100" />
            <Text
              fontSize="xs"
              color="gray.400"
              textAlign="center"
              mb={3}
              fontFamily="mono"
            >
              ${goal - withdrawn} more to unlock withdrawals
            </Text>
            <Button
              w="full"
              colorScheme="blue"
              size="md"
              borderRadius="lg"
              isDisabled
              fontFamily="mono"
              fontSize="sm"
              fontWeight="bold"
              _disabled={{
                bg: "gray.100",
                color: "gray.400",
                cursor: "not-allowed",
                border: "1px solid",
                borderColor: "gray.200",
              }}
            >
              Withdraw Funds
            </Button>
          </Box>
        </Grid>

        {/* ── TOP PERFORMING ── */}
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1.8fr" }} gap={5} mb={5}>
          {/* Top content */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
            boxShadow="sm"
          >
            <HStack justify="space-between" mb={5}>
              <VStack align="flex-start" spacing={0}>
                <Text
                  fontSize="xs"
                  fontFamily="mono"
                  color="gray.400"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  Content
                </Text>
                <Heading size="sm" color="gray.800" fontWeight="800">
                  Top Performing
                </Heading>
              </VStack>
              <Icon as={MdOutlinePlayCircle} color="blue.400" boxSize={5} />
            </HStack>
            <VStack spacing={4} align="stretch">
              {topContent.map(({ rank, title, pct, views }) => (
                <Box key={rank}>
                  <HStack justify="space-between" mb={1.5}>
                    <HStack spacing={2} flex={1} minW={0}>
                      <Text
                        fontSize="xs"
                        fontWeight="800"
                        color="blue.500"
                        fontFamily="mono"
                        w="16px"
                      >
                        #{rank}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="gray.700"
                        noOfLines={1}
                        flex={1}
                      >
                        {title}
                      </Text>
                    </HStack>
                    <Text
                      fontSize="xs"
                      fontFamily="mono"
                      color="gray.400"
                      flexShrink={0}
                      ml={2}
                    >
                      {views}
                    </Text>
                  </HStack>
                  <Progress
                    value={pct}
                    colorScheme="blue"
                    size="xs"
                    borderRadius="full"
                    bg="blue.50"
                  />
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Recent uploads table */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
            boxShadow="sm"
            overflowX="auto"
          >
            <HStack justify="space-between" mb={5}>
              <VStack align="flex-start" spacing={0}>
                <Text
                  fontSize="xs"
                  fontFamily="mono"
                  color="gray.400"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  Videos
                </Text>
                <Heading size="sm" color="gray.800" fontWeight="800">
                  Recent Uploads
                </Heading>
              </VStack>
              <Button
                size="xs"
                variant="ghost"
                color="blue.500"
                fontFamily="mono"
                fontSize="xs"
                rightIcon={<BsArrowUpRight />}
                _hover={{ bg: "blue.50" }}
              >
                View All
              </Button>
            </HStack>
            <Table size="sm" variant="simple">
              <Thead>
                <Tr>
                  <Th
                    color="gray.400"
                    fontFamily="mono"
                    fontSize="9px"
                    letterSpacing="widest"
                    borderColor="gray.100"
                    textTransform="uppercase"
                  >
                    Title
                  </Th>
                  <Th
                    color="gray.400"
                    fontFamily="mono"
                    fontSize="9px"
                    letterSpacing="widest"
                    borderColor="gray.100"
                    textTransform="uppercase"
                    isNumeric
                  >
                    Views
                  </Th>
                  <Th
                    color="gray.400"
                    fontFamily="mono"
                    fontSize="9px"
                    letterSpacing="widest"
                    borderColor="gray.100"
                    textTransform="uppercase"
                    isNumeric
                  >
                    Likes
                  </Th>
                  <Th
                    color="gray.400"
                    fontFamily="mono"
                    fontSize="9px"
                    letterSpacing="widest"
                    borderColor="gray.100"
                    textTransform="uppercase"
                    isNumeric
                  >
                    Revenue
                  </Th>
                  <Th
                    color="gray.400"
                    fontFamily="mono"
                    fontSize="9px"
                    letterSpacing="widest"
                    borderColor="gray.100"
                    textTransform="uppercase"
                  >
                    Date
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentVideos.map((v) => (
                  <Tr
                    key={v.title}
                    _hover={{ bg: "gray.50" }}
                    transition="background 0.15s"
                  >
                    <Td borderColor="gray.100" py={3}>
                      <Text
                        fontSize="sm"
                        color="gray.700"
                        fontWeight="medium"
                        noOfLines={1}
                        maxW="200px"
                      >
                        {v.title}
                      </Text>
                    </Td>
                    <Td borderColor="gray.100" isNumeric>
                      <Text fontSize="xs" fontFamily="mono" color="gray.600">
                        {v.views}
                      </Text>
                    </Td>
                    <Td borderColor="gray.100" isNumeric>
                      <Text fontSize="xs" fontFamily="mono" color="gray.600">
                        {v.likes}
                      </Text>
                    </Td>
                    <Td borderColor="gray.100" isNumeric>
                      <Text
                        fontSize="xs"
                        fontFamily="mono"
                        color="green.600"
                        fontWeight="bold"
                      >
                        {v.revenue}
                      </Text>
                    </Td>
                    <Td borderColor="gray.100">
                      <Text fontSize="xs" fontFamily="mono" color="gray.400">
                        {v.date}
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Grid>

        {/* ── QUICK ACTIONS + GOALS ── */}
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={5}>
          {/* Quick actions */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
            boxShadow="sm"
          >
            <Text
              fontSize="xs"
              fontFamily="mono"
              color="gray.400"
              letterSpacing="widest"
              textTransform="uppercase"
              mb={1}
            >
              Studio
            </Text>
            <Heading size="sm" color="gray.800" fontWeight="800" mb={5}>
              Quick Actions
            </Heading>
            <SimpleGrid columns={2} spacing={3}>
              {[
                {
                  icon: MdOutlineVideoLibrary,
                  label: "Upload Video",
                  color: "blue",
                },
                {
                  icon: MdOutlineCalendarToday,
                  label: "Schedule Post",
                  color: "blue",
                },
                {
                  icon: MdOutlineBarChart,
                  label: "View Analytics",
                  color: "blue",
                },
                {
                  icon: MdOutlineDownload,
                  label: "Export Report",
                  color: "blue",
                },
              ].map(({ icon, label }) => (
                <Button
                  key={label}
                  variant="outline"
                  borderColor="gray.200"
                  borderRadius="xl"
                  h="72px"
                  flexDirection="column"
                  gap={2}
                  color="gray.600"
                  fontFamily="mono"
                  fontSize="xs"
                  fontWeight="medium"
                  _hover={{
                    bg: "blue.50",
                    borderColor: "blue.300",
                    color: "blue.600",
                  }}
                  transition="all 0.15s"
                >
                  <Icon as={icon} boxSize={5} />
                  {label}
                </Button>
              ))}
            </SimpleGrid>
          </Box>

          {/* Monthly goals */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            p={5}
            boxShadow="sm"
          >
            <Text
              fontSize="xs"
              fontFamily="mono"
              color="gray.400"
              letterSpacing="widest"
              textTransform="uppercase"
              mb={1}
            >
              Progress
            </Text>
            <Heading size="sm" color="gray.800" fontWeight="800" mb={5}>
              Monthly Goals
            </Heading>
            <VStack spacing={5} align="stretch">
              {[
                {
                  label: "Revenue Target",
                  current: "$740",
                  goal: "$1,000",
                  pct: 74,
                },
                {
                  label: "Subscriber Growth",
                  current: "12.4K",
                  goal: "20K",
                  pct: 62,
                },
                {
                  label: "Upload Frequency",
                  current: "8 videos",
                  goal: "12 videos",
                  pct: 67,
                },
                {
                  label: "Avg Watch Time",
                  current: "7m 12s",
                  goal: "10m",
                  pct: 72,
                },
              ].map(({ label, current, goal, pct }) => (
                <Box key={label}>
                  <HStack justify="space-between" mb={1.5}>
                    <Text fontSize="sm" color="gray.700" fontWeight="medium">
                      {label}
                    </Text>
                    <HStack spacing={1}>
                      <Text
                        fontSize="xs"
                        fontFamily="mono"
                        color="blue.500"
                        fontWeight="bold"
                      >
                        {current}
                      </Text>
                      <Text fontSize="xs" fontFamily="mono" color="gray.300">
                        /
                      </Text>
                      <Text fontSize="xs" fontFamily="mono" color="gray.400">
                        {goal}
                      </Text>
                    </HStack>
                  </HStack>
                  <Progress
                    value={pct}
                    colorScheme="blue"
                    size="sm"
                    borderRadius="full"
                    bg="blue.50"
                  />
                  <Text
                    fontSize="10px"
                    fontFamily="mono"
                    color="gray.400"
                    mt={1}
                  >
                    {pct}% complete
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
