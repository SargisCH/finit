import { Box, Button, Flex, Link, Span } from "@chakra-ui/react";
import { LuChevronLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Progress from "./Progress";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

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
  t: (key: string) => string,
): ReactNode {
  if (!buttonProps) return null;
  if ("type" in buttonProps) {
    return (
      <Button type="submit" form={buttonProps.form} colorScheme="green">
        {t("next")}
      </Button>
    );
  }
  return (
    <Button colorPalette="green" onClick={buttonProps.onClick}>
      {t("next")}
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
  const { t } = useTranslation();
  return (
    <Box py={12} px={6} direction="column" width="60%" mx="auto">
      <Flex justifyContent="space-between" mb={2}>
        <Link onClick={() => navigate("/")}>
          <LuChevronLeft />
          <Span>{t("back")}</Span>
        </Link>
        <Span>
          {currentStep} / {totalSteps}
        </Span>
      </Flex>

      <Progress totalSteps={totalSteps} currentStep={currentStep} />
      <Box mt={6}>{children}</Box>
      <Flex justifyContent={"end"}>
        {currentStep < totalSteps ? getNextButton(nextButtonProps, t) : null}
      </Flex>
    </Box>
  );
}
