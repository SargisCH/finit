import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ValuationStep } from "../../../../packages/types/dist";
import { useMutation } from "@tanstack/react-query";
import { startValuation } from "../api/valuation";
import { CompanyDetailsDto } from "@shared/schemas";

const StartPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartValuation = () => {
    mutate();
  };

  const { mutate } = useMutation({
    mutationFn: startValuation,
    onSuccess: (data: CompanyDetailsDto & { id: string }) => {
      console.log("data", data);
      navigate(`/valuation-wizard/${data.id}/${ValuationStep.CompanyDetails}`);
    },
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50" // Example background color
      _dark={{ bg: "gray.800" }} // Dark mode background
      p={4}
    >
      <VStack spacing={8} textAlign="center" maxW="lg">
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color="gray.700"
          _dark={{ color: "white" }}
        >
          Welcome to Finit Valuation
        </Text>
        <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
          This application helps you perform comprehensive company valuations
          based on various financial parameters and industry insights. Whether
          you're an investor, business owner, or analyst, Finit provides the
          tools to make informed decisions.
        </Text>
        <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
          Ready to start evaluating a company? Click the button below to begin
          the valuation process.
        </Text>
        <Button colorPalette="green" size="lg" onClick={handleStartValuation}>
          Start Company Valuation
        </Button>
      </VStack>
    </Box>
  );
};

export default StartPage;
