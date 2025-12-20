import { useParams } from "react-router-dom";
import { currencyFormat } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { getValuationResult } from "../api/valuation";
import { Trans } from "react-i18next";
import { Box, Flex, Spinner } from "@chakra-ui/react";

export default function ValidationResult() {
  const params = useParams();
  const { data, isFetching } = useQuery({
    queryKey: [params.id],
    queryFn: () => getValuationResult(params?.id ?? ""),
  });
  if (isFetching)
    return (
      <Flex minH={"100vh"} justifyContent="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    );
  return (
    <Box px={28} py={20} minH="100vh">
      <Flex
        p={2}
        backgroundColor={"forestGreen"}
        justifyContent={"space-between"}
      >
        <Trans i18nKey="calculation.annualRevenue" />
        <span>{currencyFormat(data?.annualRevenue ?? 0, true)}</span>
      </Flex>
      <Flex p={2} justifyContent={"space-between"}>
        <Trans i18nKey="calculation.developerSalaries" />
        <span>{currencyFormat(data?.developerSalaries ?? 0, true)}</span>
      </Flex>
      <Flex p={2} justifyContent={"space-between"}>
        <Trans i18nKey="calculation.otherDirectCost" />
        <span>{currencyFormat(data?.otherDirectCost ?? 0, true)}</span>
      </Flex>
      <Flex
        p={2}
        backgroundColor={"forestGreen"}
        justifyContent={"space-between"}
      >
        <Trans i18nKey="calculation.grossProfit" />
        <span>{currencyFormat(data?.grossProfit ?? 0, true)}</span>
      </Flex>
      <Flex p={2} justifyContent={"space-between"}>
        <Trans i18nKey="calculation.operatingExpenses" />
        <span>{currencyFormat(data?.operatingExpenses ?? 0, true)}</span>
      </Flex>
      <Flex
        p={2}
        justifyContent={"space-between"}
        backgroundColor={"forestGreen"}
      >
        <Trans i18nKey="calculation.ebidta" />
        <span>{currencyFormat(data?.ebidta ?? 0, true)}</span>
      </Flex>
      <Flex p={2} justifyContent={"space-between"}>
        <Trans i18nKey="calculation.ebidtaPercent" />
        <span>{Number(data?.ebidtaPercentage)?.toFixed(0)} %</span>
      </Flex>
      <Flex p={2} justifyContent={"space-between"}>
        <Trans i18nKey="calculation.tax" />
        <span>{currencyFormat(data?.tax ?? 0, true)}</span>
      </Flex>
      <Flex
        mt={4}
        p={2}
        backgroundColor={"forestGreen"}
        justifyContent={"space-between"}
      >
        <Trans i18nKey="calculation.netProfit" />
        <span>{currencyFormat(data?.netProfit ?? 0, true)}</span>
      </Flex>
      <Flex p={2} justifyContent={"space-between"}>
        <Trans i18nKey="calculation.profitMargin" />
        <span>{currencyFormat(data?.profitMarginPercentage ?? 0, true)}</span>
      </Flex>
      <Flex p={2} justifyContent={"space-between"}>
        <Trans i18nKey="calculation.mrr" />
        <span>{Number(data?.mrr)?.toFixed(0)} %</span>
      </Flex>
      <Flex p={2} justifyContent={"space-between"}>
        <Trans i18nKey="calculation.clientConcentration" />
        <span>{Number(data?.clientConcentration)?.toFixed(0)} %</span>
      </Flex>
      <Flex p={2} justifyContent={"space-between"}>
        <Trans i18nKey="calculation.valuation" />
        <span>{currencyFormat(data?.valuation ?? 0, true)}</span>
      </Flex>
    </Box>
  );
}
