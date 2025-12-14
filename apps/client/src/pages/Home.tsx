import {
  Box,
  Button,
  Combobox,
  Field,
  Flex,
  Input,
  NumberInput,
  Portal,
  Span,
  useDisclosure,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyEvaluateDto, companyEvaluateSchema } from "@shared/schemas";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { ColorModeButton } from "../components/ui/color-mode";
import CurrencyInput from "../components/ui/currencyInput";
import DialogCustom from "../components/ui/dialog";

export default function Home() {
  const { t, i18n } = useTranslation();

  const initialData = localStorage.getItem("data");
  const getLevelOptions = (t: (key: string) => string) => {
    return [
      { label: t("levels.low"), value: "LOW" },
      { label: t("levels.medium"), value: "MEDIUM" },
      { label: t("levels.high"), value: "HIGH" },
    ];
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(companyEvaluateSchema),
    defaultValues: initialData
      ? JSON.parse(initialData)
      : {
          name: "",
          fteRiskLevel: "HIGH",
          industry: "",
          numberOfEmployees: "",
          monthlyRevenue: "",
          mrr: "",
          activeClients: "",
          revenuePerClient: "",
          developerSalaries: "",
          top2Salaries: "",
          contracterPayments: "",
          softwareLicenses: "",
          projectSpecificCosts: "",
          officeRent: "",
          utilities: "",
          adminSalaries: "",
          marketing: "",
          otherOperatingExpenses: "",
        },
  });
  const { open, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>();
  const lng = i18n.language;

  const onSubmit: SubmitHandler<CompanyEvaluateDto> = (data) => {
    setLoading(true);
    localStorage.setItem("data", JSON.stringify(data));
    fetch("http://localhost:3010/companyEvaluation/evaluate", {
      method: "post",
      body: JSON.stringify({ ...data }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.hasOwnProperty("valuation")) {
          setResponse(data);
          onOpen();
          return;
        }
      })
      .finally(() => setLoading(false));
  };
  const { contains } = useFilter({ sensitivity: "base" });
  const { collection, filter, set } = useListCollection({
    initialItems: getLevelOptions(t),
    filter: contains,
  });
  useEffect(() => {
    const newItems = getLevelOptions(t);
    set(newItems);
  }, [set, lng]);

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue);
  };
  return (
    <Box p="20">
      <Flex justifyContent={"end"} alignItems={"center"}>
        <Span mr={2}>Changle color mode</Span>
        <ColorModeButton />
      </Flex>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission behavior
          handleSubmit(onSubmit)();
        }}
      >
        <Flex m={"auto"} width={"4xl"} gap={2} direction={"column"}>
          <Span fontWeight="bold">
            <Trans i18nKey="companyOverview" />
          </Span>
          <Flex gap={6} justifyContent={"start"}>
            <Field.Root invalid={!!errors.name}>
              <Field.Label>
                <Trans i18nKey="companyName" />
              </Field.Label>
              <Field.HelperText>
                <Trans i18nKey="nameOfYourCompany" />
              </Field.HelperText>
              <Input
                placeholder="name"
                width={"sm"}
                mt={2}
                {...register("name")}
              />

              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.industry}>
              <Field.Label>
                <Trans i18nKey="industry" />
              </Field.Label>
              <Field.HelperText>
                <Trans i18nKey="typeOfItService" />
              </Field.HelperText>
              <Input
                placeholder="industry"
                width={"sm"}
                mt={2}
                {...register("industry")}
              />
              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
          </Flex>
          <Flex gap={6} justifyContent={"start"}>
            <Field.Root invalid={!!errors.numberOfEmployees}>
              <Field.Label>
                <Trans i18nKey="numberOfEmployees" />
              </Field.Label>

              <NumberInput.Root
                {...register("numberOfEmployees")}
                max={Number.MAX_SAFE_INTEGER}
                min={Number.MIN_SAFE_INTEGER}
              >
                <NumberInput.Input width={"sm"} mt={2} />
              </NumberInput.Root>

              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
          </Flex>
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
            <CurrencyInput
              name="activeClients"
              error={!!errors.activeClients}
              label={t("numberOfActiveClients")}
              helperText={t("numberOfActiveClientsHelperText")}
              control={control}
            />
            <CurrencyInput
              name="revenuePerClient"
              error={!!errors.revenuePerClient}
              label={t("revenuePerClient")}
              helperText={t("revenuePerClientHelperText")}
              control={control}
            />
          </Flex>
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
              label={t("contracterPayments")}
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
                    onValueChange={({ value }) =>
                      field.onChange(value[0] || "")
                    }
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

          <Flex justifyContent={"center"} mt={6}>
            <Button
              colorPalette={"green"}
              width={"2xs"}
              type="submit"
              disabled={loading}
              loading={loading}
            >
              <Trans i18nKey="evaluate" />
            </Button>
          </Flex>
        </Flex>
      </form>
      <DialogCustom open={open} onClose={onClose} data={response} />
    </Box>
  );
}
