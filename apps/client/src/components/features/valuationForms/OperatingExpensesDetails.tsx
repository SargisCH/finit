import {
  Box,
  Button,
  Combobox,
  Field,
  Flex,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EvaluationProgress,
  OperatingExpensesDto,
  operatingExpensesSchema,
} from "@shared/schemas";
import { FteLevels, ValuationStep } from "@shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import {
  evaluateOperatingExpensesDetails,
  getValuationProgress,
} from "../../../api/valuation";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CurrencyInput from "../../ui/currencyInput";

type Props = { onSubmitHandler: () => void };

const getLevelOptions = (t: (key: string) => string) => {
  return [
    { label: t("levels.low"), value: "LOW" },
    { label: t("levels.medium"), value: "MEDIUM" },
    { label: t("levels.high"), value: "HIGH" },
  ];
};

const getFteLevelDescription = (
  level: FteLevels,
  t: (key: string) => string,
) => {
  switch (level) {
    case FteLevels.LOW:
      return t("fteLowDescription");
    case FteLevels.MEDIUM:
      return t("fteMediumDescription");
    case FteLevels.HIGH:
      return t("fteHighDescription");
  }
};

export default function RevenueDetails({ onSubmitHandler }: Props) {
  const params = useParams();
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const { data: evaluationProgress } = useQuery<EvaluationProgress>({
    queryKey: [params.id],
    queryFn: () => getValuationProgress(params.id as string),
  });
  const operatingExpensesDetails = evaluationProgress?.data?.find(
    (item) => item.step === ValuationStep.OperatingExpenses,
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(operatingExpensesSchema.omit({ step: true })),
  });
  useEffect(() => {
    reset({
      adminSalaries: operatingExpensesDetails?.adminSalaries ?? 0,
      officeRent: operatingExpensesDetails?.officeRent ?? 0,
      marketing: operatingExpensesDetails?.marketing ?? 0,
      otherOperatingExpenses:
        operatingExpensesDetails?.otherOperatingExpenses ?? 0,
      utilities: operatingExpensesDetails?.utilities ?? 0,
      fteRiskLevel: operatingExpensesDetails?.fteRiskLevel,
    });
  }, [operatingExpensesDetails, reset]);
  const { mutate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: OperatingExpensesDto }) =>
      evaluateOperatingExpensesDetails(id, data),
    onSuccess: onSubmitHandler,
  });
  const onSubmit = (values: Omit<OperatingExpensesDto, "step">) => {
    mutate({
      id: params.id as string,
      data: { ...values, step: ValuationStep.OperatingExpenses },
    });
  };

  const { collection, filter, set } = useListCollection({
    initialItems: getLevelOptions(t),
  });
  useEffect(() => {
    const newItems = getLevelOptions(t);
    set(newItems);
  }, [set, lng]);

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue);
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
          <Trans i18nKey="operatingExpenses" />
        </Box>
        <Flex gap={6} justifyContent={"start"}>
          <CurrencyInput
            name="officeRent"
            error={!!errors.officeRent}
            label={t("officeRent")}
            control={control}
          />
          <CurrencyInput
            name="utilities"
            error={!!errors.utilities}
            label={t("utilities")}
            control={control}
          />
        </Flex>
        <Flex gap={6} justifyContent={"start"}>
          <CurrencyInput
            name="adminSalaries"
            error={!!errors.adminSalaries}
            label={t("adminSalaries")}
            helperText={t("adminSalariesHelperText")}
            control={control}
          />
          <CurrencyInput
            name="marketing"
            error={!!errors.marketing}
            label={t("marketing")}
            helperText={t("marketingHelperText")}
            control={control}
          />
        </Flex>
        <Flex gap={6} justifyContent={"start"}>
          <CurrencyInput
            name="otherOperatingExpenses"
            error={!!errors.otherOperatingExpenses}
            label={t("otherOperatingExpenses")}
            control={control}
          />
          <Field.Root invalid={!!errors.fteRiskLevel} mt={2}>
            <Field.Label>
              <Trans i18nKey="fteRiskLevel" />
            </Field.Label>
            <Field.HelperText>
              <Trans i18nKey="fteRiskLevelHelperText" />
            </Field.HelperText>
            <Controller
              control={control}
              name="fteRiskLevel"
              render={({ field }) => (
                <Combobox.Root
                  collection={collection}
                  value={field.value ? [field.value] : []}
                  onValueChange={({ value }) => field.onChange(value[0] || "")}
                  onInputValueChange={handleInputChange}
                  onInteractOutside={() => field.onBlur()}
                >
                  <Combobox.Control>
                    <Combobox.Input
                      placeholder={t("fteRiskLevel")}
                      value={
                        collection.items.find(
                          (item) => item.value === field.value,
                        )?.label || ""
                      }
                    />
                    <Combobox.IndicatorGroup>
                      <Combobox.ClearTrigger />
                      <Combobox.Trigger />
                    </Combobox.IndicatorGroup>
                  </Combobox.Control>
                  <Field.HelperText>
                    {getFteLevelDescription(field.value as FteLevels, t)}
                  </Field.HelperText>
                  <Portal>
                    <Combobox.Positioner>
                      <Combobox.Content>
                        <Combobox.Empty>No frameworks found</Combobox.Empty>
                        {collection.items.map((item) => (
                          <Combobox.Item key={item.value} item={item}>
                            {item.label}
                            <Combobox.ItemIndicator />
                          </Combobox.Item>
                        ))}
                      </Combobox.Content>
                    </Combobox.Positioner>
                  </Portal>
                </Combobox.Root>
              )}
            />

            <Field.ErrorText>
              <Trans i18nKey="errors.requiredField" />
            </Field.ErrorText>
          </Field.Root>
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
