import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ValuationStep } from "../../../../packages/types/dist";
import { useQuery } from "@tanstack/react-query";
import { getValuationProgress } from "../api/valuation";
import { EvaluationProgress } from "@shared/schemas";
import Wizard from "../components/shared/Wizard";
import CompanyDetails from "../components/features/valuationForms/CompanyDetails";
import RevenueDetails from "../components/features/valuationForms/RevenueDetails";
import DirectCostDetails from "../components/features/valuationForms/DirectCostDetails";
import OperatingExpensesDetails from "../components/features/valuationForms/OperatingExpensesDetails";
import { Box } from "@chakra-ui/react";

const steps = {
  [ValuationStep.CompanyDetails]: 1,
  [ValuationStep.RevenueDetails]: 2,
  [ValuationStep.DirectConstDetails]: 3,
  [ValuationStep.OperatingExpenses]: 4,
};

function getWizardComponent(step: ValuationStep, onSubmitHandler: () => void) {
  switch (step) {
    case ValuationStep.CompanyDetails:
      return <CompanyDetails onSubmitHandler={onSubmitHandler} />;
    case ValuationStep.RevenueDetails:
      return <RevenueDetails onSubmitHandler={onSubmitHandler} />;
    case ValuationStep.DirectConstDetails:
      return <DirectCostDetails onSubmitHandler={onSubmitHandler} />;
    case ValuationStep.OperatingExpenses:
      return <OperatingExpensesDetails onSubmitHandler={onSubmitHandler} />;
  }
}

export default function ValuationWizard() {
  const navigate = useNavigate();
  const params = useParams();
  const { data: evaluationProgress } = useQuery<EvaluationProgress>({
    queryKey: [params.id],
    queryFn: () => {
      return !params.id
        ? ({} as EvaluationProgress)
        : getValuationProgress(params.id);
    },
  });

  const currentStep = steps[params.step as ValuationStep];
  useEffect(() => {
    if (!evaluationProgress?.id) return;
    if (!evaluationProgress?.data.find((item) => item.step === params.step)) {
      navigate(
        `/valuation-wizard/${evaluationProgress?.id}/${evaluationProgress?.currentStep}`,
      );
    }
  }, [evaluationProgress]);
  const totalSteps = Object.keys(steps).length;
  const nextHandler = useCallback(() => {
    console.log("next handler", params.step);
    switch (params.step) {
      case ValuationStep.CompanyDetails:
        navigate(
          `/valuation-wizard/${params.id}/${ValuationStep.RevenueDetails}`,
        );
        return;
      case ValuationStep.RevenueDetails:
        navigate(
          `/valuation-wizard/${params.id}/${ValuationStep.DirectConstDetails}`,
        );
        return;
      case ValuationStep.DirectConstDetails:
        navigate(
          `/valuation-wizard/${params.id}/${ValuationStep.OperatingExpenses}`,
        );
        return;
      case ValuationStep.OperatingExpenses:
        navigate(`/valuation-wizard/${params.id}/result`);
        return;
    }
  }, [currentStep]);
  return (
    <Box minH="100vh">
      <Wizard currentStep={currentStep} totalSteps={totalSteps}>
        {getWizardComponent(params.step as ValuationStep, nextHandler)}
      </Wizard>
    </Box>
  );
}
