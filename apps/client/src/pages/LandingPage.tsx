import {
  Box,
  Button,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FiBarChart2,
  FiBriefcase,
  FiCpu,
  FiDollarSign,
  FiFeather,
  FiHeart,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useColorModeValue } from "../components/ui/color-mode";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartValuation = () => {
    navigate("/start");
  };

  return (
    <Box>
      {/* Hero Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100vh"
        bg={useColorModeValue("gray.50", "gray.800")}
        px={8}
        textAlign="center"
      >
        <Heading
          as="h1"
          size="2xl"
          fontWeight="bold"
          maxW="2xl"
          mb={4}
          color={useColorModeValue("gray.900", "white")}
        >
          Unlock the True Value of Your Business
        </Heading>
        <Text
          maxW="2xl"
          fontSize="lg"
          color={useColorModeValue("gray.600", "gray.400")}
          mb={8}
        >
          Our AI-powered platform provides you with an accurate and instant
          business valuation. Make informed decisions with confidence.
        </Text>
        <Button
          colorScheme="blue"
          size="lg"
          px={8}
          py={6}
          fontWeight="bold"
          letterSpacing="wide"
          textTransform="uppercase"
          onClick={handleStartValuation}
        >
          Get Your Free Valuation
        </Button>
      </Flex>

      {/* Features Section */}
      <Box p={16}>
        <VStack gap={12}>
          <Heading as="h2" size="xl" fontWeight="bold">
            Key Features
          </Heading>
          <HStack gap={8} justify="center">
            <FeatureCard
              icon={FiBarChart2}
              title="Accurate Valuations"
              text="Our advanced algorithms analyze your financial data to provide you with a precise and reliable valuation."
            />
            <FeatureCard
              icon={FiCpu}
              title="Instant Results"
              text="No more waiting. Get your business valuation in minutes."
            />
            <FeatureCard
              icon={FiDollarSign}
              title="Data-Driven Insights"
              text="Understand the key drivers of your business's value and get actionable insights to improve it."
            />
          </HStack>
        </VStack>
      </Box>

      {/* How It Works Section */}
      <Box p={16} bg={useColorModeValue("gray.50", "gray.800")}>
        <VStack gap={12}>
          <Heading as="h2" size="xl" fontWeight="bold">
            How It Works
          </Heading>
          <HStack gap={8} justify="center">
            <Step
              icon={FiFeather}
              title="Submit Your Financials"
              text="Easily and securely enter your company's financial data into our platform."
            />
            <Step
              icon={FiBriefcase}
              title="Run the Valuation"
              text="Our AI will process your data and run a comprehensive valuation analysis."
            />
            <Step
              icon={FiHeart}
              title="Get Your Report"
              text="Receive a detailed valuation report with key metrics and insights."
            />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const FeatureCard = ({ icon, title, text }: any) => {
  return (
    <VStack
      gap={4}
      p={8}
      bg={useColorModeValue("white", "gray.700")}
      borderRadius="xl"
      shadow="md"
      maxW="sm"
      textAlign="center"
    >
      <Circle size={16} bg={useColorModeValue("blue.50", "blue.900")}>
        <Icon as={icon} boxSize={8} color="blue.500" />
      </Circle>
      <Heading as="h3" size="md" fontWeight="bold">
        {title}
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.400")}>{text}</Text>
    </VStack>
  );
};

const Step = ({ icon, title, text }: any) => {
  return (
    <VStack gap={4} maxW="sm" textAlign="center">
      <Circle size={16} bg={useColorModeValue("white", "gray.700")}>
        <Icon as={icon} boxSize={8} color="blue.500" />
      </Circle>
      <Heading as="h3" size="md" fontWeight="bold">
        {title}
      </Heading>
      <Text color={useColorModeValue("gray.600", "gray.400")}>{text}</Text>
    </VStack>
  );
};

export default LandingPage;
