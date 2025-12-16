import {
  Button,
  Field,
  Flex,
  Input,
  NumberInput,
  Span,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CompanyDetailsDto,
  companyDetailsSchema,
  EvaluationProgress,
} from "@shared/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import {
  evaluateCompanyDetails,
  getValuationProgress,
} from "../../../api/valuation";
import { useParams } from "react-router-dom";
import { ValuationStep } from "../../../../../../packages/types/dist";
import { useEffect } from "react";

type Props = { onSubmitHandler: () => void };

export default function CompanyDetails({ onSubmitHandler }: Props) {
  const params = useParams();
  const { data: evaluationProgress } = useQuery<EvaluationProgress>({
    queryKey: [params.id],
    queryFn: () => getValuationProgress(params.id as string),
  });
  const companyDetails = evaluationProgress?.data.find(
    (item) => item.step === ValuationStep.CompanyDetails,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(companyDetailsSchema.omit({ step: true })),
  });
  useEffect(() => {
    reset({
      name: companyDetails?.companyName ?? "",
      industry: companyDetails?.industry ?? "",
      numberOfEmployees: String(companyDetails?.numberOfEmployees ?? ""),
    });
  }, [companyDetails, reset]);
  const { mutate } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: CompanyDetailsDto }) =>
      evaluateCompanyDetails(id, data),
    onSuccess: onSubmitHandler,
  });
  const onSubmit = (values: CompanyDetailsDto) => {
    mutate({
      id: params.id as string,
      data: { ...values, step: ValuationStep.CompanyDetails },
    });
  };
  return (
    <form
      id="companyDetailsForm"
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
            <Input placeholder="name" mt={2} {...register("name")} width="xs" />

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
              mt={2}
              {...register("industry")}
              width={"xs"}
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
              <NumberInput.Input mt={2} width={"xs"} />
            </NumberInput.Root>

            <Field.ErrorText>
              <Trans i18nKey="errors.requiredField" />
            </Field.ErrorText>
          </Field.Root>
        </Flex>
      </Flex>
      <Flex justifyContent="end" mt={10}>
        <Button colorPalette="green" type="submit">
          Next
        </Button>
      </Flex>
    </form>
  );
}
