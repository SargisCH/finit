import { Box } from "@chakra-ui/react";

export default function Progress({
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
        height={3}
      ></Box>
      <Box
        width={`${progressWidth}%`}
        background="green.500"
        borderRadius={20}
        height={3}
        position={"absolute"}
        top={0}
      ></Box>
    </Box>
  );
}
