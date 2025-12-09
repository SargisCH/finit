import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  NumberInput,
  useDisclosure,
  Field,
  Span,
  Combobox,
  useListCollection,
  Portal,
  useFilter,
} from "@chakra-ui/react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  companyEvaluateSchema,
  type CompanyEvaluateDto,
} from "@shared/schemas";
import DialogCustom from "./components/ui/dialog";
import { ColorModeButton } from "./components/ui/color-mode";
import { Trans, useTranslation } from "react-i18next";

const FORMAT_OPTIONS: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "AMD",
  currencyDisplay: "code",
};

const getLevelOptions = (t: (key: string) => string) => {
  return [
    { label: t("levels.low"), value: "LOW" },
    { label: t("levels.medium"), value: "MEDIUM" },
    { label: t("levels.high"), value: "HIGH" },
  ];
};

function App() {
  const { t } = useTranslation();

  const initialData = localStorage.getItem("data");
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

  const onSubmit: SubmitHandler<CompanyEvaluateDto> = (data) => {
    setLoading(true);
    localStorage.setItem("data", JSON.stringify(data));
    fetch("http://localhost:3000/companyEvaluation/evaluate", {
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
  const { collection, filter } = useListCollection({
    initialItems: getLevelOptions(t),
  });

  const { contains } = useFilter({ sensitivity: "base" });
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
            <Field.Root invalid={!!errors.monthlyRevenue}>
              <Field.Label>
                <Trans i18nKey="monthlyRevenue" />
              </Field.Label>
              <Field.HelperText>
                <Trans i18nKey={"monthlyRevenueHelperText"} />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("monthlyRevenue")}
                max={Number.MAX_SAFE_INTEGER}
                min={Number.MIN_SAFE_INTEGER}
              >
                <NumberInput.Input width={"sm"} mt={2} />
              </NumberInput.Root>
              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.mrr}>
              <Field.Label>
                <Trans i18nKey="mrr" />
              </Field.Label>
              <Field.HelperText>
                <Trans i18nKey="mrrHelperText" />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("mrr")}
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
          <Flex gap={6} justifyContent={"start"}>
            <Field.Root invalid={!!errors.activeClients} mt={4}>
              <Field.Label>
                <Trans i18nKey="numberOfActiveClients" />
              </Field.Label>
              <Field.HelperText>
                <Trans i18nKey="numberOfActiveClientsHelperText" />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("activeClients")}
                max={Number.MAX_SAFE_INTEGER}
                min={Number.MIN_SAFE_INTEGER}
              >
                <NumberInput.Input width={"sm"} mt={2} />
              </NumberInput.Root>
              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.revenuePerClient}>
              <Field.Label>
                <Trans i18nKey="revenuePerClient" />
              </Field.Label>
              <Field.HelperText>
                <Trans i18nKey="revenuePerClientHelperText" />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("revenuePerClient")}
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
            <Trans i18nKey="directCostInputs" />
          </Box>
          <Flex gap={6} justifyContent={"start"}>
            <Field.Root invalid={!!errors.developerSalaries}>
              <Field.Label>
                <Trans i18nKey="developerSalaries" />
              </Field.Label>
              <Field.HelperText>
                <Trans i18nKey="developerSalariesHelperText" />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("developerSalaries")}
                max={Number.MAX_SAFE_INTEGER}
                min={Number.MIN_SAFE_INTEGER}
              >
                <NumberInput.Input width={"sm"} mt={2} />
              </NumberInput.Root>
              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.top2Salaries}>
              <Field.Label>
                <Trans i18nKey="topSalaries" />
              </Field.Label>
              <Field.HelperText visibility="hidden">
                placeholder text
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("top2Salaries")}
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
          <Flex gap={6} justifyContent={"start"}>
            <Field.Root invalid={!!errors.contracterPayments}>
              <Field.Label>
                <Trans i18nKey="contractorPayments" />
              </Field.Label>

              <Field.HelperText>
                <Trans i18nKey="contractorPaymentsHelperText" />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("contracterPayments")}
                max={Number.MAX_SAFE_INTEGER}
                min={Number.MIN_SAFE_INTEGER}
              >
                <NumberInput.Input width={"sm"} mt={2} />
              </NumberInput.Root>
              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.softwareLicenses}>
              <Field.Label>
                <Trans i18nKey="softwareLicenses" />
              </Field.Label>

              <Field.HelperText>
                <Trans i18nKey="softwareLicensesHelperText" />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("softwareLicenses")}
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
          <Flex gap={6} justifyContent={"start"}>
            <Field.Root invalid={!!errors.projectSpecificCosts}>
              <Field.Label>
                <Trans i18nKey="softwareLicenses" />
              </Field.Label>

              <Field.HelperText>
                <Trans i18nKey="softwareLicensesHelperText" />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("projectSpecificCosts")}
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
            <Trans i18nKey="operatingExpenses" />
          </Box>
          <Flex gap={6} justifyContent={"start"}>
            <Field.Root invalid={!!errors.officeRent}>
              <Field.Label>
                <Trans i18nKey="officeRent" />
              </Field.Label>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("officeRent")}
                max={Number.MAX_SAFE_INTEGER}
                min={Number.MIN_SAFE_INTEGER}
              >
                <NumberInput.Input width={"sm"} mt={2} />
              </NumberInput.Root>
              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.utilities}>
              <Field.Label>
                <Trans i18nKey="utilities" />
              </Field.Label>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("utilities")}
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
          <Flex gap={6} justifyContent={"start"}>
            <Field.Root invalid={!!errors.adminSalaries}>
              <Field.Label>
                <Trans i18nKey="adminSalaries" />
              </Field.Label>
              <Field.HelperText>
                <Trans i18nKey="adminSalariesHelperText" />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("adminSalaries")}
                max={Number.MAX_SAFE_INTEGER}
                min={Number.MIN_SAFE_INTEGER}
              >
                <NumberInput.Input width={"sm"} mt={2} />
              </NumberInput.Root>
              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.marketing}>
              <Field.Label>
                <Trans i18nKey="marketing" />
              </Field.Label>
              <Field.HelperText>
                <Trans i18nKey="marketingHelperText" />
              </Field.HelperText>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("marketing")}
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
          <Flex gap={6} justifyContent={"start"}>
            <Field.Root invalid={!!errors.otherOperatingExpenses} mt={8}>
              <Field.Label>
                <Trans i18nKey="otherOperatingExpenses" />
              </Field.Label>
              <NumberInput.Root
                formatOptions={FORMAT_OPTIONS}
                {...register("otherOperatingExpenses")}
                max={Number.MAX_SAFE_INTEGER}
                min={Number.MIN_SAFE_INTEGER}
              >
                <NumberInput.Input width={"sm"} mt={2} />
              </NumberInput.Root>
              <Field.ErrorText>
                <Trans i18nKey="errors.requiredField" />
              </Field.ErrorText>
            </Field.Root>
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
                      <Combobox.Input placeholder="Select framework" />
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

export default App;
