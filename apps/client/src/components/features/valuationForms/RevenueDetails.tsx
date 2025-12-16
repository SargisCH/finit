import { Box, Button, Field, Flex, NumberInput } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  revenueDetailsSchema,
  RevenueDetailsDto,
  EvaluationProgress,
} from "@shared/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import {
  evaluateRevenueDetails,
  getValuationProgress,
} from "../../../api/valuation";
import { useParams } from "react-router-dom";
import { ValuationStep } from "../../../../../../packages/types/dist";
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
  const revenueDetails = evaluationProgress?.data.find(
    (item) => item.step === ValuationStep.RevenueDetails,
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(revenueDetailsSchema.omit({ step: true })),
  });
  useEffect(() => {
    reset({
      monthlyRevenue: String(revenueDetails?.monthlyRevenue ?? 0),
      mrr: String(revenueDetails?.mrr ?? 0),
      numberOfActiveClients: String(revenueDetails?.numberOfActiveClients ?? 0),
      revenuePerClient: String(revenueDetails?.revenuePerClient ?? 0),
    });
  }, [revenueDetails, reset]);
  const { mutate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: RevenueDetailsDto }) =>
      evaluateRevenueDetails(id, data),
    onSuccess: onSubmitHandler,
  });
  const onSubmit = (values: Omit<RevenueDetailsDto, "step">) => {
    mutate({
      id: params.id as string,
      data: { ...values, step: ValuationStep.RevenueDetails },
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
            name="monthlyRevenue"
            error={!!errors.monthlyRevenue}
            label={t("monthlyRevenue")}
            helperText={t("monthlyRevenueHelperText")}
            control={control}
          />
          <CurrencyInput
            name="mrr"
            error={!!errors.mrr}
            label={t("mrr")}
            helperText={t("mrrHelperText")}
            control={control}
          />
        </Flex>
        <Flex gap={6} justifyContent={"start"}>
          <Field.Root invalid={!!errors.numberOfActiveClients}>
            <Field.Label>
              <Trans i18nKey="numberOfActiveClients" />
            </Field.Label>

            <NumberInput.Root
              {...register("numberOfActiveClients")}
              max={Number.MAX_SAFE_INTEGER}
              min={Number.MIN_SAFE_INTEGER}
            >
              <NumberInput.Input width={"sm"} mt={2} />
            </NumberInput.Root>

            <Field.ErrorText>
              <Trans i18nKey="errors.requiredField" />
            </Field.ErrorText>
          </Field.Root>
          <CurrencyInput
            name="revenuePerClient"
            error={!!errors.revenuePerClient}
            label={t("revenuePerClient")}
            helperText={t("revenuePerClientHelperText")}
            control={control}
          />
        </Flex>
      </Flex>
      <Flex justifyContent="end" mt={10}>
        <Button colorPalette="green" type="submit">
          {t("next")}
        </Button>
      </Flex>
    </form>
  );
}
