import { Box, Button, Dialog, Flex } from "@chakra-ui/react";
import { CompanyEvaluationResponse } from "@shared/schemas";
import { Trans, useTranslation } from "react-i18next";

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
                <span>{data?.annualRevenue}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.developerSalaries" />
                <span>{data?.developerSalaries}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.otherDirectCost" />
                <span>{data?.otherDirectCost}</span>
              </Flex>
              <Flex
                p={2}
                backgroundColor={"forestGreen"}
                justifyContent={"space-between"}
              >
                <Trans i18nKey="calculation.grossProfit" />
                <span>{data?.grossProfit}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.operatingExpenses" />
                <span>{data?.operatingExpenses}</span>
              </Flex>
              <Flex
                p={2}
                justifyContent={"space-between"}
                backgroundColor={"forestGreen"}
              >
                <Trans i18nKey="calculation.ebidta" />
                <span>{data?.ebidta}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.ebidtaPercent" />
                <span>{data?.ebidtaPercentage} %</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.tax" />
                <span>{data?.tax}</span>
              </Flex>
              <Flex
                mt={4}
                p={2}
                backgroundColor={"forestGreen"}
                justifyContent={"space-between"}
              >
                <Trans i18nKey="calculation.netProfit" />
                <span>{data?.netProfit}</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.profitMargin" />
                <span>{data?.profitMarginPercentage} %</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.mrr" />
                <span>{data?.mrr} %</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.clientConcentration" />
                <span>{data?.clientConcentration} %</span>
              </Flex>
              <Flex p={2} justifyContent={"space-between"}>
                <Trans i18nKey="calculation.valuation" />
                <span>{data?.valuation}</span>
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
