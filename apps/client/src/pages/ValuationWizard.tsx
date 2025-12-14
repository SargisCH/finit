import { Box, Button, Flex, Span, Link } from "@chakra-ui/react";
import { useCallback } from "react";
import { LuChevronLeft } from "react-icons/lu";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { ValuationStep } from "../../../../packages/types/dist";

function Progress({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const progressWidth = (currentStep / totalSteps) * 100;
  return (
    <Box position="relative">
      <Box
        width="100%"
        background="gray.300"
        borderRadius={20}
        height={6}
      ></Box>
      <Box
        width={`${progressWidth}%`}
        background="green.500"
        borderRadius={20}
        height={6}
        position={"absolute"}
        top={0}
      ></Box>
    </Box>
  );
}
const steps = {
  [ValuationStep.CompanyDetails]: 1,
  [ValuationStep.RevenueDetails]: 2,
  [ValuationStep.DirectConstDetails]: 3,
  [ValuationStep.OperatingExpenses]: 4,
};
export default function ValuationWizard() {
  const navigate = useNavigate();
  const params = useParams();
  const currentStep = steps[params.step as ValuationStep];
  const totalSteps = Object.keys(steps).length;
  const nextHandler = useCallback(
    (currentStep: string) => {
      switch (currentStep) {
        case ValuationStep.CompanyDetails:
          navigate(`/valuation-wizard/${ValuationStep.RevenueDetails}`);
          return;
        case ValuationStep.RevenueDetails:
          navigate(`/valuation-wizard/${ValuationStep.DirectConstDetails}`);
          return;
        case ValuationStep.DirectConstDetails:
          navigate(`/valuation-wizard/${ValuationStep.OperatingExpenses}`);
          return;
      }
    },
    [currentStep],
  );
  return (
    <Box py={12} px={6} direction="column" width="60%" mx="auto">
      <Flex justifyContent="space-between">
        <Link onClick={() => navigate("/")}>
          <LuChevronLeft />
          <Span> Back</Span>
        </Link>
        <Span>
          {currentStep} / {totalSteps}
        </Span>
      </Flex>

      <Progress totalSteps={totalSteps} currentStep={currentStep} />
      <Box>Step one</Box>
      <Flex justifyContent={"end"}>
        {currentStep < totalSteps ? (
          <Button
            colorPalette={"green"}
            onClick={() => nextHandler(params.step as ValuationStep)}
          >
            Next
          </Button>
        ) : null}
      </Flex>
    </Box>
  );
}
