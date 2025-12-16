import { Box, Button, Flex, Link, Span } from "@chakra-ui/react";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Progress from "./Progress";
import { ReactNode } from "react";

type Props = {
  currentStep: number;
  totalSteps: number;
  children: ReactNode;
  nextButtonProps?:
    | {
        type: "submit";
        form: string;
      }
    | { onClick: () => void };
};

function getNextButton(
  buttonProps:
    | { type: "submit"; form: string }
    | { onClick: () => void }
    | undefined,
): ReactNode {
  if (!buttonProps) return null;
  if ("type" in buttonProps) {
    return (
      <Button type="submit" form={buttonProps.form} colorScheme="green">
        Next
      </Button>
    );
  }
  return (
    <Button colorPalette="green" onClick={buttonProps.onClick}>
      Next
    </Button>
  );
}

export default function Wizard({
  currentStep,
  totalSteps,
  children,
  nextButtonProps,
}: Props) {
  const navigate = useNavigate();
  return (
    <Box py={12} px={6} direction="column" width="60%" mx="auto">
      <Flex justifyContent="space-between" mb={2}>
        <Link onClick={() => navigate("/")}>
          <LuChevronLeft />
          <Span> Back</Span>
        </Link>
        <Span>
          {currentStep} / {totalSteps}
        </Span>
      </Flex>

      <Progress totalSteps={totalSteps} currentStep={currentStep} />
      <Box mt={6}>{children}</Box>
      <Flex justifyContent={"end"}>
        {currentStep < totalSteps ? getNextButton(nextButtonProps) : null}
      </Flex>
    </Box>
  );
}
