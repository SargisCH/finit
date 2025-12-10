import { Box, Button, Dialog, Flex } from "@chakra-ui/react";
import { CompanyEvaluationResponse } from "@shared/schemas";
import { Trans, useTranslation } from "react-i18next";
import { currencyFormat } from "../../utils";

type Props = {
  open: boolean;
  onClose: () => void;
  data: CompanyEvaluationResponse | undefined;
};

export default function DialogCustom({ open, onClose, data }: Props) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger />
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title />
          </Dialog.Header>
          <Dialog.Body>
            <Box>
              <Flex
                p={2}
                backgroundColor={"forestGreen"}
                justifyContent={"space-between"}
              >
                <Trans i18nKey="calculation.annualRevenue" />
                <span>{currencyFormat(data?.annualRevenue ?? 0)}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.developerSalaries" />
                <span>{currencyFormat(data?.developerSalaries ?? 0)}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.otherDirectCost" />
                <span>{currencyFormat(data?.otherDirectCost ?? 0)}</span>
              </Flex>
              <Flex
                p={2}
                backgroundColor={"forestGreen"}
                justifyContent={"space-between"}
              >
                <Trans i18nKey="calculation.grossProfit" />
                <span>{currencyFormat(data?.grossProfit ?? 0)}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.operatingExpenses" />
                <span>{currencyFormat(data?.operatingExpenses ?? 0)}</span>
              </Flex>
              <Flex
                p={2}
                justifyContent={"space-between"}
                backgroundColor={"forestGreen"}
              >
                <Trans i18nKey="calculation.ebidta" />
                <span>{currencyFormat(data?.ebidta ?? 0)}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.ebidtaPercent" />
                <span>{Number(data?.ebidtaPercentage)?.toFixed(1)} %</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.tax" />
                <span>{currencyFormat(data?.tax ?? 0)}</span>
              </Flex>
              <Flex
                mt={4}
                p={2}
                backgroundColor={"forestGreen"}
                justifyContent={"space-between"}
              >
                <Trans i18nKey="calculation.netProfit" />
                <span>{currencyFormat(data?.netProfit ?? 0)}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.profitMargin" />
                <span>{currencyFormat(data?.profitMarginPercentage ?? 0)}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.mrr" />
                <span>{Number(data?.mrr)?.toFixed(1)} %</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.clientConcentration" />
                <span>{Number(data?.clientConcentration)?.toFixed(1)} %</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.valuation" />
                <span>{currencyFormat(data?.valuation ?? 0)}</span>
              </Flex>
            </Box>
          </Dialog.Body>
          <Dialog.Footer>
            <Flex justifyContent={"end"} gap={4}>
              <Button onClick={onClose} variant={"subtle"}>
                <Trans i18nKey="close" />
              </Button>
            </Flex>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
