import { Box, Button, Field, Flex, NumberInput } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  revenueDetailsSchema,
  RevenueDetailsDto,
  EvaluationProgress,
} from "@shared/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
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
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(revenueDetailsSchema.omit({ step: true })),
  });
  useEffect(() => {
    reset({
      monthlyRevenue: revenueDetails?.monthlyRevenue ?? 0,
      mrr: revenueDetails?.mrr ?? 0,
      numberOfActiveClients: revenueDetails?.numberOfActiveClients ?? 0,
      revenuePerClient: revenueDetails?.revenuePerClient ?? 0,
    });
  }, [revenueDetails, reset]);
  const { mutate, isPending } = useMutation({
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
          <Trans i18nKey="revenueInputs" />
        </Box>
        <Flex gap={6} justifyContent={"start"}>
          <CurrencyInput
            name="monthlyRevenue"
            error={!!errors.monthlyRevenue}
            label={t("monthlyRevenue")}
            helperText={t("monthlyRevenueHelperText")}
            control={control}
            placeholder={t("monthlyRevenue")}
          />
          <CurrencyInput
            name="mrr"
            error={!!errors.mrr}
            label={t("mrr")}
            helperText={t("mrrHelperText")}
            control={control}
            placeholder={t("mrr")}
          />
        </Flex>
        <Flex gap={6} justifyContent={"start"}>
          <Controller
            name="numberOfActiveClients"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Field.Root invalid={!!errors.numberOfActiveClients}>
                  <Field.Label>
                    <Trans i18nKey="numberOfActiveClients" />
                  </Field.Label>

                  <NumberInput.Root
                    onValueChange={(details) => onChange(details.valueAsNumber)}
                    max={Number.MAX_SAFE_INTEGER}
                    min={Number.MIN_SAFE_INTEGER}
                    value={String(value)}
                  >
                    <NumberInput.Input
                      width={"sm"}
                      mt={2}
                      placeholder={t("numberOfActiveClients")}
                    />
                  </NumberInput.Root>

                  <Field.ErrorText>
                    <Trans i18nKey="errors.requiredField" />
                  </Field.ErrorText>
                </Field.Root>
              );
            }}
          />

          <CurrencyInput
            name="revenuePerClient"
            error={!!errors.revenuePerClient}
            label={t("revenuePerClient")}
            helperText={t("revenuePerClientHelperText")}
            control={control}
            placeholder={t("revenuePerClient")}
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
