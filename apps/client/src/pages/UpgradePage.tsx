import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
  Circle,
  Image,
} from "@chakra-ui/react";
import { FiCpu, FiArrowRight } from "react-icons/fi"; // Assuming these icons are needed based on LandingPage.tsx

const UpgradePage = () => {
  const handleGetStarted = () => {
    // Implement navigation logic or other actions for "Get Started"
    console.log("Get Started clicked!");
  };

  const handleViewMore = () => {
    // Implement navigation logic or other actions for "View More"
    console.log("View More clicked!");
  };

  return (
    <Box>
      {/* Hero Section */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="883px" // From design spec
        bg="linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)" // Placeholder, will refine background from "Frame 205.png"
        backgroundImage="url('/public/logo.png')" // Placeholder, needs actual image from spec
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        overflow="hidden"
        px={8}
        textAlign="center"
      >
        {/* Navigation Bar - Reusing elements from design spec */}
        <Flex
          justify="space-between"
          align="center"
          padding="20px 150px"
          width="1440px"
          height="88px"
          position="absolute"
          top="0"
          left="0"
          zIndex="10"
        >
          {/* Logo - Placeholder */}
          <Box width="122px" height="33px" bg="gray.300">
            <Image src="/public/logo.png" alt="Upgrade Inc Logo" />
          </Box>

          {/* Nav Links */}
          <HStack gap="24px">
            <Text
              color="#DCDCDC"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Personal Loan
            </Text>
            <Text
              color="#DCDCDC"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              One Card
            </Text>
            <Text
              color="#DCDCDC"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Savings
            </Text>
            <Text
              color="#DCDCDC"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Checking
            </Text>
            <Text
              color="#DCDCDC"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Help
            </Text>
          </HStack>

          {/* Sign In Button */}
          <Button
            border="1px solid #DCDCDC"
            borderRadius="12px"
            padding="10px"
            height="48px"
            color="#DCDCDC"
            fontFamily="'Poppins'"
            fontSize="16px"
            fontWeight="600"
            bg="transparent"
            _hover={{ bg: "rgba(255,255,255,0.1)" }}
          >
            Sign In
          </Button>
        </Flex>

        {/* Hero Content */}
        <VStack
          gap="40px"
          width="1140px"
          height="461px"
          mt="120px" // Adjust to push content down from nav
          position="relative"
          zIndex="5"
        >
          <HStack
            gap="157px"
            width="1140px"
            height="576px"
            align="center"
            justify="center"
          >
            {/* Left Content */}
            <VStack align="flex-start" gap="24px" width="537px">
              <HStack
                bg="rgba(255, 255, 255, 0.18)"
                borderRadius="100px"
                padding="6px 16px 6px 12px"
                gap="4px"
                height="33px"
              >
                <Icon as={FiCpu} color="white" /> {/* Placeholder icon */}
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="500"
                  fontSize="14px"
                  lineHeight="150%"
                  color="#F9FAFB"
                >
                  100% TRUSTED PLATFORM
                </Text>
              </HStack>

              <VStack align="flex-start" gap="12px">
                <Text
                  fontFamily="'Integral CF'"
                  fontWeight="400"
                  fontSize="64px"
                  lineHeight="120%"
                  letterSpacing="0.04em"
                  textTransform="capitalize"
                  color="#FFFFFF"
                >
                  Finance with Security And{" "}
                  <Text as="span" color="#E2FF54">
                    Flexibility
                  </Text>
                </Text>
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="500"
                  fontSize="18px"
                  lineHeight="150%"
                  textTransform="capitalize"
                  color="#DCDCDC"
                  width="523px"
                >
                  no-fee checking account with cash back rewards. Enjoy fee-free
                  banking and earn cash back on your everyday purchases.
                </Text>
              </VStack>

              <HStack gap="0px">
                <Button
                  bg="#00B512"
                  borderRadius="44px"
                  padding="24px 32px 24px 24px"
                  height="52px"
                  color="#F9FAFB"
                  fontFamily="'Poppins'"
                  fontSize="16px"
                  fontWeight="600"
                  lineHeight="150%"
                  onClick={handleGetStarted}
                  _hover={{ bg: "#009E0F" }}
                >
                  Open Account
                </Button>
                <Circle
                  size="52px"
                  bg="#FBF9F1"
                  borderRadius="200px"
                  marginLeft="-20px"
                >
                  <Icon as={FiArrowRight} boxSize={6} color="#344054" />
                </Circle>
              </HStack>
            </VStack>

            {/* Right Image/Graphic - Placeholder */}
            <Box width="561px" height="576px" bg="gray.600">
              {/* This section needs to be built out based on image/graphic details */}
            </Box>
          </HStack>
        </VStack>
      </Flex>

      {/* Trust Badges/Logos */}
      <Flex
        justify="center"
        align="center"
        padding="20px 44px"
        gap="92px"
        width="1440px"
        height="80px"
        bg="#04684C"
      >
        {/* Logos here - Placeholder */}
        <Text color="white">Logos Section (Visa, Mastercard, etc.)</Text>
      </Flex>

      {/* All your money needs in one app section */}
      <Flex
        align="center"
        padding="120px 150px 100px"
        gap="85px"
        width="1440px"
        height="827px"
      >
        {/* Left Side: Chart/Image - Placeholder */}
        <Box
          width="494px"
          height="483px"
          bg="#F5F5F5"
          border="1px solid rgba(0, 0, 0, 0.06)"
          borderRadius="20px"
          position="relative"
        >
          <Box
            width="390px"
            height="377px"
            bg="#004852"
            borderRadius="20px"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            {/* Inner chart details */}
          </Box>
        </Box>

        {/* Right Side: Features */}
        <VStack align="flex-start" gap="40px" width="561px">
          <HStack
            bg="#F9FAFB"
            border="1px solid #EAECF0"
            borderRadius="100px"
            padding="6px 16px 6px 12px"
            gap="4px"
            height="33px"
          >
            <Icon as={FiCpu} color="gray.700" /> {/* Placeholder icon */}
            <Text
              fontFamily="'Poppins'"
              fontWeight="500"
              fontSize="14px"
              lineHeight="150%"
              color="#031B1D"
              textTransform="uppercase"
            >
              About Us
            </Text>
          </HStack>
          <Heading
            fontFamily="'Integral CF'"
            fontWeight="500"
            fontSize="48px"
            lineHeight="120%"
            textTransform="capitalize"
            color="#000000"
            width="524px"
          >
            All your money needs in one app
          </Heading>

          <VStack align="flex-start" gap="12px">
            {/* Feature 1 */}
            <Flex
              border="1px solid #E5E5E5"
              borderRadius="20px"
              padding="24px 20px"
              gap="22px"
              width="530px"
              bg="#F1FFD2"
            >
              <VStack align="flex-start" gap="8px">
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="700"
                  fontSize="20px"
                  lineHeight="150%"
                  color="#000000"
                >
                  Expenses Tracker
                </Text>
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="150%"
                  color="#000000"
                  opacity="0.8"
                >
                  Our comprehensive selection of medications, supplements, and
                  healthcare products.
                </Text>
              </VStack>
            </Flex>

            {/* Feature 2 */}
            <Flex
              border="1px solid #E5E5E5"
              borderRadius="20px"
              padding="24px 20px"
              gap="22px"
              width="530px"
              bg="transparent"
            >
              <VStack align="flex-start" gap="8px">
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="700"
                  fontSize="20px"
                  lineHeight="150%"
                  color="#011821"
                >
                  Crypto Connection
                </Text>
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="150%"
                  color="#6B6969"
                  opacity="0.8"
                >
                  From advanced imaging technology such as MRI and CT scanners
                  to precision surgical tools.
                </Text>
              </VStack>
            </Flex>

            {/* Feature 3 */}
            <Flex
              border="1px solid #E5E5E5"
              borderRadius="20px"
              padding="24px 20px"
              gap="22px"
              width="530px"
              bg="transparent"
            >
              <VStack align="flex-start" gap="8px">
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="700"
                  fontSize="20px"
                  lineHeight="150%"
                  color="#011821"
                >
                  Automated Invoicing
                </Text>
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="150%"
                  color="#6B6969"
                  opacity="0.8"
                >
                  We're committed to leveraging the latest innovations in
                  medical technology.
                </Text>
              </VStack>
            </Flex>
          </VStack>
        </VStack>
      </Flex>

      {/* All the features in one app (second time) */}
      <Flex
        align="center"
        padding="100px 150px 120px"
        gap="83px"
        width="1440px"
        height="676px"
      >
        {/* Left Side: Text Content */}
        <VStack align="flex-start" gap="40px" width="498px">
          <HStack
            bg="#F9FAFB"
            border="1px solid #EAECF0"
            borderRadius="100px"
            padding="6px 16px 6px 12px"
            gap="4px"
            height="33px"
          >
            <Icon as={FiCpu} color="gray.700" /> {/* Placeholder icon */}
            <Text
              fontFamily="'Poppins'"
              fontWeight="500"
              fontSize="14px"
              lineHeight="150%"
              color="#031B1D"
              textTransform="uppercase"
            >
              featured
            </Text>
          </HStack>
          <Heading
            fontFamily="'Integral CF'"
            fontWeight="400"
            fontSize="48px"
            lineHeight="120%"
            color="#090909"
            width="498px"
          >
            All the features in one app
          </Heading>
          <VStack align="flex-start" gap="16px" width="484px">
            <Text
              fontFamily="'Poppins'"
              fontWeight="400"
              fontSize="16px"
              lineHeight="150%"
              textTransform="capitalize"
              color="#676666"
            >
              Get 3% cash back on everyday purchases, 2% on everything else4
            </Text>
            <Text
              fontFamily="'Poppins'"
              fontWeight="400"
              fontSize="16px"
              lineHeight="150%"
              textTransform="capitalize"
              color="#676666"
            >
              Extra Spending Power when you have Rewards Checking through
              Upgrade6
            </Text>
          </VStack>
          <HStack gap="0px">
            <Button
              border="0.8px solid #40AF3E"
              borderRadius="44px"
              padding="24px 32px 24px 24px"
              height="52px"
              color="#000000"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="600"
              lineHeight="150%"
              onClick={handleGetStarted}
              bg="transparent"
              _hover={{ bg: "gray.100" }}
            >
              Get Started
            </Button>
            <Circle
              size="52px"
              bg="#00B512"
              borderRadius="200px"
              marginLeft="-20px"
            >
              <Icon as={FiArrowRight} boxSize={6} color="#FFFFFF" />
            </Circle>
          </HStack>
        </VStack>

        {/* Right Side: Image/Graphic - Placeholder */}
        <Box
          width="559px"
          height="456px"
          bg="#F6F9F8"
          border="1px solid rgba(0, 0, 0, 0.06)"
          borderRadius="20px"
          position="relative"
        >
          {/* Group 469289 and images */}
        </Box>
      </Flex>

      {/* Trustworthiness section */}
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        padding="120px 150px"
        gap="82px"
        width="1440px"
        height="760px"
        bg="linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%)" // Placeholder, will refine background from "Frame 205.png"
        backgroundImage="url('/public/logo.png')" // Placeholder, needs actual image from spec
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {/* Left Image/Graphic - Placeholder */}
        <Box width="442px" height="520px" bg="gray.700"></Box>

        {/* Right Side: Text Content */}
        <VStack align="flex-start" gap="40px" width="597px">
          <HStack
            bg="#003B47"
            border="1px solid #014526"
            borderRadius="100px"
            padding="6px 16px 6px 12px"
            gap="4px"
            height="33px"
          >
            <Icon as={FiCpu} color="white" /> {/* Placeholder icon */}
            <Text
              fontFamily="'Poppins'"
              fontWeight="500"
              fontSize="14px"
              lineHeight="150%"
              color="#FFFFFF"
              textTransform="uppercase"
            >
              trustworthiness
            </Text>
          </HStack>
          <Heading
            fontFamily="'Integral CF'"
            fontWeight="400"
            fontSize="48px"
            lineHeight="120%"
            textTransform="capitalize"
            color="#FFFFFF"
            width="597px"
          >
            We value your trust and security
          </Heading>
          <Text
            fontFamily="'Poppins'"
            fontWeight="400"
            fontSize="16px"
            lineHeight="150%"
            textTransform="capitalize"
            color="#DBDBDB"
            width="597px"
          >
            Our mission is to make finance more accessible, transparent, and
            secure for everyone. With cutting.
          </Text>
          <HStack gap="0px">
            <Button
              bg="#00B512"
              borderRadius="44px"
              padding="24px 32px 24px 24px"
              height="52px"
              color="#F9FAFB"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="600"
              lineHeight="150%"
              onClick={handleGetStarted}
              _hover={{ bg: "#009E0F" }}
            >
              Get Started
            </Button>
            <Circle
              size="52px"
              bg="#FBF9F1"
              borderRadius="200px"
              marginLeft="-20px"
            >
              <Icon as={FiArrowRight} boxSize={6} color="#344054" />
            </Circle>
          </HStack>
        </VStack>
      </Flex>

      {/* Services Section */}
      <VStack
        padding="120px 150px"
        gap="60px"
        width="1437px"
        minHeight="1928px"
      >
        <HStack
          bg="#F9FAFB"
          border="1px solid #EAECF0"
          borderRadius="100px"
          padding="6px 16px 6px 12px"
          gap="4px"
          height="33px"
        >
          <Icon as={FiCpu} color="gray.700" /> {/* Placeholder icon */}
          <Text
            fontFamily="'Poppins'"
            fontWeight="500"
            fontSize="14px"
            lineHeight="150%"
            color="#031B1D"
            textTransform="uppercase"
          >
            services
          </Text>
        </HStack>
        <Heading
          fontFamily="'Integral CF'"
          fontWeight="400"
          fontSize="48px"
          lineHeight="120%"
          textTransform="capitalize"
          color="#000000"
          textAlign="center"
          width="615px"
        >
          Can Help You Achieve Financial Success
        </Heading>

        <VStack gap="40px" width="1140px">
          {/* Services Row 1 */}
          <Box
            width="1141px"
            height="352px"
            bg="#F6F9F8"
            border="1px solid rgba(0, 0, 0, 0.06)"
            borderRadius="20px"
            position="relative"
          >
            {/* Mockup images - Placeholder */}
            <Image
              src="/public/logo.png" // Replace with actual image paths
              alt="Mockup 1"
              position="absolute"
              width="295px"
              height="594px"
              left="78px"
              top="-9px"
              transform="matrix(1, 0, 0, 1, 0, 0)" // Adjust as needed
            />
            <Image
              src="/public/logo.png" // Replace with actual image paths
              alt="Mobile 1"
              position="absolute"
              width="154px"
              height="328px"
              left="296px"
              top="39px"
              transform="matrix(1, 0, 0, 1, 0, 0)" // Adjust as needed
            />

            <VStack
              align="flex-start"
              gap="12px"
              position="absolute"
              left="598.5px"
              top="50%"
              transform="translateY(-50%)"
              width="445px"
            >
              <Circle size="42px" bg="#03A300" borderRadius="32px">
                <Icon as={FiCpu} boxSize={6} color="white" />
              </Circle>
              <Heading
                fontFamily="'Helvetica Neue Medium Extended'"
                fontWeight="500"
                fontSize="32px"
                lineHeight="120%"
                textTransform="capitalize"
                color="#000000"
                width="445px"
              >
                Transfers across the globe are free
              </Heading>
            </VStack>
          </Box>

          {/* Services Row 2 */}
          <HStack gap="24px" width="1140px">
            {/* Card 1 */}
            <Box
              width="558px"
              height="673px"
              bg="#F6F9F8"
              border="1px solid rgba(0, 0, 0, 0.06)"
              borderRadius="20px"
              position="relative"
            >
              {/* Image/Graphic - Placeholder */}
              <Image
                src="/public/logo.png" // Replace with actual image paths
                alt="Home V-1"
                position="absolute"
                width="408px"
                height="881px"
                left="50%"
                top="337px"
                transform="translateX(-50%)"
              />

              <VStack
                align="flex-start"
                gap="12px"
                position="absolute"
                left="39px"
                top="54px"
                width="478px"
              >
                <Circle size="42px" bg="#03A300" borderRadius="32px">
                  <Icon as={FiCpu} boxSize={6} color="white" />
                </Circle>
                <Heading
                  fontFamily="'Helvetica Neue Medium Extended'"
                  fontWeight="500"
                  fontSize="32px"
                  lineHeight="120%"
                  color="#000000"
                  width="445px"
                >
                  Create A Card That Is Unique And Customized
                </Heading>
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="150%"
                  textTransform="capitalize"
                  color="#676666"
                  width="478px"
                >
                  we offer a comprehensive range of innovative financial
                  services tailored to meet your needs. Our services include
                  High-Yield Savings Accounts.
                </Text>
              </VStack>
            </Box>

            {/* Card 2 */}
            <Box
              width="558px"
              height="673px"
              bg="#001027"
              border="1px solid rgba(0, 0, 0, 0.06)"
              borderRadius="20px"
              position="relative"
            >
              {/* Dashboard image - Placeholder */}
              <Image
                src="/public/logo.png" // Replace with actual image paths
                alt="Dashboard"
                position="absolute"
                width="334.53px"
                height="724px"
                left="40px"
                top="334px"
              />

              {/* In-card popup - Placeholder */}
              <VStack
                padding="23px 37px"
                gap="10px"
                width="192px"
                height="132px"
                bg="#FFFEFE"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
                borderRadius="16px"
                position="absolute"
                left="315px"
                top="412px"
                align="flex-start"
              >
                <VStack align="flex-start" gap="8px">
                  <Text
                    fontFamily="'Poppins'"
                    fontWeight="500"
                    fontSize="16px"
                    lineHeight="24px"
                    color="#A5A5A5"
                  >
                    Total balance
                  </Text>
                  <Text
                    fontFamily="'Poppins'"
                    fontWeight="500"
                    fontSize="24px"
                    lineHeight="36px"
                    color="#0D0D0D"
                  >
                    $9,647.00
                  </Text>
                </VStack>
                <HStack align="flex-end" gap="8px">
                  <Circle size="17px" bg="#0CCA08">
                    <Icon as={FiCpu} boxSize={4} color="white" />{" "}
                    {/* Placeholder icon */}
                  </Circle>
                  <Text
                    fontFamily="'Poppins'"
                    fontWeight="400"
                    fontSize="12px"
                    lineHeight="18px"
                    color="#000000"
                  >
                    Add Number
                  </Text>
                </HStack>
              </VStack>

              <VStack
                align="flex-start"
                gap="12px"
                position="absolute"
                left="50%"
                transform="translateX(-50%)"
                top="54px"
                width="478px"
              >
                <Circle size="42px" bg="#03A300" borderRadius="32px">
                  <Icon as={FiCpu} boxSize={6} color="white" />
                </Circle>
                <Heading
                  fontFamily="'Helvetica Neue Medium Extended'"
                  fontWeight="500"
                  fontSize="32px"
                  lineHeight="120%"
                  color="#FFFFFF"
                  width="445px"
                >
                  Personalized Insights And Financial Goals
                </Heading>
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="150%"
                  textTransform="capitalize"
                  color="#A7A7A7"
                  width="478px"
                >
                  savings accounts that offer competitive interest rates and
                  flexible deposit options. Investment Invest wisely with our
                  personalized.Our services include High-Yield Savings
                </Text>
              </VStack>
            </Box>
          </HStack>

          {/* Services Row 3 */}
          <HStack gap="24px" width="1140px">
            {/* Card 1 */}
            <Box
              width="363px"
              height="297px"
              bg="#E2FF54"
              border="1px solid rgba(0, 0, 0, 0.06)"
              borderRadius="20px"
              padding="64px 31px"
            >
              <VStack align="flex-start" gap="16px" width="301px">
                <Heading
                  fontFamily="'Helvetica Neue Medium Extended'"
                  fontWeight="500"
                  fontSize="36px"
                  lineHeight="120%"
                  textTransform="capitalize"
                  color="#000000"
                  width="196px"
                >
                  100% Dedication
                </Heading>
                <Text
                  fontFamily="'Poppins'"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="150%"
                  textTransform="capitalize"
                  color="#403F3F"
                  width="301px"
                >
                  we offer a comprehensive range of innovative financial
                  services tailored to meet your needs.
                </Text>
              </VStack>
            </Box>

            {/* Card 2 */}
            <Box
              width="364px"
              height="298px"
              bg="#F6F9F8"
              border="1px solid rgba(0, 0, 0, 0.06)"
              borderRadius="20px"
              position="relative"
            >
              {/* Expense Details image - Placeholder */}
              <Image
                src="/public/logo.png" // Replace with actual image paths
                alt="Expense Details V-1"
                position="absolute"
                width="188.7px"
                height="404.35px"
                left="127px"
                top="0px"
                transform="matrix(0.98, 0.19, -0.63, 0.78, 0, 0)"
              />
              <VStack
                align="flex-start"
                gap="12px"
                position="absolute"
                left="31px"
                top="49px"
                width="236px"
              >
                <Circle size="42px" bg="#03A300" borderRadius="32px">
                  <Icon as={FiCpu} boxSize={6} color="white" />
                </Circle>
                <Heading
                  fontFamily="'Helvetica Neue Medium Extended'"
                  fontWeight="500"
                  fontSize="24px"
                  lineHeight="120%"
                  textTransform="capitalize"
                  color="#000000"
                  width="236px"
                >
                  Hold money in 30+ currencies
                </Heading>
              </VStack>
            </Box>

            {/* Card 3 */}
            <Flex
              justify="center"
              align="center"
              padding="79px 64px"
              gap="10px"
              width="364px"
              height="298px"
              bg="#2D907A"
              borderRadius="20px"
              direction="column"
            >
              <Heading
                fontFamily="'Helvetica Neue Medium Extended'"
                fontWeight="500"
                fontSize="32px"
                lineHeight="120%"
                textTransform="capitalize"
                color="#FFFFFF"
                textAlign="center"
                width="266px"
              >
                Visit Our Services page
              </Heading>
              <HStack gap="0px">
                <Button
                  border="0.8px solid #40AF3E"
                  borderRadius="44px"
                  padding="24px 32px 24px 24px"
                  height="52px"
                  color="#000000"
                  fontFamily="'Poppins'"
                  fontSize="16px"
                  fontWeight="600"
                  lineHeight="150%"
                  onClick={handleViewMore}
                  bg="transparent"
                  _hover={{ bg: "gray.100" }}
                >
                  View More
                </Button>
                <Circle
                  size="52px"
                  bg="#00B512"
                  borderRadius="200px"
                  marginLeft="-20px"
                >
                  <Icon as={FiArrowRight} boxSize={6} color="#FFFFFF" />
                </Circle>
              </HStack>
            </Flex>
          </HStack>
        </VStack>
      </VStack>

      {/* Testimonial Section */}
      <VStack
        padding="120px 150px"
        gap="60px"
        width="1440px"
        height="840px"
        bg="#F6F9F8"
      >
        <HStack
          bg="#F9FAFB"
          border="1px solid #EAECF0"
          borderRadius="100px"
          padding="6px 16px 6px 12px"
          gap="4px"
          height="33px"
        >
          <Icon as={FiCpu} color="gray.700" /> {/* Placeholder icon */}
          <Text
            fontFamily="'Poppins'"
            fontWeight="500"
            fontSize="14px"
            lineHeight="150%"
            color="#031B1D"
            textTransform="uppercase"
          >
            Testimonial
          </Text>
        </HStack>
        <Heading
          fontFamily="'Integral CF'"
          fontWeight="400"
          fontSize="48px"
          lineHeight="120%"
          textTransform="capitalize"
          color="#000000"
          textAlign="center"
          width="709px"
        >
          Get to Know Our Clients
        </Heading>

        <HStack gap="26px" width="1138px" height="341px">
          {/* Testimonial Card 1 */}
          <Box
            width="361px"
            height="341px"
            bg="#FFFFFF"
            borderRadius="20px"
            padding="36px 47px"
          >
            <VStack align="flex-start" gap="28px">
              <Icon as={FiCpu} boxSize={12} color="#009E3F" />{" "}
              {/* Placeholder icon */}
              <Text
                fontFamily="'Poppins'"
                fontWeight="400"
                fontSize="16px"
                lineHeight="150%"
                color="#161919"
              >
                I like getting the SMS & knowing the jobs done. I often refer to
                it, “hope you get a ping today!” because my product
              </Text>
              <HStack align="center" gap="12px">
                <Circle size="52px" bg="gray.300">
                  {/* Avatar image - Placeholder */}
                </Circle>
                <VStack align="flex-start">
                  <Text
                    fontFamily="'Poppins'"
                    fontWeight="500"
                    fontSize="16px"
                    lineHeight="24px"
                    color="#161919"
                  >
                    Mike Torello
                  </Text>
                  <Text
                    fontFamily="'Poppins'"
                    fontWeight="400"
                    fontSize="16px"
                    lineHeight="24px"
                    color="#454747"
                  >
                    CEO of Initech
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>

          {/* Testimonial Card 2 */}
          <Box
            width="364px"
            height="338px"
            bg="#004852"
            borderRadius="20px"
            padding="36px 47px"
          >
            <VStack align="flex-start" gap="28px">
              <Icon as={FiCpu} boxSize={12} color="#009E3F" />{" "}
              {/* Placeholder icon */}
              <Text
                fontFamily="'Poppins'"
                fontWeight="400"
                fontSize="16px"
                lineHeight="150%"
                color="#FFFFFF"
              >
                We have successfully sold digital product and have happy with
                the results & look forward to using it again this.
              </Text>
              <HStack align="center" gap="12px">
                <Circle size="52px" bg="gray.300">
                  {/* Avatar image - Placeholder */}
                </Circle>
                <VStack align="flex-start">
                  <Text
                    fontFamily="'Poppins'"
                    fontWeight="500"
                    fontSize="16px"
                    lineHeight="24px"
                    color="#FFFFFF"
                  >
                    Richards Hawkins
                  </Text>
                  <Text
                    fontFamily="'Poppins'"
                    fontWeight="400"
                    fontSize="14px"
                    lineHeight="21px"
                    color="#A1A2A2"
                  >
                    Marketing Manager of Upnow
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>

          {/* Testimonial Card 3 */}
          <Box
            width="361px"
            height="341px"
            bg="#FFFFFF"
            borderRadius="20px"
            padding="36px 47px"
          >
            <VStack align="flex-start" gap="28px">
              <Icon as={FiCpu} boxSize={12} color="#009E3F" />{" "}
              {/* Placeholder icon */}
              <Text
                fontFamily="'Poppins'"
                fontWeight="400"
                fontSize="16px"
                lineHeight="150%"
                color="#161919"
              >
                Design Monks offers producers a cost-effective selling tool.
                Having the ability to post prices that you want on an exchange
                visible.
              </Text>
              <HStack align="center" gap="12px">
                <Circle size="52px" bg="gray.300">
                  {/* Avatar image - Placeholder */}
                </Circle>
                <VStack align="flex-start">
                  <Text
                    fontFamily="'Poppins'"
                    fontWeight="500"
                    fontSize="16px"
                    lineHeight="24px"
                    color="#161919"
                  >
                    Thomas Magnum
                  </Text>
                  <Text
                    fontFamily="'Poppins'"
                    fontWeight="400"
                    fontSize="16px"
                    lineHeight="24px"
                    color="#454747"
                  >
                    Barellon NSW
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </VStack>

      {/* Call to action section */}
      <Box
        width="1140px"
        height="460px"
        borderRadius="20px"
        bg="#001229"
        position="relative"
        margin="auto" // Center the box
        my="60px" // Add some margin top/bottom
        overflow="hidden" // To contain pseudo-elements if used for blurred circles
      >
        {/* Blurred Circles - Placeholder for now, may need custom styles or pseudo-elements */}
        <Box
          position="absolute"
          width="522px"
          height="522px"
          left="618px"
          top="148px"
          bg="#209181"
          filter="blur(200px)"
          borderRadius="full"
        />
        <Box
          position="absolute"
          width="382px"
          height="382px"
          left="-150px"
          top="238px"
          bg="#209181"
          filter="blur(200px)"
          borderRadius="full"
        />

        {/* Content */}
        <VStack
          align="flex-start"
          gap="40px"
          position="absolute"
          left="73px"
          top="112px"
          width="634px"
        >
          <Heading
            fontFamily="'Integral CF'"
            fontWeight="400"
            fontSize="48px"
            lineHeight="150%"
            color="#FFFFFF"
            width="634px"
          >
            Are you ready to start?
          </Heading>
          <Text
            fontFamily="'Poppins'"
            fontWeight="400"
            fontSize="16px"
            lineHeight="150%"
            color="#FFFFFF"
            width="535px"
          >
            Personalize your settings, follow your progress, archive your
            highlights and notes automatically Glose is the ultimate reading
          </Text>
          <HStack gap="0px">
            <Button
              bg="#00B512"
              borderRadius="44px"
              padding="24px 32px 24px 24px"
              height="52px"
              color="#F9FAFB"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="600"
              lineHeight="150%"
              onClick={handleGetStarted}
              _hover={{ bg: "#009E0F" }}
            >
              Get Started
            </Button>
            <Circle
              size="52px"
              bg="#FBF9F1"
              borderRadius="200px"
              marginLeft="-20px"
            >
              <Icon as={FiArrowRight} boxSize={6} color="#344054" />
            </Circle>
          </HStack>
        </VStack>

        {/* Images for Call to action - Placeholder */}
        <Image
          src="/public/logo.png" // Replace with actual image paths
          alt="78"
          position="absolute"
          width="269.65px"
          height="563.96px"
          left="787.36px"
          top="19px"
        />
        <Image
          src="/public/logo.png" // Replace with actual image paths
          alt="015"
          position="absolute"
          width="288.44px"
          height="563.96px"
          left="707px"
          top="89.31px"
        />
      </Box>

      {/* Footer Section */}
      <VStack padding="0px 150px 28px" gap="40px" width="1440px">
        <VStack gap="40px">
          {/* Logo and App Badges */}
          <VStack gap="16px" width="290px">
            <Image
              src="/public/logo.png" // Replace with actual logo image
              alt="Upgrade Inc Logo"
              width="270px"
              height="73px"
            />
            <HStack gap="20px" width="290px">
              {/* App Store Badge - Placeholder */}
              <Box
                width="135px"
                height="40px"
                bg="black"
                border="1px solid #A6A6A6"
                borderRadius="7px"
              >
                <Text color="white" fontSize="12px">
                  App Store
                </Text>
              </Box>
              {/* Google Play Badge - Placeholder */}
              <Box
                width="135px"
                height="40px"
                bg="black"
                border="1px solid #A6A6A6"
                borderRadius="5px"
              >
                <Text color="white" fontSize="12px">
                  Google Play
                </Text>
              </Box>
            </HStack>
          </VStack>

          {/* Nav Links */}
          <HStack gap="48px" width="782px">
            <Text
              color="#646161"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Personal Loan
            </Text>
            <Text
              color="#646161"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              One Card
            </Text>
            <Text
              color="#646161"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Savings
            </Text>
            <Text
              color="#646161"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Checking
            </Text>
            <Text
              color="#646161"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Contact
            </Text>
            <Text
              color="#646161"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Help
            </Text>
            <Text
              color="#646161"
              fontFamily="'Poppins'"
              fontSize="16px"
              fontWeight="400"
            >
              Support
            </Text>
          </HStack>
        </VStack>

        <VStack gap="20px" width="708px">
          {/* Social Icons */}
          <HStack gap="12px" width="164px">
            <Circle size="32px" bg="#006022" border="1px solid #F9FAFB">
              <Icon as={FiCpu} boxSize={4} color="white" />{" "}
              {/* Placeholder for social icon */}
            </Circle>
            <Circle size="32px" bg="#006022">
              <Icon as={FiCpu} boxSize={4} color="white" />{" "}
              {/* Placeholder for social icon */}
            </Circle>
            <Circle size="32px" bg="#006022">
              <Icon as={FiCpu} boxSize={4} color="white" />{" "}
              {/* Placeholder for social icon */}
            </Circle>
            <Circle size="32px" bg="#006022">
              <Icon as={FiCpu} boxSize={4} color="white" />{" "}
              {/* Placeholder for social icon */}
            </Circle>
          </HStack>
          {/* Feedback Email */}
          <HStack gap="7px" width="325px">
            <Text
              fontFamily="'Poppins'"
              fontWeight="600"
              fontSize="14px"
              lineHeight="21px"
              color="#000000"
            >
              Send Your Feedback :
            </Text>
            <Text
              fontFamily="'Poppins'"
              fontWeight="400"
              fontSize="14px"
              lineHeight="21px"
              color="#000000"
            >
              moc.edargpu@tcatnoc
            </Text>
          </HStack>
        </VStack>

        {/* Policy Links */}
        <Text
          fontFamily="'Poppins'"
          fontWeight="400"
          fontSize="16px"
          lineHeight="150%"
          color="#646060"
          textAlign="center"
          width="708px"
        >
          Privacy Policy | Terms & Condition | Cookie Notice | Copyright Policy
          | Data Policy
        </Text>
        <Text
          fontFamily="'Poppins'"
          fontWeight="400"
          fontSize="16px"
          lineHeight="150%"
          color="#646060"
          textAlign="center"
          width="323px"
        >
          Footer text
        </Text>
      </VStack>
    </Box>
  );
};

export default UpgradePage;
