import { Box, Button, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EvaluationProgress,
  directCostSchema,
  DirectCostDto,
} from "@shared/schemas";
import { ValuationStep } from "@shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import {
  evaluateDirectCostDetails,
  getValuationProgress,
} from "../../../api/valuation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CurrencyInput from "../../ui/currencyInput";

type Props = { onSubmitHandler: () => void };

export default function RevenueDetails({ onSubmitHandler }: Props) {
  const params = useParams();
  const { t } = useTranslation();
  const { data: evaluationProgress } = useQuery<EvaluationProgress>({
    queryKey: [params.id],
    queryFn: () => getValuationProgress(params.id as string),
  });
  const directCostDetails = evaluationProgress?.data.find(
    (item) => item.step === ValuationStep.DirectConstDetails,
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(directCostSchema.omit({ step: true })),
  });
  useEffect(() => {
    reset({
      developerSalaries: directCostDetails?.developerSalaries ?? 0,
      top2Salaries: directCostDetails?.top2Salaries ?? 0,
      projectSpecificCosts: directCostDetails?.projectSpecificCosts ?? 0,
      contracterPayments: directCostDetails?.contractorPayments ?? 0,
      softwareLicenses: directCostDetails?.softwareLicenses ?? 0,
    });
  }, [directCostDetails, reset]);
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: DirectCostDto }) =>
      evaluateDirectCostDetails(id, data),
    onSuccess: onSubmitHandler,
  });
  const onSubmit = (values: Omit<DirectCostDto, "step">) => {
    mutate({
      id: params.id as string,
      data: { ...values, step: ValuationStep.DirectConstDetails },
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }}
    >
      <Flex m={"auto"} width={"4xl"} gap={2} direction={"column"}>
        <Box mt={6} fontWeight="bold">
          <Trans i18nKey="directCostInputs" />
        </Box>
        <Flex gap={6} justifyContent={"start"}>
          <CurrencyInput
            name="developerSalaries"
            error={!!errors.developerSalaries}
            label={t("developerSalaries")}
            helperText={t("developerSalariesHelperText")}
            control={control}
          />
          <CurrencyInput
            name="top2Salaries"
            error={!!errors.top2Salaries}
            label={t("topSalaries")}
            control={control}
          />
        </Flex>
        <Flex gap={6} justifyContent={"start"}>
          <CurrencyInput
            name="contracterPayments"
            error={!!errors.contracterPayments}
            label={t("contractorPayments")}
            helperText={t("contractorPaymentsHelperText")}
            control={control}
          />
          <CurrencyInput
            name="softwareLicenses"
            error={!!errors.softwareLicenses}
            label={t("softwareLicenses")}
            helperText={t("softwareLicensesHelperText")}
            control={control}
          />
        </Flex>
        <Flex gap={6} justifyContent={"start"}>
          <CurrencyInput
            name="projectSpecificCosts"
            error={!!errors.projectSpecificCosts}
            label={t("projectSpecificCosts")}
            helperText={t("projectSpecificCostsHelpterText")}
            control={control}
          />
        </Flex>
      </Flex>
      <Flex justifyContent="end" mt={10}>
        <Button colorPalette="natureDark" type="submit" loading={isPending}>
          {t("next")}
        </Button>
      </Flex>
    </form>
  );
}
