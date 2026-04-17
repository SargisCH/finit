import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Wizard from "../components/shared/Wizard";
import FileUploadStep from "../components/features/importWizard/FileUploadStep";
import FieldMappingStep from "../components/features/importWizard/FieldMappingStep";
import FinalSubmitStep from "../components/features/importWizard/FinalSubmitStep";

export enum ImportStep {
  Upload = "upload",
  Mapping = "mapping",
  Submit = "submit",
}

const stepsOrder = [ImportStep.Upload, ImportStep.Mapping, ImportStep.Submit];

export default function ImportWizard() {
  const navigate = useNavigate();
  const { step } = useParams<{ step: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});

  const currentStepIndex = stepsOrder.indexOf(step as ImportStep);
  const totalSteps = stepsOrder.length;

  const nextHandler = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < totalSteps) {
      navigate(`/import-wizard/${stepsOrder[nextIndex]}`);
    } else {
      navigate("/"); // Or wherever the final destination is
    }
  }, [currentStepIndex, navigate, totalSteps]);

  const previousHandler = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      navigate(`/import-wizard/${stepsOrder[prevIndex]}`);
    } else {
      navigate("/start");
    }
  }, [currentStepIndex, navigate]);

  const onFileUpload = (file: File, headers: string[]) => {
    setFile(file);
    setHeaders(headers);
    nextHandler();
  };

  const onMappingSubmit = (newMapping: Record<string, string>) => {
    setMapping(newMapping);
    nextHandler();
  };

  const renderStep = () => {
    switch (step) {
      case ImportStep.Upload:
        return <FileUploadStep onUpload={onFileUpload} />;
      case ImportStep.Mapping:
        return (
          <FieldMappingStep
            headers={headers}
            mapping={mapping}
            onMappingSubmit={onMappingSubmit}
          />
        );
      case ImportStep.Submit:
        return (
          <FinalSubmitStep
            file={file}
            mapping={mapping}
            onComplete={() => navigate("/")}
          />
        );
      default:
        return <FileUploadStep onUpload={onFileUpload} />;
    }
  };

  return (
    <Box minH="100vh">
      <Wizard
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
        previousHandler={previousHandler}
      >
        {renderStep()}
      </Wizard>
    </Box>
  );
}
